import Axios from 'axios';
import store from '../store'
import { LOGOUT } from '../actions/auth'
import { toast } from "react-toastify"

toast.configure();

const captcha = {};
captcha.get = async () => {
	const { token: sessid, user } = store.getState()
	const headers = { headers: { "Authorization": 'Bearer ' + sessid } };

	try {
		let res = await Axios.get(process.env.REACT_APP_DOMAIN + '/api/auth/captcha', headers);

		let captcha = res.data.data.captcha + user.id;
		captcha = Math.cos(captcha).toString().substring(7, 13);

		return captcha;
	}
	catch (err) {
		if (err.response && err.response.status === 401) {
			toast.error('Sesi habis. Silahkan login ulang...', {
				autoClose: 3000,
				onClose: () => {
					store.dispatch({ type: LOGOUT });
				}
			})
		}
		else if (err.message === 'Network Error')
			toast.error('Koneksi internet terputus...', { autoClose: 3000 })
		else if (err.message) toast.error(err.message, { autoClose: 3000 })
		else toast.error('Error', { autoClose: 3000 })
		return '';
	}
}

export default captcha;
