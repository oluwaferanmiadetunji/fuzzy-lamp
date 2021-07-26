import { toast } from 'react-toastify';

const toastify = (type, message) => {
	const config = {
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
	};
	switch (type) {
		case 'success':
			return toast.success(message, config);
		case 'warning':
			return toast.warn(message, config);
		case 'danger':
			return toast.error(message, config);
		case 'info':
		default:
			return toast.info(message, config);
	}
};

export default toastify;
