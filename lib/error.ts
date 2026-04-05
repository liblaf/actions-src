export function getErrorStatus(err: unknown): number | undefined {
  // `RequestError` is not reliably detectable here, so use the numeric `status` property as a fallback.
  if (typeof err !== "object" || err === null) return undefined;
  const status: any = Reflect.get(err, "status");
  return typeof status === "number" ? status : undefined;
}

export function isErrorStatus(err: unknown, status: number): boolean {
  return getErrorStatus(err) === status;
}
