export type Ok<T> = {
  ok: true;
  value: T;
};

export type Err<E> = {
  ok: false;
  error: E;
};

export type Result<T, E> = Ok<T> | Err<E>;

export function Ok<T>(value: T): Ok<T> {
  return {
    ok: true,
    value,
  };
}

export function Err<E>(error: E): Err<E> {
  return {
    ok: false,
    error,
  };
}
