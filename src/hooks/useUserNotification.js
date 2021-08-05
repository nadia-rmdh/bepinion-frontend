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
        return response?.data?.data.filter(notif => !notif.readAt).length ?? 0;
    }, [response])

    const markAsRead = useCallback(async (notification) => {
        const updateResponse = { ...response };
        const updatedNotifIndex = response.data.data.findIndex(notif => notif.id === notification.id && !notif.readAt);
        if (updatedNotifIndex >= 0) {
            updateResponse.data.data[updatedNotifIndex] = { ...notification, readAt: true };
            mutate(updateResponse, false)
            await request.post(`v1/notifications/user/${notification.id}`)
            return await mutate();
        }
    }, [response, mutate]);

    const markAsReadToast = useCallback(async (notification) => {
        const updateResponse = { ...response };
        const updatedNotifIndex = response.data.data.findIndex(notif => notif.id === parseInt(notification.data.notificationId));
        if (updatedNotifIndex >= 0) {
            updateResponse.data.data[updatedNotifIndex] = { ...updateResponse.data.data[updatedNotifIndex], readAt: true };
            mutate(updateResponse, false)
            await request.post(`v1/notifications/user/${notification.data.notificationId}`)
            return await mutate();
        }
    }, [response, mutate]);

    const markAllAsRead = useCallback(async () => {
        await request.post('v1/notifications/user')
        return await mutate();
    }, [mutate])

    const markAsUnread = useCallback(async (notification) => {
        const updateResponse = { ...response };
        const updatedNotifIndex = response.data.data.findIndex(notif => notif.id === notification.id);
        if (updatedNotifIndex >= 0) {
            updateResponse.data.data[updatedNotifIndex] = { ...notification, readAt: null };
            mutate(updateResponse, false);
            await request.delete(`v1/notifications/user/${notification.id}`)
            return await mutate();
        }
    }, [response, mutate])

    return { loading, data, error, unreadCount, markAsRead, markAsReadToast, markAllAsRead, markAsUnread };
}
