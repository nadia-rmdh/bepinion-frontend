import { useMemo, useCallback } from "react";
import useSWR from "swr";
import request from "../../../utils/request";

export default function useAdminNotification(config) {
    const { data: response, error, mutate } = useSWR('/v1/notifications/admin', config);

    const loading = !response && !error;

    const data = useMemo(() => {
        if (response) {
            return response.data.data;
        }

        return [];
    }, [response])

    const unreadCount = useMemo(() => {
        return response?.data?.notificationCount ?? 0;
    }, [response]);

    const markAsRead = useCallback(async (notification) => {
        const updateResponse = { ...response };
        const updatedNotifIndex = response.data.data.findIndex(notif => notif.notificationId === notification.notificationId && !notif.read_at);
        if (updatedNotifIndex >= 0) {
            updateResponse.data.data[updatedNotifIndex] = { ...notification, read_at: true };
            mutate(updateResponse, false)
            await request.put(`v1/notifications/admin/${notification.notificationId}`)
            return await mutate();
        }
    }, [response, mutate]);

    const markAsUnread = useCallback(async (notification) => {
        const updateResponse = {...response};
        const updatedNotifIndex = response.data.data.findIndex(notif => notif.notificationId === notification.notificationId);
        if (updatedNotifIndex >= 0) {
            updateResponse.data.data[updatedNotifIndex] = {...notification, read_at: null};
            mutate(updateResponse, false);
            await request.delete(`v1/notifications/admin/${notification.notificationId}`)
            return await mutate();
        }
    }, [response, mutate])

    return { data, unreadCount, loading, error, markAsRead, markAsUnread };
}
