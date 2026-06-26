// gallery.state.js

const galleryState = {
	slug: "",
	images: [],
	currentImageIndex: 0,
	title: "",
	downloadsEnabled: false
};

const GalleryModal = {
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

const PinModal = {
	dialog: document.querySelector("#pin-prompt-modal"),
	btnClose: document.querySelector(".btn-close-modal"),
	txtPin: document.querySelector("#txt-pin"),
	lblError: document.querySelector(".pin-error"),
	btnSend: document.querySelector("#btn-send-pin")
};

export {
	galleryState,
	GalleryModal,
	PinModal
};