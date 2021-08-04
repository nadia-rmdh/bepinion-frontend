import { useCallback } from 'react';
import { useMemo } from 'react';
import useSWR from 'swr';
import request from '../utils/request';

export function useUserNotification(defaultData = [], config) {
    const { data: response, error, mutate } = useSWR('/v1/notifications/me', config);

    const loading = !response && !error;

    const data = useMemo(() => {
        if (response) {
            return response.data.data;
        }
        return defaultData;
    }, [response, defaultData]);

    const unreadCount = useMemo(() => {
        return response?.data?.notificationCount ?? 0;
    }, [response])

    const markAsRead = useCallback(async (notification) => {
        const updateResponse = { ...response };
        const updatedNotifIndex = response.data.data.findIndex(notif => notif.notificationId === notification.notificationId && !notif.read_at);
        if (updatedNotifIndex >= 0) {
            updateResponse.data.data[updatedNotifIndex] = { ...notification, read_at: true };
            mutate(updateResponse, false)
            await request.put(`v1/notifications/user/${notification.notificationId}`)
            return await mutate();
        }
    }, [response, mutate]);

    const markAllAsRead = useCallback(async () => {
        await request.put('v1/notifications/user/all')
        return await mutate();
    }, [mutate])

    const markAsUnread = useCallback(async (notification) => {
        const updateResponse = {...response};
        const updatedNotifIndex = response.data.data.findIndex(notif => notif.notificationId === notification.notificationId);
        if (updatedNotifIndex >= 0) {
            updateResponse.data.data[updatedNotifIndex] = {...notification, read_at: null};
            mutate(updateResponse, false);
            await request.delete(`v1/notifications/user/${notification.notificationId}`)
            return await mutate();
        }
    }, [response, mutate])

    return {loading, data, error, unreadCount, markAsRead, markAllAsRead, markAsUnread };
}
