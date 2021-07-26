export const setItem = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const getItem = (key) => {
	const data = localStorage.getItem(key);
	return JSON.parse(data);
};

export const deleteItem = (key) => localStorage.removeItem(key);
