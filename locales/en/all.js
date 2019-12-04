var path = require('path');
var fs = require('fs');

var locale = {};
locale.pages = {};

var directoryPath = path.join(__dirname, '/');

console.log(directoryPath);

var files = fs.readdirSync(directoryPath);

files.forEach(function (file) {
	// check for json
	if (path.extname(file) === '.json') {
		let fileObj = JSON.parse(fs.readFileSync(directoryPath + file));
		let page = path.basename(file, '.json');

		let mdFiles = [];

		let pagePath = path.join(directoryPath, page + '/')

		try {
			mdFiles = fs.readdirSync(pagePath);
		} catch (error) {
		}

		fileObj.markdown = [];

		mdFiles.forEach(function(mdFile) {
			let mdContent = String(fs.readFileSync(path.join(pagePath, mdFile)));
			fileObj.markdown.push(mdContent);
		});

		if (page == "global") {
			locale[page] = fileObj;
		} else {
			locale.pages[page] = fileObj;
		}
	}
});

module.exports = locale;