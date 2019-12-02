var path = require('path');
var fs = require('fs');

var locale = {};

var directoryPath = path.join(__dirname, '/');

console.log(directoryPath);

var files = fs.readdirSync(directoryPath);

files.forEach(function (file) {
	// check for json
	if (path.extname(file) === '.json') {
		let fileObj = JSON.parse(fs.readFileSync(directoryPath + file));

		locale[path.basename(file, '.json')] = fileObj;
	}
});

module.exports = locale;