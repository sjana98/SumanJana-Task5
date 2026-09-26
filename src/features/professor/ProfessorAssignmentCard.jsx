import { useState } from 'react'
import { Check, ChevronDown, Clock3, ExternalLink, FileText, Link2, Pencil, Trash2 } from 'lucide-react'
import { students } from '../../data'
import Avatar from '../../components/common/Avatar'
import EditedTag from '../../components/common/EditedTag'
import ProgressBar from '../../components/common/ProgressBar'
import { formatDate, getCourseColor, getPercent } from '../../utils/assignment'

export default function ProfessorAssignmentCard({ assignment, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(true)
  const submittedCount = Object.values(assignment.status).filter((status) => status === 'submitted').length
  const progress = getPercent(submittedCount, students.length)
  const complete = submittedCount === students.length
  const courseColor = getCourseColor(assignment.course)

  function confirmDelete() {
    if (window.confirm(`Delete “${assignment.title}”?`)) onDelete()
  }

  return (
    <article className="admin-card">
      <div className="admin-card-top">
        <div className={`mini-art art-${courseColor}`}><FileText size={18} /></div>
        <div className="admin-title">
          <span className="assignment-meta">{assignment.course} <span className="meta-dot">·</span> Due {formatDate(assignment.due)} <EditedTag date={assignment.editedAt} /></span>
          <h3>{assignment.title}</h3>
          <div className="admin-card-progress">
            <ProgressBar value={progress} />
            <span>{submittedCount} of {students.length} submitted</span>
          </div>
        </div>
        <span className={`status-pill ${complete ? 'status-submitted' : 'status-todo'}`}>
          <span />{complete ? 'Complete' : 'In progress'}
        </span>
        <div className="admin-card-actions">
          <button title="Edit assignment" aria-label={`Edit ${assignment.title}`} onClick={onEdit}><Pencil size={16} /></button>
          <button title="Delete assignment" aria-label={`Delete ${assignment.title}`} onClick={confirmDelete}><Trash2 size={16} /></button>
          <button title="Toggle student details" aria-label="Toggle student details" onClick={() => setExpanded((value) => !value)}>
            <ChevronDown size={17} className={expanded ? '' : 'chevron-collapsed'} />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="student-progress-list">
          {students.map((student) => {
            const submitted = assignment.status[student.id] === 'submitted'

            return (
              <div className="student-progress-row" key={student.id}>
                <Avatar student={student} />
                <div className="student-row-name"><strong>{student.name}</strong><small>{student.email}</small></div>
                <div className="student-progress-bar"><ProgressBar value={submitted ? 100 : 0} tone={submitted ? 'green' : 'gray'} /></div>
                <span className={`student-status ${submitted ? 'student-status-done' : ''}`}>
                  {submitted ? <><Check size={13} /> Submitted</> : <><Clock3 size={13} /> Not submitted</>}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {assignment.driveLink && (
        <a className="admin-drive-link" href={assignment.driveLink} target="_blank" rel="noreferrer">
          <Link2 size={14} /> External submission link <ExternalLink size={13} />
        </a>
      )}
    </article>
  )
}
