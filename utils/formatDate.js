import { utc } from 'moment/moment'

export default function formatDate(date, formatOptions) {
  return utc(date).format(formatOptions)
}
