document.addEventListener("DOMContentLoaded", () => {
	const body = document.querySelector("body");
	const modal = document.querySelector(".modal-window");
	const modalWindowContainer = document.querySelector(".modal-window-container");
	const modalButton = document.querySelector(".modal-button");

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
		modal.classList.add("active");
		body.classList.add("active");
		modalButton.classList.remove("active");
	};

	// Function to close the modal
	const closeModal = () => {
		modal.classList.remove("active");
		body.classList.remove("active");
		modalButton.classList.add("active");
		createCookie("modalWindowDismiss", true, 168);
	};

	// Add a click event listener to the modal button
	modalButton.addEventListener("click", openModal);

	// Add a click event listener to the modal window for outside clicks
	modal.addEventListener("click", function (event) {
		// Check if the clicked element is outside the modal-window-container
		if (!modalWindowContainer.contains(event.target)) {
			closeModal();
		}
	});

	// Add a listener to all dismiss buttons to close the modal
	document.querySelectorAll(".dismiss-button").forEach((button) => {
		button.addEventListener("click", closeModal);
	});

	// Example: Automatically open the modal after a delay
	if (!readCookie("modalWindowDismiss")) {
		setTimeout(openModal, 2000);
	} else {
		modalButton.classList.add("active");
	}
});
