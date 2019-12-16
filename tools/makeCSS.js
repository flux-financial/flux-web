const sass = require('node-sass');
const path = require('path');
const fs = require('fs');

sass.render({
	outputStyle: 'compressed',
	indentedSyntax: true,
	file: path.join(__dirname, '../src/stylesheets/main.sass')
}, function(error, result) {
	if (!error) {
		fs.writeFile(path.join(__dirname, '../public/stylesheets/main.css'), result.css, err => {
			if (err) {
				console.error("failed to write file: " + err);
			}
		});
	}
});
