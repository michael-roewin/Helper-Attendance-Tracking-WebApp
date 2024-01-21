import { useState } from "react"

export default function useAppNotificationHook() {
  const [appNotification, setAppNotification] = useState();

  return [appNotification, setAppNotification]
}