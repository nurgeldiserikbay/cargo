import type { IAlert, IAlertShort } from "~/types/common"

export const useAllert = () => {
  const allert = useState<IAlert | undefined>('allert', () => undefined)

  function setAlert(obj: IAlert) {
    clearAlert()
    allert.value = obj
  }

  function setError(obj: IAlertShort) {
    setAlert({
      ...obj,
      type: ALERTS.error
    })
  }

  function setSuccess(obj: IAlertShort) {
    setAlert({
      ...obj,
      type: ALERTS.success
    })
  }

  function setWarning(obj: IAlertShort) {
    setAlert({
      ...obj,
      type: ALERTS.warning
    })
  }

  function setInfo(obj: IAlertShort) {
    setAlert({
      ...obj,
      type: ALERTS.info
    })
  }

  function clearAlert() {
    allert.value = undefined
  }

  return {
    allert,
    setAlert,
    setError,
    setSuccess,
    setWarning,
    setInfo,
    clearAlert,
  }
}