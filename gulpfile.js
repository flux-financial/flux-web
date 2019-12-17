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

gulp.task('views', function buildHTML() {
	let tasks = [];

	for (const key in locale.pages) {
		if (locale.pages.hasOwnProperty(key)) {
			const page = locale.pages[key];

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

	// do error page
	tasks.push(
		gulp.src('views/404.pug')
			.pipe(pug({
				locals: { title: "404: Not found", global: locale.global }
			}))
			.pipe(gulp.dest('dist/'))
	);

	return mergeStream(tasks);
});

gulp.task('images', function moveImages() {
	return gulp.src('public/images/**')
		.pipe(gulp.dest('dist/images/'));
});

gulp.task('styles', function buildCSS() {
	return gulp.src('src/stylesheets/**')
		.pipe(sass({
			outputStyle: 'compressed',
			indentedSyntax: true
		}))
		.pipe(gulp.dest('dist/stylesheets/'));
});

gulp.task('scripts', function buildJS() {
	return gulp.src('public/javascripts/**')
		.pipe(uglify())
		.pipe(gulp.dest('dist/javascripts/'));
});

gulp.task('assets', function makeAssets() {
	return gulp.src('public/*')
		.pipe(gulp.dest('dist/'))
});

gulp.task('firebase', shell.task([
	'firebase deploy'
]));

exports.build = gulp.parallel('views', 'images', 'styles', 'scripts', 'assets');
exports.deploy = gulp.series(gulp.parallel('views', 'images', 'styles', 'scripts', 'assets'), 'firebase');
