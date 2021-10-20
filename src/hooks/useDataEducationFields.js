import { useEffect, useState } from 'react';
import request from '../utils/request';

export default () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        request.get('/v1/option/education-fields')
            .then((res) => setData(res.data.data))
            .finally(() => setLoading(false))
    }, [])

    return { loading, data };
}
