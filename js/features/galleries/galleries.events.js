// galleries.events.js

import {
	getClientsList,
	getClientGalleries,
	getGalleryAndImagesBySlug,
	toggleFavorite,
	downloadImage,
	downloadGallery,
	validateGalleryPin,
	verifyGalleryAccess
} from "../../services/gallery.service.js";

import {
	renderClientsPreview,
	renderClientGalleries,
	renderGalleryImages,
	renderModal
} from './galleries.views.js';

import {
	galleryState,
	GalleryModal,
	PinModal
} from '../../state/gallery.state.js';

import {
	filterClients,
	filterGalleries
} from '../../utils/galleryfiltering.js';

const PIN_REQUIRED_LENGTH = 4;
const galleries = document.querySelector("#galleries");

const frmSearch = document.querySelector("#frm-gallery-search");
const searchBar = document.querySelector("#search-gallery");
const backTo = document.querySelector(".back-to");
const galleryTitle = document.querySelector("#gallery-title");
const downloadAll = document.querySelector("#download-full-gallery");

function getCircularIndex(array, index) {
	return ((index % array.length) + array.length) % array.length;
}

function handleClientPanelDisplay(params) {
	backTo.hidden = params.size === 0;
	downloadAll.hidden = !params.has("slug");

	if (params.size === 0) {
		galleryTitle.textContent = "Personas";
	}
	else if (params.has("client")) {
		galleryTitle.textContent = "Galer\u00EDas";
	}
	else if (params.has("slug")) {
		galleryTitle.textContent = "Im\u00E1genes";
	}

	handleSearchDisplay(params);
}

function handleSearchDisplay(params) {
	frmSearch.hidden = params.has("slug");

	if (params.size === 0) {
		searchBar.placeholder = "Buscar nombre";
	}
	else if (params.has("client")) {
		searchBar.placeholder = "Buscar galer\u00EDa";
	}
}

async function getClients_loadEvents(event) {
	const params = new URLSearchParams(location.search);
	const client = params.get("client");
	const slug = params.get("slug");

	handleClientPanelDisplay(params);

	if (!client && !slug) {
		const clients = await getClientsList();
		renderClientsPreview(galleries, clients, galleryState);
	}
	else if (client && !slug) {
		const clientGalleries =
			await getClientGalleries(params.get("client"));

		renderClientGalleries(galleries, clientGalleries, galleryState);
	}
	else if (!client && slug) {
		try {
			const galleryAndImages =
				await getGalleryAndImagesBySlug(
					params.get("slug")
				);
			
			renderGalleryImages(
				galleries,
				galleryAndImages,
				galleryState
			);
		} catch (err) {
			if (/Pin requerido./gi.test(err.message)) {
				galleryState.slug = slug;
				galleryState.directAccess = true;
				PinModal.dialog.showModal();
				return;
			}

			throw err;
		}
	}
}

async function toggleFavorite_clickEvents(event) {
	const btnFavorite = event.target.closest(".btn-favorite");

	if (!btnFavorite || btnFavorite.disabled)
		return;

	const imageId = btnFavorite.dataset.imageId;
	btnFavorite.disabled = true;

	try {
		const image = await toggleFavorite(imageId);

		if (!image) return;

		btnFavorite.classList.toggle("is-favorite", image.favorite);
	} catch (err) {
		console.log(err);
	}
	finally {
		btnFavorite.disabled = false;
	}
}

async function downloadImage_clickEvents(event) {
	const btnDownload = event.target.closest(".btn-download");

	if (!btnDownload) return;

	await downloadImage(
		btnDownload.dataset.imageId,
		btnDownload.dataset.filename
	);
}

async function downloadGallery_clickEvents(event) {
	const btnDownloadAll =
		event.target.closest("#download-full-gallery");

	if (!btnDownloadAll) return;

	const params = new URLSearchParams(location.search);
	const slug = params.get("slug");

	if (!slug) return; // wip

	btnDownloadAll.disabled = true;

	try {
		await downloadGallery(slug);
	} finally {
		btnDownloadAll.disabled = false;
	}
}

function openImage_clickEvents(event) {
	const img = event.target.closest(".gallery-image");
	if (!img) return;

	galleryState.currentImageIndex = Number(img.dataset.index);
	renderModal(galleryState);
	GalleryModal.dialog.showModal();
}

function closeImage_clickEvents(event) {
	const btnClose = event.target.closest(".btn-close-modal");

	if (!btnClose) return;

	GalleryModal.dialog.close();
}

function previousImage_clickEvents(event) {
	const btnPrev = event.target.closest("#prev-image");

	if (!btnPrev) return;

	galleryState.currentImageIndex--;

	galleryState.currentImageIndex = 
		getCircularIndex(
			galleryState.galleries.images, galleryState.currentImageIndex
		);

	renderModal(galleryState);
}

function nextImage_clickEvents(event) {
	const btnNext = event.target.closest("#next-image");

	if (!btnNext) return;

	galleryState.currentImageIndex++;

	galleryState.currentImageIndex = 
		getCircularIndex(
			galleryState.galleries.images, galleryState.currentImageIndex
		);

	renderModal(galleryState);
}

function changeImage_keydownEvents(event) {
	const modal = event.target.closest("dialog");

	if (!modal) return;
	
	if (event.key === "ArrowLeft" ||
		event.key === "ArrowUp") {
		GalleryModal.btnPrevious.click();
		return;
	}
	else if (event.key === "ArrowRight" ||
		event.key === "ArrowDown") {
		GalleryModal.btnNext.click();
	}
}

async function protectedGallery_clickEvents(event) {
	const gallery = event.target.closest("[data-slug]");

	if (!gallery) return;
	if (gallery.dataset.isProtected !== "true") return;

	event.preventDefault();

	const slug = gallery.dataset.slug;
	
	try {
		await verifyGalleryAccess(slug);
		location.href =
			`/entrega.html?slug=${slug}`;
	} catch {
		galleryState.slug = slug;
		PinModal.dialog.showModal();
	}
}

async function sendPin_clickEvents(event) {
	const btnSendPin = event.target.closest("#btn-send-pin");

	if (!btnSendPin) return;

	const pin = PinModal.txtPin.value.trim();

	// validacion preliminar
	if (!pin) {
		PinModal.lblError.hidden = false;
		PinModal.lblError.textContent = "Pin requerido.";
		return;
	}
	else if (pin.length < PIN_REQUIRED_LENGTH) {
		PinModal.lblError.hidden = false;
		PinModal.lblError.textContent = "Pin muy corto.";
		return;
	}

	btnSendPin.disabled = true;

	try {
		await validateGalleryPin(pin, galleryState.slug);

		PinModal.lblError.textContent = "";
		PinModal.lblError.hidden = true;
		PinModal.dialog.close();

		location.href = `/entrega.html?slug=${galleryState.slug}`;
	} catch (err) {
		PinModal.lblError.hidden = false;
		PinModal.lblError.textContent = err.message;
	} finally {
		btnSendPin.disabled = false;
	}
}

function closePinModal_clickEvents(event) {
	const btnClose = event.target.closest(".btn-close-pin-modal");

	if (!btnClose) return;

	PinModal.lblError.textContent = "";
	PinModal.lblError.hidden = true;
	PinModal.dialog.close();

	if (galleryState.directAccess) {
		location.href = "/";
	}
}

async function txtPinEnter_keyEvents(event) {
	if (event.key !== "Enter") return;

	const txtPin = event.target.closest("#txt-pin");

	if (!txtPin) return;

	PinModal.btnSend.click();
}

function searchBar_inputEvents(event) {
	const search = event.target.closest("#search-gallery");

	if (!search) return;

	const params = new URLSearchParams(location.search);

	if (params.size === 0) {
		const clients = filterClients(
			search.value.trim(),
			galleryState
		);

		renderClientsPreview(galleries, clients, null);
	}
	else if (params.has("client")) {
		const clientGalleries = filterGalleries(
			search.value.trim(),
			galleryState
		);

		renderClientsPreview(galleries, clientGalleries, null);
	}
}

export {
	getClients_loadEvents,
	toggleFavorite_clickEvents,
	downloadImage_clickEvents,
	downloadGallery_clickEvents,
	openImage_clickEvents,
	closeImage_clickEvents,
	previousImage_clickEvents,
	nextImage_clickEvents,
	changeImage_keydownEvents,
	protectedGallery_clickEvents,
	sendPin_clickEvents,
	closePinModal_clickEvents,
	txtPinEnter_keyEvents,
	searchBar_inputEvents
};