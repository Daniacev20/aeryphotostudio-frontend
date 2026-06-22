// gallery.state.js

const galleryState = {
	images: [],
	currentImageIndex: 0,
	title: "",
	downloadsEnabled: false
};

const Modal = {
	dialog: document.querySelector("#image-modal-dialog"),
	count: document.querySelector("#modal-count"),
	title: document.querySelector("#modal-title"),
	btnFavorite: document.querySelector(".btn-favorite"),
	btnDownload: document.querySelector(".btn-download"),
	btnClose: document.querySelector(".btn-close-modal"),
	btnPrevious: document.querySelector("#prev-image"),
	btnNext: document.querySelector("#nex-image"),
	image: document.querySelector("#modal-image")
};

export { galleryState, Modal };