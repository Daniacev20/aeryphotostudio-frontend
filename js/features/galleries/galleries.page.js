// galleries.page.js

import {
	getPrivateGalleries
} from "../../services/gallery.service.js";

export async function initGalleryPage() {
	const galleries = await getPrivateGalleries();

	console.log(galleries);
}