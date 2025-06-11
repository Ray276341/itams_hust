export function blobToImageUrl(data: any) {
  const blob = new Blob([data]);
  const url = URL.createObjectURL(blob);
  return url;
}
