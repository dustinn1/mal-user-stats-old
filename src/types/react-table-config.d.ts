import {
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState
} from 'react-table'

declare module 'react-table' {

  export interface TableOptions<D extends Record<string, unknown>>
    extends UsePaginationOptions<D>,
    UseSortByOptions<D> { }

  export interface Hooks<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseSortByHooks<D> { }

  export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
    extends UsePaginationInstanceProps<D>,
    UseSortByInstanceProps<D> { }

  export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
    extends UsePaginationState<D>,
    UseSortByState<D> { }

  export interface ColumnInterface<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseSortByColumnOptions<D> { }

  export interface ColumnInstance<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseSortByColumnProps<D> { }

}