import { useState } from 'react'
import { ArrowDown, CheckCircle2, Clock3, FileText, Plus, Search, Users } from 'lucide-react'
import { students } from '../../data'
import StatCard from '../../components/common/StatCard'
import { daysUntil, getPercent } from '../../utils/assignment'
import AssignmentFormModal from './AssignmentFormModal'
import ProfessorAssignmentCard from './ProfessorAssignmentCard'

const assignmentFilters = ['All assignments', 'Active', 'Past due']

export default function ProfessorDashboard({ assignments, onSave, onDelete }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState(assignmentFilters[0])
  const [editingAssignment, setEditingAssignment] = useState(undefined)
  const [showForm, setShowForm] = useState(false)

  const submittedCount = assignments.reduce((total, assignment) => (
    total + Object.values(assignment.status).filter((status) => status === 'submitted').length
  ), 0)
  const totalSubmissions = assignments.length * students.length
  const responseRate = getPercent(submittedCount, totalSubmissions)
  const visibleAssignments = assignments.filter((assignment) => {
    const matchesFilter = filter === 'All assignments'
      || (filter === 'Active' ? daysUntil(assignment.due) >= 0 : daysUntil(assignment.due) < 0)
    const matchesSearch = `${assignment.title} ${assignment.course}`.toLowerCase().includes(query.toLowerCase())
    return matchesFilter && matchesSearch
  })

  function openCreateForm() {
    setEditingAssignment(undefined)
    setShowForm(true)
  }

  function openEditForm(assignment) {
    setEditingAssignment(assignment)
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingAssignment(undefined)
  }

  function saveForm(assignment) {
    onSave(assignment)
    closeForm()
  }

  return (
    <>
      <section className="welcome-row admin-welcome">
        <div>
          <div className="eyebrow"><span>✦</span> FACULTY WORKSPACE</div>
          <h1>Assignment overview</h1>
          <p>Track submissions and keep your classes moving.</p>
        </div>
        <button className="button-primary create-button" onClick={openCreateForm}><Plus size={17} /> Create assignment</button>
      </section>

      <section className="stats-grid admin-stats grid !grid-cols-2 !gap-2 xl:!grid-cols-4 xl:!gap-3">
        <StatCard label="Active assignments" value={assignments.length} detail="Across your courses" icon={FileText} tone="purple" />
        <StatCard label="Students enrolled" value={students.length} detail="Across 4 courses" icon={Users} tone="blue" />
        <StatCard
          label="Submissions received"
          value={`${submittedCount} / ${totalSubmissions}`}
          detail={`${responseRate}% response rate`}
          icon={CheckCircle2}
          tone="green"
          progress={responseRate}
        />
        <StatCard label="Need attention" value={Math.max(0, totalSubmissions - submittedCount)} detail="Awaiting submission" icon={Clock3} tone="orange" />
      </section>

      <section className="assignment-section admin-assignment-section">
        <div className="section-heading">
          <div><h2>Assignments <span className="heading-count">{assignments.length}</span></h2><p>Review assignment progress by course and student.</p></div>
          <button className="button-secondary export-button" onClick={() => window.print()}><ArrowDown size={15} /> Export report</button>
        </div>
        <div className="list-toolbar">
          <div className="filter-tabs">
            {assignmentFilters.map((label) => (
              <button key={label} className={filter === label ? 'tab-active' : ''} onClick={() => setFilter(label)}>{label}</button>
            ))}
          </div>
          <label className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search assignments" /></label>
        </div>
        <div className="admin-assignment-list">
          {visibleAssignments.length ? visibleAssignments.map((assignment) => (
            <ProfessorAssignmentCard
              key={assignment.id}
              assignment={assignment}
              onEdit={() => openEditForm(assignment)}
              onDelete={() => onDelete(assignment.id)}
            />
          )) : (
            <div className="empty-state"><Search size={23} /><strong>No assignments found</strong><span>Try another search or create an assignment.</span></div>
          )}
        </div>
      </section>

      {showForm && (
        <AssignmentFormModal assignment={editingAssignment} onClose={closeForm} onSave={saveForm} />
      )}
    </>
  )
}
