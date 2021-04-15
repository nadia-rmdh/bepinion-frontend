import request from './request'
import { toast } from 'react-toastify'
toast.configure()
export const AddData = async (url, data) => {

    try {
        const response = await request.post(url, data);
        toast.success(response.data.message || 'Berhasil disimpan');
        console.log(response);
        return true;
    } catch (err) {
        if (err.response && err.response.data) {
            toast.error(err.response.data.message || 'Error')
        }
        return false;
    }
}