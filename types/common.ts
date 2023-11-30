export interface IAlertShort {
  title: string;
  text?: string;
}

export type TypeAlerts = 'error' | 'success' | 'warning' | 'info'

export interface IAlert extends IAlertShort {
  type: TypeAlerts
}