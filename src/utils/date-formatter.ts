export default function format(date: string): string {
  const dateObj = new Date(date);
  return Intl.DateTimeFormat("pt-br", {
    year: "numeric",
    month: "long",
    day: "numeric",
    minute: "numeric",
    hour: "numeric",
  }).format(dateObj);
}
