import { useContext } from "react";
import { NotificationContext } from "./";

const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context) {
      throw new Error(
          'Error no Notification context'
      );
  }
  return context;
}

export default useNotificationContext;