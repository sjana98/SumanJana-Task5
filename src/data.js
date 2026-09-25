export const students = [
  { id: 'stu-1', name: 'Maya Patel', email: 'maya.patel@campus.edu', initials: 'MP', color: 'lavender' },
  { id: 'stu-2', name: 'Ethan Brooks', email: 'ethan.brooks@campus.edu', initials: 'EB', color: 'peach' },
  { id: 'stu-3', name: 'Sofia Chen', email: 'sofia.chen@campus.edu', initials: 'SC', color: 'mint' },
  { id: 'stu-4', name: 'Noah Williams', email: 'noah.williams@campus.edu', initials: 'NW', color: 'blue' },
]

export const initialAssignments = [
  { id: 'as-1', title: 'Brand Strategy Case Study', course: 'Marketing 204', due: '2026-09-26', created: '2026-09-12', description: 'Analyze the positioning of a modern consumer brand and propose a clear direction for its next growth stage.', driveLink: 'https://drive.google.com/drive/my-drive', status: { 'stu-1': 'submitted', 'stu-2': 'pending', 'stu-3': 'submitted', 'stu-4': 'pending' } },
  { id: 'as-2', title: 'Interface Design Principles', course: 'Design Studio', due: '2026-09-28', created: '2026-09-15', description: 'Create a responsive landing page concept and explain the design decisions behind your layout.', driveLink: 'https://drive.google.com/drive/my-drive', status: { 'stu-1': 'pending', 'stu-2': 'submitted', 'stu-3': 'pending', 'stu-4': 'submitted' } },
  { id: 'as-3', title: 'Research Methods Reflection', course: 'Research 101', due: '2026-10-02', created: '2026-09-18', description: 'Reflect on the research method you would choose for a question of your choice, with supporting references.', driveLink: '', status: { 'stu-1': 'submitted', 'stu-2': 'submitted', 'stu-3': 'pending', 'stu-4': 'pending' } },
  { id: 'as-4', title: 'Product Launch Presentation', course: 'Business Lab', due: '2026-10-06', created: '2026-09-20', description: 'Build a concise launch plan for a new product, covering audience, channels, and success metrics.', driveLink: 'https://drive.google.com/drive/my-drive', status: { 'stu-1': 'pending', 'stu-2': 'pending', 'stu-3': 'pending', 'stu-4': 'pending' } },
]

export function readStored(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}
