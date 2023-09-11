import { useState } from "react";
import { NotificationContext } from "./";
import { Notification, NotificationContainer } from "../../components";
import PropTypes from 'prop-types';

const NotificationProvider = ({ children }) => {

  const NOTIFICATION_LIFE_TIME = 1 * 1000;

  const [notifications, setNotifications] = useState([]);

  const addNotification = ({ message, autoDelete }) => {
    const id = new Date().getTime();
    const notification = { id, message };

    setNotifications([...notifications, notification]);

    if (autoDelete) {
      setTimeout(() => {
        removeNotification(id);
      }, NOTIFICATION_LIFE_TIME);
    }
  }

  const removeNotification = (notification) => {
    setNotifications(notifications.filter(n => n.id !== notification.id));
  }

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
    }}>
      {
        children
      }
      <NotificationContainer>
        {
          notifications.map((notification, index) => (
            <Notification
              key={index}
              message={notification.message}
              handleDelete={() => removeNotification(notification)}
            />
          ))
        }

      </NotificationContainer>
    </NotificationContext.Provider>
  );
}

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default NotificationProvider;