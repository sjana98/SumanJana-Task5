import { Bell, ChevronDown, Menu } from 'lucide-react'
import { students } from '../../data'
import Avatar from '../common/Avatar'
import IconButton from '../common/IconButton'

export default function Header({ role, onRoleChange, student, onStudentChange, onMenu }) {
  const pageTitle = role === 'student' ? 'My assignments' : 'Assignment overview'
  const account = role === 'student' ? student : { initials: 'JW', color: 'navy' }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <IconButton label="Open navigation" className="mobile-menu" onClick={onMenu}>
          <Menu size={19} />
        </IconButton>
        <div className="crumb">
          <span>Workspace</span><span className="crumb-slash">/</span><strong>{pageTitle}</strong>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="role-toggle" aria-label="Demo role switcher">
          <button className={role === 'student' ? 'selected' : ''} onClick={() => onRoleChange('student')}>Student</button>
          <button className={role === 'admin' ? 'selected' : ''} onClick={() => onRoleChange('admin')}>Professor</button>
        </div>
        {role === 'student' && (
          <label className="student-select">
            <Avatar student={student} />
            <select aria-label="Demo student account" value={student.id} onChange={(event) => onStudentChange(event.target.value)}>
              {students.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
            <ChevronDown size={14} />
          </label>
        )}
        <span className="topbar-divider" />
        <IconButton label="Notifications"><Bell size={18} /><i className="notification-dot" /></IconButton>
        <Avatar student={account} />
      </div>
    </header>
  )
}
