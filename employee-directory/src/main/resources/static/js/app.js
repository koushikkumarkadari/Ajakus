import { EmployeeManager } from './employeeManager.js';

const empManager = new EmployeeManager();
let currentPage = 1;
let itemsPerPage = 10;
let currentFilters = {};
let currentSearch = '';
let currentSort = '';

function renderEmployeeList(employees) {
    const container = document.querySelector('#employee-list-container');
    if (!container) return;
    
    container.innerHTML = employees.length > 0
        ? employees.map(emp => `
            <div class="employee-card" data-employee-id="${emp.id}">
                <h3>${emp.firstName} ${emp.lastName}</h3>
                <p>ID: ${emp.id}</p>
                <p>Email: ${emp.email}</p>
                <p>Department: ${emp.department}</p>
                <p>Role: ${emp.role}</p>
                <button class="edit-btn" data-id="${emp.id}" aria-label="Edit employee ${emp.firstName}">Edit</button>
                <button class="delete-btn" data-id="${emp.id}" aria-label="Delete employee ${emp.firstName}">Delete</button>
            </div>
        `).join('')
        : '<p>No employees found.</p>';

    addEmployeeEventListeners();
}

function renderPagination(employees) {
    const totalPages = Math.ceil(employees.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const paginatedEmployees = employees.slice(start, start + itemsPerPage);
    
    renderEmployeeList(paginatedEmployees);
    
    const pageInfo = document.querySelector('#page-info');
    const prevBtn = document.querySelector('#prev-page');
    const nextBtn = document.querySelector('#next-page');
    
    if (pageInfo) pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

function applyFiltersAndSort() {
    let employees = empManager.getEmployees();
    
    if (Object.keys(currentFilters).length > 0) {
        employees = empManager.filterEmployees(currentFilters);
    }
    
    if (currentSearch) {
        employees = empManager.searchEmployees(currentSearch);
    }
    
    if (currentSort) {
        employees = empManager.sortEmployees(currentSort);
    }
    
    renderPagination(employees);
}

function validateForm(formData) {
    const errors = {};
    if (!formData.firstName) errors.firstName = 'First Name is required';
    if (!formData.lastName) errors.lastName = 'Last Name is required';
    if (!formData.email) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Invalid email format';
    }
    if (!formData.department) errors.department = 'Department is required';
    if (!formData.role) errors.role = 'Role is required';
    return errors;
}

function displayErrors(errors) {
    ['firstName', 'lastName', 'email', 'department', 'role'].forEach(field => {
        const errorElement = document.querySelector(`#${field}-error`);
        if (errorElement) errorElement.textContent = errors[field] || '';
    });
}

function addEmployeeEventListeners() {
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            window.location.href = `/add-edit-form.ftlh?editId=${id}`;
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this employee?')) {
                empManager.deleteEmployee(id);
                applyFiltersAndSort();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Dashboard page logic
    if (document.querySelector('#employee-list-container')) {
        const searchInput = document.querySelector('#search-input');
        const filterBtn = document.querySelector('#filter-btn');
        const applyFilterBtn = document.querySelector('#apply-filter-btn');
        const clearFilterBtn = document.querySelector('#clear-filter-btn');
        const sortBy = document.querySelector('#sort-by');
        const itemsPerPageSelect = document.querySelector('#items-per-page');
        const prevPage = document.querySelector('#prev-page');
        const nextPage = document.querySelector('#next-page');
        const addEmployeeBtn = document.querySelector('#add-employee-btn');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearch = e.target.value;
                currentPage = 1;
                applyFiltersAndSort();
            });
        }

        if (filterBtn) {
            filterBtn.addEventListener('click', () => {
                const filterPanel = document.querySelector('#filter-panel');
                if (filterPanel) filterPanel.classList.toggle('hidden');
            });
        }

        if (applyFilterBtn) {
            applyFilterBtn.addEventListener('click', () => {
                currentFilters = {
                    firstName: document.querySelector('#filter-firstName')?.value || '',
                    department: document.querySelector('#filter-department')?.value || '',
                    role: document.querySelector('#filter-role')?.value || ''
                };
                currentPage = 1;
                applyFiltersAndSort();
                document.querySelector('#filter-panel').classList.add('hidden');
            });
        }

        if (clearFilterBtn) {
            clearFilterBtn.addEventListener('click', () => {
                currentFilters = {};
                document.querySelector('#filter-firstName').value = '';
                document.querySelector('#filter-department').value = '';
                document.querySelector('#filter-role').value = '';
                currentPage = 1;
                applyFiltersAndSort();
                document.querySelector('#filter-panel').classList.add('hidden');
            });
        }

        if (sortBy) {
            sortBy.addEventListener('change', (e) => {
                currentSort = e.target.value;
                currentPage = 1;
                applyFiltersAndSort();
            });
        }

        if (itemsPerPageSelect) {
            itemsPerPageSelect.addEventListener('change', (e) => {
                itemsPerPage = parseInt(e.target.value);
                currentPage = 1;
                applyFiltersAndSort();
            });
        }

        if (prevPage) {
            prevPage.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    applyFiltersAndSort();
                }
            });
        }

        if (nextPage) {
            nextPage.addEventListener('click', () => {
                const totalPages = Math.ceil(empManager.getEmployees().length / itemsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    applyFiltersAndSort();
                }
            });
        }

        if (addEmployeeBtn) {
            addEmployeeBtn.addEventListener('click', () => {
                window.location.href = '/add-edit-form.ftlh';
            });
        }

        applyFiltersAndSort();
    }

    // Form page logic
    if (document.querySelector('#employee-form')) {
        const form = document.querySelector('#employee-form');
        const cancelBtn = document.querySelector('#cancel-btn');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = {
                firstName: document.querySelector('#firstName').value,
                lastName: document.querySelector('#lastName').value,
                email: document.querySelector('#email').value,
                department: document.querySelector('#department').value,
                role: document.querySelector('#role').value
            };
            const id = document.querySelector('#employee-id').value;

            const errors = validateForm(formData);
            if (Object.keys(errors).length > 0) {
                displayErrors(errors);
                return;
            }

            if (id === '0') {
                empManager.addEmployee(formData);
            } else {
                empManager.updateEmployee(id, formData);
            }

            window.location.href = '/dashboard.ftlh';
        });

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                window.location.href = '/dashboard.ftlh';
            });
        }
    }
});