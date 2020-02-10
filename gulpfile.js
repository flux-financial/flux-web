const gulp = require('gulp');

// addons
const rename = require('gulp-rename');
const mergeStream = require('merge-stream');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const uglify = require('gulp-uglify-es').default;
const shell = require('gulp-shell');

// deletion
const del = require('del');

// common
const destination = 'public/';

// Function tasks
/**
 * Build views function
 * 
 * Sets up and executes the build tasks for views pug files.
 * 
 * @param {Array} tasks array of task streams for gulp.
 */
function build_views(tasks) {
	// page content
	const locale = require('./locale/all');

	// require markdown support
	const markdown = require('marked');

	// completed pages in the locale folder
	for (const key in locale.pages) {
		if (locale.pages.hasOwnProperty(key)) {
			const page = locale.pages[key];
			
			// add to the task list
			tasks.push(
				gulp.src(`src/pug/${page.layout}.pug`)
					.pipe(rename(`${key}.html`))
					.pipe(pug({
						locals: { title: page.title, local: page, global: locale.global, markdown: markdown }
					}))
					.pipe(gulp.dest(destination))
			);
		}
	}

	// extra pages
	// 404 page
	tasks.push(
		gulp.src('src/pug/404.pug')
			.pipe(pug({
				locals: { title: "404: Not found", global: locale.global }
			}))
			.pipe(gulp.dest(destination))
	);
}

/**
 * Moves images in the public directory to the distribution
 * directory.
 */
function build_images() {
	return gulp.src('src/img/**')
		.pipe(gulp.dest(destination + 'img/'));
}

/**
 * Compiles SASS source to CSS inside the distribution folder.
 */
function build_css() {
	return gulp.src('src/sass/*')
		.pipe(sass({
			outputStyle: 'compressed',
			indentedSyntax: true
		}))
		.pipe(gulp.dest(destination + 'css/'));
}

/**
 * Uglifies javascript files for client and puts it in the
 * distribution folder.
 */
function build_scripts() {
	return gulp.src('src/js/**')
		.pipe(uglify())
		.pipe(gulp.dest(destination + 'js/'));
}

/**
 * Copies all other public assets in the root of the directory
 * (favicon, manifest) and puts it in the root of dist.
 */
function other_assets() {
	return gulp.src('src/*')
		.pipe(gulp.dest(destination));
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

gulp.task('clean', function clean() {
	return del(['public/*']);
})

gulp.task('publish-dev', shell.task(
	'firebase deploy --only hosting:dev'
));

gulp.task('publish', shell.task(
	'firebase deploy --only hosting:production'
));

gulp.task('serve', shell.task(
	'firebase serve'
));

// build static items
exports.build = gulp.parallel('views', 'images', 'styles', 'scripts', 'assets');

// localhost testing
exports.test = gulp.series(exports.build, 'serve');

// publishing to Firebase
exports.public = gulp.series(exports.build, 'publish');
exports.dev = gulp.series(exports.build, 'publish-dev');
