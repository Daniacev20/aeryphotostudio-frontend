// header.config.js

import { ADMIN_VIEWS } from './views.config.js';

export const HEADER_CONFIG = {
	[ADMIN_VIEWS.GALLERIES]: {
		title: "Galer\u00EDas",
		controls: [
			"title",
			"searchGallery",
			"btnNewGallery",
			"btnStatusFilter",
			"btnDateFilter"
		]
	},
	[ADMIN_VIEWS.NEW_GALLERY]: {
		title: "Nueva galer\u00EDa",
		controls: [
			"title",
			"btnPreviousView"
		]
	},
	[ADMIN_VIEWS.GALLERY_CONFIG]: {
		title: "- Opciones",
		controls: [
			"title",
			"btnPreviousView",
			"btnGetLink"
		]
	},
	[ADMIN_VIEWS.ACTIVITY]: {
		title: "- Actividad",
		controls: [
			"title",
			"btnPreviousView",
			"btnGetLink"
		]
	},
	[ADMIN_VIEWS.APPOINTMENT]: {
		title: "Citas",
		controls: [
			"title"
		]
	}
};