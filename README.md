# Joineazy Assignment & Review Dashboard

A responsive React dashboard for students and professors to manage assignment submissions. This frontend uses seeded demo data and browser `localStorage`; it does not require a backend or account service.

## Run locally

Requirements: Node.js 20.19+ (or 22.12+) and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. For an optimized production build:

```bash
npm run build
npm run preview
```

## Try the demo

- Use the role switcher in the top bar to move between **Student** and **Professor** views.
- The student selector changes the demo identity. Each student sees only their own submission state; the professor view shows all students for assignments in the workspace.
- Select **Mark as submitted** and complete both confirmation steps to update that student's status.
- In Professor view, create, edit, or delete an assignment. Each assignment can include a Google Drive link for external submission.
- Assignment updates persist in the current browser using `localStorage`. Use the browser's site data controls to restore the original demo seed.

## Structure

```text
src/
  components/
    common/     Reusable avatar, icon button, progress bar, and statistic card
    layout/     Shared page header and responsive workspace sidebar
  features/
    student/    Student dashboard, assignment card, submission confirmation
    professor/  Professor dashboard, assignment card, create/edit form
  hooks/        Assignment state and localStorage persistence
  utils/        Assignment date, course color, and progress helpers
  App.jsx       App shell, role selection, and feature composition
  data.js       Demo student and assignment records
  main.jsx      React entry point
  styles.css    Tailwind setup, component styling, responsive breakpoints
  styles/
    responsive.css Tablet and phone layout overrides
index.html
vite.config.js
tailwind.config.js
postcss.config.js
```

## Architecture and design

The app follows a feature-based component structure. `App` composes the shared layout and selects the student or professor feature. Reusable display and layout components live under `components/`; role-specific screens, cards, and dialogs live under `features/student/` and `features/professor/`. The `useAssignments` hook owns shared assignment state, localStorage persistence, and create/update/delete/submission actions. Formatting and progress calculations are kept in `utils/assignment.js`. Student submission confirmation is a two-step flow before the per-student status changes. The professor overview renders submitted/not-submitted progress for the four demo students.

Tailwind CSS is configured and used for responsive summary-card grids: cards display in two columns on small and medium screens and four columns on wide screens. A compact custom stylesheet provides the dashboard's visual system, while responsive overrides move the sidebar into a drawer on tablet and phone widths and prevent the header, footer, and professor progress rows from overflowing on narrow screens.

## Notes

- Demo identities and assignment records are fictional.
- Drive URLs are example links; replace them with real submission folders for a live demonstration.
- A production deployment can be made on Netlify or Vercel using `npm run build` and the `dist` output directory.
