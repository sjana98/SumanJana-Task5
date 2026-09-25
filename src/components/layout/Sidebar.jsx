import {
  ArrowRight, BookOpen, ChevronDown, CircleHelp, LayoutDashboard,
  MoreHorizontal, Plus, Users, X,
} from 'lucide-react'

const studentNavigation = [
  { label: 'My assignments', icon: LayoutDashboard },
  { label: 'Courses', icon: BookOpen },
]

const professorNavigation = [
  { label: 'Assignment overview', icon: LayoutDashboard },
  { label: 'Students', icon: Users },
]

const courses = [
  { name: 'Marketing 204', color: 'purple' },
  { name: 'Design Studio', color: 'orange' },
  { name: 'Research 101', color: 'blue' },
  { name: 'Business Lab', color: 'green' },
]

export default function Sidebar({ role, active, onNavigate, open, onClose }) {
  const navigation = role === 'student' ? studentNavigation : professorNavigation

  return (
    <>
      <div className={`sidebar-backdrop ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <span className="brand-mark"><span /><span /><span /></span>
          <span>joineazy</span>
          <button className="sidebar-close" onClick={onClose} aria-label="Close navigation"><X size={19} /></button>
        </div>

        <div className="workspace-switch">
          <div className="workspace-logo">N</div>
          <div><strong>Northstar Academy</strong><small>Workspace</small></div>
          <ChevronDown size={15} />
        </div>

        <div className="nav-label">MENU</div>
        <nav>
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-link ${active === label ? 'nav-active' : ''}`}
              onClick={() => { onNavigate(label); onClose() }}
            >
              <Icon size={18} /><span>{label}</span>
              {label === 'My assignments' && <span className="nav-count">4</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-course-head">
          <span className="nav-label">YOUR COURSES</span>
          <button aria-label="Add course"><Plus size={16} /></button>
        </div>
        <div className="course-list">
          {courses.map((course) => (
            <button key={course.name}>
              <span className={`course-dot dot-${course.color}`} />{course.name}
            </button>
          ))}
        </div>

        <div className="sidebar-spacer" />
        <div className="help-card">
          <span className="help-icon"><CircleHelp size={17} /></span>
          <strong>Need a hand?</strong>
          <p>We’re here to help you stay on track.</p>
          <button>Visit help center <ArrowRight size={14} /></button>
        </div>
        <div className="sidebar-profile">
          <span className="profile-avatar">JW</span>
          <div><strong>Jordan Wilson</strong><small>{role === 'student' ? 'Student account' : 'Professor account'}</small></div>
          <MoreHorizontal size={19} />
        </div>
      </aside>
    </>
  )
}
