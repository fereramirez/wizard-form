export function getSearchParamsString(searchParams: URLSearchParams) {
  if (!searchParams) return "";

  const params = new URLSearchParams(searchParams?.toString() || "");

  const paramString = params.toString();

  return paramString ? `${paramString}` : "";
}
