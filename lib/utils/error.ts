function isRecord(value: unknown): value is Record<PropertyKey, unknown> {
  return typeof value === "object" && value !== null;
}

export function getErrorStatus(error: unknown): number | undefined {
  if (!isRecord(error)) return undefined;

  const status = Reflect.get(error, "status");
  if (typeof status === "number") return status;

  const response = Reflect.get(error, "response");
  if (!isRecord(response)) return undefined;

  const responseStatus = Reflect.get(response, "status");
  return typeof responseStatus === "number" ? responseStatus : undefined;
}

export function isErrorStatus(error: unknown, status: number): boolean {
  return getErrorStatus(error) === status;
}
