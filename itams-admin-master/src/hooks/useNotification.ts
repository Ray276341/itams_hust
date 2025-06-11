import { useState } from 'react';
import { getAllNotifications } from '../api/notification';
import { Notification } from '../interface/interface';

export const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const getNotifications = async () => {
    try {
      const data: Notification[] = await getAllNotifications();
      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };
  return { notifications, getNotifications };
};
