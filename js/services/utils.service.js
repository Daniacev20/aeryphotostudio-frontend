// utils.service.js

// utils objects
export const regexValidators = {
	PHONE: /^\(?\d{3}\)?(\s|\.|-)?\d{3}(\s|\.|-)?\d{4}$/,
	EMAIL: /^(?!.*\.\.)[a-zA-z0-9._%+-]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,}$/,
	DATE: null // wip
}

export class Cookie {
	static setCookie(name, value, exp = 2) {
		const parsedValue = typeof value === 'object' ?
			JSON.stringify(value) : value.toString();
		const currentDate = new Date();
		const hours = 1000 * 60 * 60 * exp;
		const expDateStr = new Date(currentDate.getTime() + hours).toUTCString();

		document.cookie = `${name}=${parsedValue};expires=${expDateStr};path=/;`;

		return document.cookie.split(";").some(c => c.startsWith(`${name}=`));
	}

	static getCookie(name) {
		const cookies = document.cookie.split(";").map(p => p.trim());

		for (const cookie of cookies) {
			if (cookie.includes(name))
				return cookie.substring(cookie.indexOf("=") + 1);
		}

		return "";
	}

	static deleteCookie(name) {
		if (this.getCookie(name)) {
			this.setCookie(name, "", -1)
			return true;
		}

		return false;
	}
}