import { ArrowRight, Check, ExternalLink, FileText } from 'lucide-react'
import EditedTag from '../../components/common/EditedTag'
import { daysUntil, formatDate, getCourseColor } from '../../utils/assignment'

export default function AssignmentCard({ assignment, onConfirm }) {
  const submitted = assignment.myStatus === 'submitted'
  const daysRemaining = daysUntil(assignment.due)
  const courseColor = getCourseColor(assignment.course)
  const statusClass = submitted ? 'status-submitted' : daysRemaining <= 2 ? 'status-soon' : 'status-todo'
  const statusLabel = submitted ? 'Submitted' : daysRemaining <= 2 ? 'Due soon' : 'To do'

  return (
    <article className={`assignment-card ${submitted ? 'assignment-done' : ''}`}>
      <div className={`assignment-art art-${courseColor}`}>
        <FileText size={21} /><span className="art-spark">✳</span>
      </div>
      <div className="assignment-main">
        <div className="assignment-meta">
          <span>{assignment.course}</span><span className="meta-dot">·</span>
          <span>{submitted ? 'Submitted' : `${Math.max(daysRemaining, 0)} days left`}</span>
        </div>
        <h3>{assignment.title}</h3>
        <p>{assignment.description}</p>
        <div className="assignment-foot">
          <span className={`status-pill ${statusClass}`}><span />{statusLabel}</span>
          <span className="due-label">Due {formatDate(assignment.due)}</span>
          <EditedTag date={assignment.editedAt} />
        </div>
      </div>
      <div className="assignment-action">
        {submitted ? (
          <div className="submitted-label"><Check size={15} /> Submitted</div>
        ) : (
          <button className="button-primary button-small" onClick={onConfirm}>
            Mark as submitted <ArrowRight size={15} />
          </button>
        )}
        {assignment.driveLink && (
          <a className="drive-link" href={assignment.driveLink} target="_blank" rel="noreferrer">
            <ExternalLink size={14} /> Submission link
          </a>
        )}
      </div>
    </article>
  )
}
