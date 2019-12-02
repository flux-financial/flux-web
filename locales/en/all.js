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

// module.exports = { 
// 	global: require('./global'),
// 	index: require('./index'),
// 	cities: require('./cities'),
// 	vendors: require('./vendors'),
// 	taxpayers: require('./taxpayers'),
// 	savers: require('./savers')
// };