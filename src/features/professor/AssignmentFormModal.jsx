import { useState } from 'react'
import { ArrowRight, Link2, X } from 'lucide-react'
import { students } from '../../data'

const courses = ['Marketing 204', 'Design Studio', 'Research 101', 'Business Lab']
const blankAssignment = {
  title: '',
  course: courses[0],
  due: '2026-10-10',
  description: '',
  driveLink: '',
}

export default function AssignmentFormModal({ assignment, onClose, onSave }) {
  const [form, setForm] = useState(assignment || blankAssignment)

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function submitForm(event) {
    event.preventDefault()
    if (!form.title.trim()) return

    const status = assignment?.status || Object.fromEntries(
      students.map((student) => [student.id, 'pending']),
    )

    onSave({
      ...form,
      title: form.title.trim(),
      id: assignment?.id || `as-${Date.now()}`,
      created: assignment?.created || '2026-09-25',
      status,
    })
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="form-modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
        <div className="form-modal-head">
          <div><div className="eyebrow">ASSIGNMENT DETAILS</div><h2 id="form-title">{assignment ? 'Edit assignment' : 'Create an assignment'}</h2></div>
          <button className="modal-close" onClick={onClose} aria-label="Close"><X size={19} /></button>
        </div>

        <form onSubmit={submitForm}>
          <label>
            Assignment title
            <input required autoFocus value={form.title} onChange={(event) => updateField('title', event.target.value)} placeholder="e.g. Customer journey map" />
          </label>
          <div className="form-two-col">
            <label>
              Course
              <select value={form.course} onChange={(event) => updateField('course', event.target.value)}>
                {courses.map((course) => <option key={course}>{course}</option>)}
              </select>
            </label>
            <label>Due date<input required type="date" value={form.due} onChange={(event) => updateField('due', event.target.value)} /></label>
          </div>
          <label>
            Description
            <textarea rows="3" value={form.description} onChange={(event) => updateField('description', event.target.value)} placeholder="What should students know about this assignment?" />
          </label>
          <label>
            Drive submission link <span className="optional-label">Optional</span>
            <div className="input-with-icon">
              <Link2 size={16} />
              <input type="url" value={form.driveLink} onChange={(event) => updateField('driveLink', event.target.value)} placeholder="https://drive.google.com/..." />
            </div>
            <small className="field-help">Students can open this link to submit their work.</small>
          </label>
          <div className="form-footer">
            <button type="button" className="button-secondary" onClick={onClose}>Cancel</button>
            <button className="button-primary" type="submit">
              {assignment ? 'Save changes' : 'Create assignment'} <ArrowRight size={15} />
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
