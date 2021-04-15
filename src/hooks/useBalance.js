import { useMemo } from 'react';
import useSWR from 'swr';

export function useBalance(defaultData = []) {
    const { data: response, error } = useSWR('/v1/token', { refreshInterval: 1000 });
    const loading = !response && !error;

    const data = useMemo(() => {
        if (response) {
            return response.data;
        }
        return defaultData;
    }, [response, defaultData]);

    return { loading, data, error };
}
