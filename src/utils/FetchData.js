import request from './request'
export const FetchData = async (url) => {

    try {
        const urlFetch = await request.get(url);
        return urlFetch.data.data;
    } catch (err) {
        return err;
    }
}