export function Toast({ message, toastClass }) {
  if (message == null) {
    return null;
  }

  return <div className={`${toastClass} toast`}>{message}</div>;
}
