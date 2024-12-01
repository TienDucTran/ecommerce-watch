import {publicRequest} from '../requestMethods';

export const getSearch = async (q, type = 'less') => {

    try {
        const res = await publicRequest.get('/products/search', {
            params: {
                q,
                type
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}