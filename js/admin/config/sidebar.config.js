// sidebar.config.js

import { ADMIN_VIEWS } from './views.config.js';
import { AdminSidebar } from '../layout/admin-sidebar.js';
import { GallerySidebar } from '../layout/gallery-sidebar.js';
import { EmptySidebar } from '../layout/empty-sidebar.js';

// Using EmptySidebar object
// having the same structure
// as the rest only to avoid
// using null and unintendedly
// break calls to the object's
// methods.

export const SIDEBAR_CONFIG = {
	[ADMIN_VIEWS.GALLERIES]: AdminSidebar,
	[ADMIN_VIEWS.GALLERY]: GallerySidebar,
	[ADMIN_VIEWS.NEW_GALLERY]: EmptySidebar,
	[ADMIN_VIEWS.GALLERY_DESIGN]: GallerySidebar,
	[ADMIN_VIEWS.GALLERY_CONFIG]: GallerySidebar,
	[ADMIN_VIEWS.ACTIVITY]: GallerySidebar,
	[ADMIN_VIEWS.APPOINTMENTS]: AdminSidebar
};