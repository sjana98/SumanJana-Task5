import { useState } from 'react'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import ProfessorDashboard from './features/professor/ProfessorDashboard'
import StudentDashboard from './features/student/StudentDashboard'
import useAssignments from './hooks/useAssignments'
import { students } from './data'

export default function App() {
  const [role, setRole] = useState('student')
  const [studentId, setStudentId] = useState(students[0].id)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activePage, setActivePage] = useState('My assignments')
  const { assignments, confirmSubmission, saveAssignment, deleteAssignment } = useAssignments()
  const student = students.find((item) => item.id === studentId) || students[0]

  function changeRole(nextRole) {
    setRole(nextRole)
    setActivePage(nextRole === 'student' ? 'My assignments' : 'Assignment overview')
  }

  return (
    <div className="app-shell">
      <Sidebar
        role={role}
        active={activePage}
        onNavigate={setActivePage}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="main-area">
        <Header
          role={role}
          onRoleChange={changeRole}
          student={student}
          onStudentChange={setStudentId}
          onMenu={() => setSidebarOpen(true)}
        />
        <div className="page-content">
          {role === 'student' ? (
            <StudentDashboard
              key={student.id}
              student={student}
              assignments={assignments}
              onConfirm={confirmSubmission}
            />
          ) : (
            <ProfessorDashboard
              assignments={assignments}
              onSave={saveAssignment}
              onDelete={deleteAssignment}
            />
          )}
          <footer className="page-footer">
            <span>© 2026 Joineazy Learning</span>
            <span><a href="#help">Help center</a><i /> Made for your next big thing <span className="footer-spark">✦</span></span>
          </footer>
        </div>
      </main>
    </div>
  )
}
