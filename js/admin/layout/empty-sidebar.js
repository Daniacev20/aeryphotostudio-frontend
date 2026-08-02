// empty-sidebar.js

// necessary for views with
// no sidebar, to avoid using
// null in the config and the
// rest of the code expects
// the same structure.

export const EmptySidebar = {
	show() {},
	hide() {},
	setActive() {}
};