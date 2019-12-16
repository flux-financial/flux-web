const pug = require('gulp-pug');

gulp.task('views', function buildHTML() {
	return gulp.src('views/*.pug')
	.pipe(pug({
		locals: []
	}))
});
