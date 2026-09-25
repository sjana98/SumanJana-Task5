import { useMemo, useState } from 'react'
import { ArrowRight, CheckCircle2, Clock3, FileText, Search, Sparkles } from 'lucide-react'
import { daysUntil, getPercent } from '../../utils/assignment'
import StatCard from '../../components/common/StatCard'
import AssignmentCard from './AssignmentCard'
import SubmissionConfirmationModal from './SubmissionConfirmationModal'

const assignmentFilters = ['All assignments', 'To do', 'Submitted']

export default function StudentDashboard({ student, assignments, onConfirm }) {
  const [filter, setFilter] = useState(assignmentFilters[0])
  const [query, setQuery] = useState('')
  const [pendingAssignment, setPendingAssignment] = useState(null)

  const myAssignments = useMemo(() => (
    assignments
      .map((assignment) => ({
        ...assignment,
        myStatus: assignment.status[student.id] || 'pending',
      }))
      .sort((first, second) => first.due.localeCompare(second.due))
  ), [assignments, student.id])

  const submittedCount = myAssignments.filter((assignment) => assignment.myStatus === 'submitted').length
  const upcomingCount = myAssignments.filter((assignment) => (
    assignment.myStatus !== 'submitted' && daysUntil(assignment.due) >= 0
  )).length
  const visibleAssignments = myAssignments.filter((assignment) => {
    const matchesFilter = filter === 'All assignments'
      || (filter === 'To do' ? assignment.myStatus !== 'submitted' : assignment.myStatus === 'submitted')
    const matchesSearch = `${assignment.title} ${assignment.course}`.toLowerCase().includes(query.toLowerCase())
    return matchesFilter && matchesSearch
  })

  function confirmPendingAssignment() {
    onConfirm(pendingAssignment.id, student.id)
    setPendingAssignment(null)
  }

  return (
    <>
      <section className="welcome-row">
        <div>
          <div className="eyebrow"><Sparkles size={14} /> YOUR LEARNING SPACE</div>
          <h1>Good morning, {student.name.split(' ')[0]} <span className="wave">✦</span></h1>
          <p>Here’s what’s happening with your coursework.</p>
        </div>
        <div className="date-pill">
          <span className="date-icon"><Clock3 size={16} /></span>
          <div><small>Today</small><strong>Friday, September 25</strong></div>
        </div>
      </section>

      <section className="stats-grid grid !grid-cols-2 !gap-2 xl:!grid-cols-4 xl:!gap-3">
        <StatCard label="Total assignments" value={myAssignments.length} detail="This semester" icon={FileText} tone="purple" />
        <StatCard
          label="Submitted"
          value={`${submittedCount} / ${myAssignments.length}`}
          detail={`${getPercent(submittedCount, myAssignments.length)}% complete`}
          icon={CheckCircle2}
          tone="green"
          progress={getPercent(submittedCount, myAssignments.length)}
        />
        <StatCard label="Coming up" value={upcomingCount} detail="Keep the momentum" icon={Clock3} tone="orange" />
        <article className="streak-card">
          <div className="streak-decoration">✳</div>
          <span className="streak-kicker">YOU’RE ON A ROLL</span>
          <strong>Small steps,<br />big progress.</strong>
          <span className="streak-caption">You’ve submitted {submittedCount} assignments this semester.</span>
          <div className="streak-spark">✦ &nbsp;✦ &nbsp;✦</div>
        </article>
      </section>

      <section className="assignment-section">
        <div className="section-heading">
          <div><h2>Your assignments <span className="heading-count">{myAssignments.length}</span></h2><p>Keep an eye on what’s due next.</p></div>
          <button
            className="text-button"
            onClick={() => {
              setFilter(assignmentFilters[0])
              document.getElementById('assignment-list')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View all <ArrowRight size={16} />
          </button>
        </div>

        <div className="list-toolbar">
          <div className="filter-tabs">
            {assignmentFilters.map((label) => (
              <button key={label} className={filter === label ? 'tab-active' : ''} onClick={() => setFilter(label)}>
                {label}{label === 'To do' && <span className="tab-badge">{upcomingCount}</span>}
              </button>
            ))}
          </div>
          <label className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search assignments" /></label>
        </div>

        <div className="assignment-list" id="assignment-list">
          {visibleAssignments.length ? visibleAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} onConfirm={() => setPendingAssignment(assignment)} />
          )) : (
            <div className="empty-state"><Search size={23} /><strong>No assignments found</strong><span>Try another search or filter.</span></div>
          )}
        </div>
      </section>

      {pendingAssignment && (
        <SubmissionConfirmationModal
          assignment={pendingAssignment}
          onClose={() => setPendingAssignment(null)}
          onConfirm={confirmPendingAssignment}
        />
      )}
    </>
  )
}
