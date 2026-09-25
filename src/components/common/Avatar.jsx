export default function Avatar({ student, size = '' }) {
  return (
    <span className={`avatar avatar-${student.color} ${size}`}>
      {student.initials}
    </span>
  )
}
