/**
 * Lazy loads a CSS file asynchronously.
 * @param {String} url URL to get CSS a css file from.
 */
function loadCSS(url) {
	let link = document.createElement('link');

	link.rel = 'stylesheet';
	link.href = url;
	link.type = 'text/css';
	
	let firstLink = document.getElementsByTagName('link')[0];
	firstLink.parentNode.insertBefore(link, firstLink);
}

// files to load
let files = [
	'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700&display=swap'
];

// load all files
files.forEach(file => {
	loadCSS(file);
});