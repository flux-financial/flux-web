/**
 * From https://bulma.io/documentation/components/navbar/
 */


// navbar burgers
const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

// If there are navbar burgers...
if (navbarBurgers.length > 0) {
	// Listen to click
	navbarBurgers.forEach( navbarBurger => {
		navbarBurger.addEventListener('click', () => {
			// Get the target from the "data-target" attribute
			const navbarMenuId = navbarBurger.dataset.target;
			const navbarMenu = document.getElementById(navbarMenuId);

			// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
			navbarBurger.classList.toggle('is-active');
			navbarMenu.classList.toggle('is-active');
		});
	});
}