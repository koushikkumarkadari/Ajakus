Employee Directory Web Interface
Overview
This project is a responsive web interface for an Employee Directory, built as part of the AJACKUS assignment. It uses HTML, CSS, JavaScript, and Freemarker templates to display, add, edit, delete, filter, sort, and search employees, with pagination for efficient data handling.
Features

Dashboard: Displays a grid of employee cards with ID, First Name, Last Name, Email, Department, and Role.
Add/Edit Form: Allows adding new employees or editing existing ones with client-side validation.
Delete: Removes employees with a confirmation prompt.
Search: Filters employees by name or email.
Filter: Filters by First Name, Department, or Role.
Sort: Sorts by First Name or Department.
Pagination: Displays 10, 25, 50, or 100 employees per page.
Responsive Design: Adapts to desktop, tablet, and mobile screens.

Setup and Running

Clone the repository: git clone <repo-url>
Open src/main/resources/templates/dashboard.ftlh in a browser to view the dashboard. (Note: Without a Freemarker server, you can test by simulating Freemarker data injection via data.js in a local web server like http-server or Live Server in VS Code.)
Ensure a modern browser is used (Chrome, Firefox, etc.).
For a full Freemarker setup, configure a Java server (e.g., Spring Boot) to process .ftlh files and pass mockEmployees as the employees variable.

Project Structure

src/main/resources/templates/: Contains Freemarker templates (dashboard.ftlh, add-edit-form.ftlh).
src/main/resources/static/css/style.css: Styles for responsive layout and UI components.
src/main/resources/static/js/:
data.js: Mock employee data.
employeeManager.js: Handles data operations (add, edit, delete, filter, sort).
app.js: Main logic for UI rendering and event handling.



Screenshots

Dashboard (Desktop): Shows employee grid, search bar, filter/sort controls, and pagination.
Dashboard (Mobile): Stacked employee cards with accessible controls.
Add/Edit Form: Form with validation and error messages.
Filter Panel: Popup for filtering by First Name, Department, or Role.

Design Decisions

Pagination vs. Infinite Scroll: Chose pagination for simplicity and better UX control, ensuring compatibility with filtering and sorting.
CSS Grid: Used for responsive employee card layout, with media queries for tablet/mobile.
Module Pattern: Implemented EmployeeManager class for data operations, improving code modularity and maintainability.
Freemarker Simulation: Used data.js to mimic Freemarker data injection, as no backend is required.

Reflection

Challenges Faced: Combining filter, search, and sort with pagination was complex. I addressed this by creating a pipeline in app.js where filters are applied first, followed by search, sort, and pagination. Ensuring the UI updated seamlessly required careful state management.
Improvements: With more time, I’d add:
Animations for card transitions to enhance UX.
LocalStorage to persist employee data across sessions.
Advanced filtering (e.g., multiple values per field).
Unit tests for EmployeeManager methods.



Testing

Tested all features (add, edit, delete, filter, sort, search, pagination) on Chrome and Firefox.
Verified responsiveness using browser dev tools for mobile (480px) and tablet (768px) views.
Ensured form validation catches all edge cases (e.g., invalid email, empty fields).
