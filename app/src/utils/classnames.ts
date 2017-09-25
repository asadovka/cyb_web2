export function classNames(...classes: string[]): string {
  return classes.join(" ");
}

export function classes(conditions: { [key: string]: boolean }): string[] {
  return Object.keys(conditions).filter(key => conditions[key]);
}
