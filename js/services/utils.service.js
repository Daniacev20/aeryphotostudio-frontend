// utils.service.js

// utils objects
const regexValidators = {
	PHONE: /^\(?\d{3}\)?(\s|\.|-)?\d{3}(\s|\.|-)?\d{4}$/,
	EMAIL: /^(?!.*\.\.)[a-zA-z0-9._%+-]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,}$/,
	DATE: null // wip
}