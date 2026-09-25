import ProgressBar from './ProgressBar'

export default function StatCard({ label, value, detail, icon: Icon, tone, progress }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span className={`stat-icon stat-${tone}`}><Icon size={18} /></span>
        <span className={`stat-detail ${tone === 'green' ? 'detail-green' : ''}`}>
          {detail}
        </span>
      </div>
      <div className="stat-number">{value}</div>
      <div className="stat-label">{label}</div>
      {progress !== undefined && (
        <div className="stat-progress">
          <ProgressBar value={progress} tone={tone === 'green' ? 'green' : 'purple'} />
          <span>{progress}%</span>
        </div>
      )}
    </article>
  )
}
