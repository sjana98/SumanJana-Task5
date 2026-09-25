const referenceDate = new Date('2026-09-25T12:00:00')

export function formatDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function daysUntil(value) {
  return Math.ceil((new Date(`${value}T23:59:00`) - referenceDate) / 86400000)
}

export function getPercent(value, total) {
  return total ? Math.round((value / total) * 100) : 0
}

export function getCourseColor(course) {
  if (course.includes('Marketing')) return 'purple'
  if (course.includes('Design')) return 'orange'
  if (course.includes('Research')) return 'blue'
  return 'green'
}
