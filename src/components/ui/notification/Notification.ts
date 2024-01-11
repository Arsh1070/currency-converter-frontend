import { notification } from 'antd';

type NotificationType = 'success' | 'error' | 'info';

const openNotification = (type: NotificationType, message: string, description: string): void => {
  notification[type]({
    message: message,
    description: description,
    placement: 'topRight',
    duration: 3,
  });
};

const CustomNotification = {
  success: (message: string, description?: string | any): void => {
    openNotification('success', message, description);
  },
  error: (message: string, description?: string | any): void => {
    openNotification('error', message, description);
  },
  info: (message: string, description?: string | any): void => {
    openNotification('info', message, description);
  },
};

export default CustomNotification;
