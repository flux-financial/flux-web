const gulp = require('gulp');
const rename = require('gulp-rename');
const mergeStream = require('merge-stream');

// plugins for gulp
const pug = require('gulp-pug');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const uglify = require('gulp-uglify-es').default;
const shell = require('gulp-shell');

const markdown = require('marked');

const locale = require('./locale/all');

// Function tasks
/**
 * Build views function
 * 
 * Sets up and executes the build tasks for views pug files.
 * 
 * @param {Array} tasks array of task streams for gulp.
 */
function build_views(tasks) {
	// completed pages in the locale folder
	for (const key in locale.pages) {
		if (locale.pages.hasOwnProperty(key)) {
			const page = locale.pages[key];
			
			// add to the task list
			tasks.push(
				gulp.src(`views/${page.layout}.pug`)
					.pipe(rename(`${key}.html`))
					.pipe(pug({
						locals: { title: page.title, local: page, global: locale.global, markdown: markdown }
					}))
					.pipe(gulp.dest('dist/'))
			);
		}
	}

	// extra pages
	// 404 page
	tasks.push(
		gulp.src('views/404.pug')
			.pipe(pug({
				locals: { title: "404: Not found", global: locale.global }
			}))
			.pipe(gulp.dest('dist/'))
	);
}

/**
 * Moves images in the public directory to the distribution
 * directory.
 */
function build_images() {
	return gulp.src('public/images/**')
		.pipe(gulp.dest('dist/images/'));
}

/**
 * Compiles SASS source to CSS inside the distribution folder.
 */
function build_css() {
	return gulp.src('src/stylesheets/**')
		.pipe(sass({
			outputStyle: 'compressed',
			indentedSyntax: true
		}))
		.pipe(gulp.dest('dist/stylesheets/'));
}

/**
 * Uglifies javascript files for client and puts it in the
 * distribution folder.
 */
function build_scripts() {
	return gulp.src('public/javascripts/**')
		.pipe(uglify())
		.pipe(gulp.dest('dist/javascripts/'));
}

/**
 * Copies all other public assets in the root of the directory
 * (favicon, manifest) and puts it in the root of dist.
 */
function other_assets() {
	return gulp.src('public/*')
		.pipe(gulp.dest('dist/'));
}

// gulp defined tasks
gulp.task('views', function views() {
	let tasks = [];

	build_views(tasks);

	return mergeStream(tasks);
});

gulp.task('images', function images() {
	return build_images();
});

gulp.task('styles', function styles() {
	return build_css();
});

gulp.task('scripts', function scripts() {
	return build_scripts();
});

gulp.task('assets', function assets() {
	return other_assets();
});

gulp.task('firebase', shell.task([
	'firebase deploy --only hosting:dev'
]));

gulp.task('publish', shell.task([
	'firebase deploy --only hosting:production'
]));

exports.build = gulp.parallel('views', 'images', 'styles', 'scripts', 'assets');
exports.deploy = gulp.series('firebase');
exports.default = gulp.series(exports.build, exports.deploy);

exports.public = gulp.series(exports.build, 'publish')
