var path = require('path');
var fs = require('fs');
var eol = require('eol');

var locale = {};
locale.pages = {};

var directoryPath = path.join(__dirname, '/');

console.log(directoryPath);

var files = fs.readdirSync(directoryPath);

files.forEach(function (file) {
	// check for json
	if (path.extname(file) === '.json') {
		// read in file
		let fileObj = JSON.parse(fs.readFileSync(directoryPath + file));
		// save filename
		let page = path.basename(file, '.json');

		// init list of markdown files
		let mdFiles = [];

		// get current page path inside locales/en
		let pagePath = path.join(directoryPath, page + '/')

		// ignore errors from read
		try {
			mdFiles = fs.readdirSync(pagePath);
		} catch (error) {
		}

		// init list of markdown sections
		fileObj.sections = [];

		// go through and add each file
		mdFiles.forEach(function(mdFile) {
			// filter out non-md files
			if (path.extname(mdFile) === '.md') {
				// read in file content
				let mdContent = String(fs.readFileSync(path.join(pagePath, mdFile)));

				// change line endings to LF
				mdContent = eol.lf(mdContent);

				// split files if possible
				let sections = splitMD(mdContent, eol.lf("\n===\n\n"));

				// add to section list
				fileObj.sections = fileObj.sections.concat(sections);
			}
		});

		// filter out global as a special entry
		if (page == "global") {
			locale[page] = fileObj;
		} else {
			locale.pages[page] = fileObj;
		}
	}
});

/**
 * Splits a markdown input into multiple markdown strings.
 * 
 * @param {String} file Markdown file to split up.
 * @param {String} separator separator to split files with
 */
function splitMD(file, separator) {
	let split = file.split(separator);

	return split
}

module.exports = locale;