function makeCSS(url) {
	let link = document.createElement('link');

	link.rel = 'stylesheet';
	link.href = url;
	link.type = 'text/css';
	
	let firstLink = document.getElementsByTagName('link')[0];
	firstLink.parentNode.insertBefore(link, firstLink);
}
makeCSS('/stylesheets/main.css');
makeCSS('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700&display=swap');