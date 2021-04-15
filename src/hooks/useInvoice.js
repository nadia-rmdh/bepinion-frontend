import { useMemo } from 'react';
import useSWR from 'swr';

export function useInvoice(defaultData = []) {
    const { data: response, error } = useSWR('/v1/invoice', { refreshInterval: 100000 });

    const loading = !response && !error;

    const data = useMemo(() => {
        if (response) {
            return response.data.data;
        }
        return defaultData;
    }, [response, defaultData]);

    return { loading, data, error };
}
