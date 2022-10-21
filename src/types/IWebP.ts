export interface IWebp {
  buffer:
    | string
    | Buffer
    | Uint8Array
    | Uint8ClampedArray
    | Int8Array
    | Uint16Array
    | Int16Array
    | Uint32Array
    | Int32Array
    | Float32Array
    | Float64Array
    | undefined;
  // eslint-disable-next-line no-unused-vars
  onData: (data: string) => void;
}
