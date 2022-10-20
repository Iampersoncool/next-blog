export default function truncateStr(str, num) {
  if (str.length > num) return `${str.slice(0, num)}...`

  return str
}
