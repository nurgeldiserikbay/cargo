export interface ErrorT {
  status?: number;
  statusCode?: number;
  statusMessage?: string;
  message?: string;
}

export interface IAlertShort {
  title: string;
  text?: string;
}

export type TypeAlerts = 'error' | 'success' | 'warning' | 'info'

export interface IAlert extends IAlertShort {
  type: TypeAlerts
}

export type ValueType<T> = T extends Promise<infer U> ? U : T

export interface IPagination {
  offset?: number;
  paged?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sort?: {
    sorted?: true;
    unsorted?: true;
  };
  unpaged?: boolean;
}

export interface IPageMeta {
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    },
    unpaged: boolean;
  },
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  },
  totalElements: number;
  totalPages: number;
}