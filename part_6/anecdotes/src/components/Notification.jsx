import { useSelector } from 'react-redux'

export function Notification() {
  const notification = useSelector(state => state.notification)
  
  if (notification == null) {
    return null;
  }

  return <div className={`${notification.toastClass} toast`}>{notification.message}</div>;
}
