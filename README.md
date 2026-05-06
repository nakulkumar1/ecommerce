# Smart Study Planner

A React + Vite study task planner for students. It helps users add study tasks, organize them by subject and priority, check progress, and view simple analytics.

## Live Demo

Add your Vercel or Netlify link here after deployment.

## Main Features

- Add, complete, delete, and clear study tasks
- Store tasks and dark mode preference in localStorage
- Search tasks with debounced input
- Filter by status and sort by recent, alphabetical, or priority
- Paginated task list with 5 tasks per page
- Dark mode toggle
- Simple analytics page with progress, weekly activity, priority count, subject table, and notes
- Error Boundary for app-level error handling
- Responsive layout with Tailwind CSS

## SOP Requirement Check

| SOP Requirement | Status |
| --- | --- |
| React with Vite | Done |
| JavaScript ES6+ | Done |
| Context API / Redux | Done with Context API |
| React Router | Done |
| API / Data Integration | Uses localStorage data |
| CRUD Operations | Done |
| Search + Filter + Sort | Done |
| Pagination / Infinite Scroll | Done with pagination |
| Dark Mode | Done |
| Performance Optimization | Done with lazy loading, memo, useMemo, useCallback, debounce |
| Error Handling | Done with Error Boundary and safe localStorage handling |
| Deployment | Student will deploy |

## Tech Stack

- React
- Vite
- JavaScript
- React Router
- Context API
- Tailwind CSS
- localStorage

## Project Structure

```text
src/
  components/
    ErrorBoundary.jsx
    LoadingStates.jsx
    Navbar.jsx
    Sidebar.jsx
    StatCard.jsx
    StudyQuote.jsx
    TaskItem.jsx
  context/
    TaskContext.jsx
  hooks/
    useCustomHooks.js
  pages/
    Analytics.jsx
    Dashboard.jsx
    Tasks.jsx
  App.jsx
  main.jsx
```

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Deployment

You can deploy the project on Vercel or Netlify. Build command:

```bash
npm run build
```

Publish folder:

```text
dist
```
