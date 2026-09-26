import { formatDate } from '../../utils/assignment'

export default function EditedTag({ date }) {
  if (!date) return null

  return <span className="edited-tag">Edited · {formatDate(date)}</span>
}
