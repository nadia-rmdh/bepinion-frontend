import { useMemo } from 'react';
import useSWR from 'swr';

export default () => {
    const { data: response, error } = useSWR('/v1/option/education-fields');
    const loading = !response && !error;

    const data = useMemo(() => {
        if (response) {
            return response.data.data;
        }
        return [];
    }, [response]);

    return { loading, data, error };
}
