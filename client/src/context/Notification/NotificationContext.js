import { createContext } from "react";

const NotificationContext = createContext({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
});

export default NotificationContext;