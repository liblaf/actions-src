export function stripTagPrefix(tag: string): string {
  return tag.replace(/^v/, "");
}
