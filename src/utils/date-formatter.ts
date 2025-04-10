export default function format(
  date: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = new Date(date);
  return Intl.DateTimeFormat("pt-br", {
    year: "numeric",
    month: "long",
    day: "numeric",
    minute: "numeric",
    hour: "numeric",
    ...options,
  }).format(dateObj);
}
