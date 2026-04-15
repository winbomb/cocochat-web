import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const navigateTo = useNavigate();

  useEffect(() => {
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      const { newPath } = event.data;
      if (newPath && document.hidden) {
        navigateTo(newPath);
      }
    };
    // https only
    navigator.serviceWorker?.addEventListener("message", handleServiceWorkerMessage);
    return () => {
      navigator.serviceWorker?.removeEventListener("message", handleServiceWorkerMessage);
    };
  }, []);

  return null;
};

export default memo(Notification);
