import request from './request'
import { toast } from 'react-toastify'
toast.configure()
export const EditData = async (url, data, id) => {

    try {
        const response = await request.put(url + '/' + id, data);
        toast.success(response.data.message || 'Berhasil diubah');
        return true;
    } catch (err) {
        if (err.response && err.response.data) {
            toast.error(err.response.data.message || 'Error')
        }
        return false;
    }
}