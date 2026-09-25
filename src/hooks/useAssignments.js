import { useEffect, useState } from 'react'
import { initialAssignments, readStored } from '../data'

const storageKey = 'joineazy.assignments'

export default function useAssignments() {
  const [assignments, setAssignments] = useState(() => (
    readStored(storageKey, initialAssignments)
  ))

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(assignments))
  }, [assignments])

  function confirmSubmission(assignmentId, studentId) {
    setAssignments((currentAssignments) => currentAssignments.map((assignment) => (
      assignment.id === assignmentId
        ? { ...assignment, status: { ...assignment.status, [studentId]: 'submitted' } }
        : assignment
    )))
  }

  function saveAssignment(updatedAssignment) {
    setAssignments((currentAssignments) => {
      const alreadyExists = currentAssignments.some(({ id }) => id === updatedAssignment.id)

      return alreadyExists
        ? currentAssignments.map((assignment) => (
          assignment.id === updatedAssignment.id ? updatedAssignment : assignment
        ))
        : [updatedAssignment, ...currentAssignments]
    })
  }

  function deleteAssignment(assignmentId) {
    setAssignments((currentAssignments) => (
      currentAssignments.filter(({ id }) => id !== assignmentId)
    ))
  }

  return { assignments, confirmSubmission, saveAssignment, deleteAssignment }
}
