<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory - Dashboard</title>
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
    <div id="app">
        <header>
            <h1>Employee Directory</h1>
            <div class="controls">
                <input type="text" id="search-input" placeholder="Search by name or email" aria-label="Search employees">
                <button id="filter-btn">Filter</button>
                <button id="add-employee-btn">Add Employee</button>
                <select id="sort-by">
                    <option value="">Sort By</option>
                    <option value="firstName">First Name</option>
                    <option value="department">Department</option>
                </select>
            </div>
        </header>
        <div id="filter-panel" class="hidden">
            <h2>Filter Employees</h2>
            <input type="text" id="filter-firstName" placeholder="First Name">
            <input type="text" id="filter-department" placeholder="Department">
            <input type="text" id="filter-role" placeholder="Role">
            <button id="apply-filter-btn">Apply Filter</button>
            <button id="clear-filter-btn">Clear</button>
        </div>
        <div id="employee-list-container">
            <#if employees?? && employees?size gt 0>
                <#list employees as employee>
                    <div class="employee-card" data-employee-id="${employee.id}">
                        <h3>${employee.firstName?html} ${employee.lastName?html}</h3>
                        <p>ID: ${employee.id}</p>
                        <p>Email: ${employee.email?html}</p>
                        <p>Department: ${employee.department?html}</p>
                        <p>Role: ${employee.role?html}</p>
                        <button class="edit-btn" data-id="${employee.id}" aria-label="Edit employee ${employee.firstName}">Edit</button>
                        <button class="delete-btn" data-id="${employee.id}" aria-label="Delete employee ${employee.firstName}">Delete</button>
                    </div>
                <#else>
                    <p>No employees found.</p>
                </#list>
            <#else>
                <p>No employees found.</p>
            </#if>
        </div>
        <div class="pagination">
            <button id="prev-page" disabled>Previous</button>
            <span id="page-info">Page 1 of 1</span>
            <button id="next-page" disabled>Next</button>
            <select id="items-per-page">
                <option value="10">10 per page</option>
                <option value="25">25 per page</option>
                <option value="50">50 per page</option>
                <option value="100">100 per page</option>
            </select>
        </div>
    </div>
    <script src="/static/js/data.js"></script>
    <script src="/static/js/employeeManager.js"></script>
    <script src="/static/js/app.js"></script>
</body>
</html>