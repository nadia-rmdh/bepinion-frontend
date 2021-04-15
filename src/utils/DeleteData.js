import request from './request'
import { toast } from 'react-toastify'
toast.configure()
export const DeleteData = async (url, id) => {

    try {
        const response = await request.delete(url + '/' + id);
        toast.success(response.data.message || 'Berhasil dihapus');
        return true;
    } catch (err) {
        if (err.response && err.response.data) {
            toast.error(err.response.data.message || 'Error')
        }
        return false;
    }
}