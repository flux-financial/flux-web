/**
 * From https://bulma.io/documentation/components/navbar/
 */


// navbar burgers
const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

// If there are navbar burgers...
if ($navbarBurgers.length > 0) {
	// Listen to click
	$navbarBurgers.forEach( navbarBurger => {
		navbarBurger.addEventListener('click', () => {
			// Get the target from the "data-target" attribute
			const target = navbarBurger.dataset.target;
			const $target = document.getElementById(target);

			// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
			navbarBurger.classList.toggle('is-active');
			$target.classList.toggle('is-active');
		});
	});
}