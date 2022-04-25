export interface WithParams<T> {
  params: T;
}

export interface WithProps<T> {
  props: T;
}

export type OrNull<T> = T | null;
