export default function ProgressBar({ value, tone = 'purple' }) {
  return (
    <div
      className={`progress-track progress-${tone}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <span style={{ width: `${value}%` }} />
    </div>
  )
}
