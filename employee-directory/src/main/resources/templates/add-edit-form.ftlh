<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory - Add/Edit Employee</title>
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
    <div id="app">
        <header>
            <h1>${(employee??)?string('Edit Employee', 'Add Employee')}</h1>
        </header>
        <form id="employee-form">
            <input type="hidden" id="employee-id" value="${(employee.id)!'0'}">
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" value="${(employee.firstName)!'']?html}" required>
                <span class="error" id="firstName-error"></span>
            </div>
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" value="${(employee.lastName)!'']?html}" required>
                <span class="error" id="lastName-error"></span>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" value="${(employee.email)!'']?html}" required>
                <span class="error" id="email-error"></span>
            </div>
            <div class="form-group">
                <label for="department">Department</label>
                <input type="text" id="department" value="${(employee.department)!'']?html}" required>
                <span class="error" id="department-error"></span>
            </div>
            <div class="form-group">
                <label for="role">Role</label>
                <input type="text" id="role" value="${(employee.role)!'']?html}" required>
                <span class="error" id="role-error"></span>
            </div>
            <button type="submit">Save</button>
            <button type="button" id="cancel-btn">Cancel</button>
        </form>
    </div>
    <script src="/static/js/data.js"></script>
    <script src="/static/js/employeeManager.js"></script>
    <script src="/static/js/app.js"></script>
</body>
</html>