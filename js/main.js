document.addEventListener("DOMContentLoaded", () => {
	const body = document.querySelector("body");
	const dialog = document.querySelector(".modal-window");
	const modalWindowContainer = document.querySelector(".modal-window-container");
	const openButton = document.querySelector(".modal-open-button");
	const closeButton = document.querySelectorAll(".dismiss-button");

	function createCookie(name, value, hours, isProduction = false) {
		let expires = "";
		if (hours) {
			const date = new Date();
			date.setTime(date.getTime() + hours * 60 * 60 * 1000);
			expires = `; expires=${date.toUTCString()}`;
		}

		let cookieString = `${name}=${value}${expires}; path=/;`;

		// For production, add Secure and SameSite attributes
		const hostname = window.location.hostname;
		if ((hostname !== "127.0.0.1" || hostname !== "localhost") && isProduction) {
			cookieString += " Secure; SameSite=Lax;";
		}

		document.cookie = cookieString;
	}

	function readCookie(name) {
		const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
		return match ? decodeURIComponent(match[2]) : null;
	}

	// Function to open the modal
	const openModal = () => {
		dialog.showModal(); // Show the dialog
		body.classList.add("active");
	};

	// Function to close the modal
	const closeModal = () => {
		dialog.close();
		body.classList.remove("active");
		createCookie("modalWindowDismiss", true, 168);
	};

	// Handle Esc key press or any other method that triggers the dialog.close()
	function handleKeyDown(event) {
		if (event.key === "Escape" || event.keyCode === 27) {
			closeModal();
		}
	}
	// Listen for the Esc key press
	document.addEventListener("keydown", handleKeyDown);

	// Close the dialog when clicking outside of the modal content
	dialog.addEventListener("click", (event) => {
		if (!modalWindowContainer.contains(event.target)) {
			closeModal(); // Close the modal when clicking outside the container
		}
	});

	// Add a click event listener to the modal button
	openButton.addEventListener("click", openModal);

	// Add a listener to all dismiss buttons to close the modal
	closeButton.forEach((button) => {
		button.addEventListener("click", closeModal);
	});

	// Check for the cookie and either open the modal or show the button
	if (!readCookie("modalWindowDismiss")) {
		body.classList.add("active");
		setTimeout(openModal, 2000);
	} else {
		openButton.classList.add("active");
	}
});
