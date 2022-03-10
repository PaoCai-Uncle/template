export interface PropItem {
  prop: string;
  label: string;
  placeholder?: string;
  defaultValue: any
  col?: number
}

export type BasicObjectBool = {
  [key: string]: boolean
}