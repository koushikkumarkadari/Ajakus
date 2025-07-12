export class EmployeeManager {
    constructor() {
        this.employees = mockEmployees;
    }

    addEmployee(employee) {
        const id = Date.now();
        this.employees.push({ id, ...employee });
    }

    updateEmployee(id, updatedData) {
        const index = this.employees.findIndex(emp => emp.id === parseInt(id));
        if (index !== -1) {
            this.employees[index] = { id: parseInt(id), ...updatedData };
        }
    }

    deleteEmployee(id) {
        this.employees = this.employees.filter(emp => emp.id !== parseInt(id));
    }

    getEmployees() {
        return [...this.employees];
    }

    filterEmployees(filters) {
        return this.employees.filter(emp => {
            return (!filters.firstName || emp.firstName.toLowerCase().includes(filters.firstName.toLowerCase())) &&
                   (!filters.department || emp.department.toLowerCase().includes(filters.department.toLowerCase())) &&
                   (!filters.role || emp.role.toLowerCase().includes(filters.role.toLowerCase()));
        });
    }

    searchEmployees(query) {
        query = query.toLowerCase();
        return this.employees.filter(emp =>
            emp.firstName.toLowerCase().includes(query) ||
            emp.lastName.toLowerCase().includes(query) ||
            emp.email.toLowerCase().includes(query)
        );
    }

    sortEmployees(field) {
        return [...this.employees].sort((a, b) => {
            if (field === 'firstName') {
                return a.firstName.localeCompare(b.firstName);
            } else if (field === 'department') {
                return a.department.localeCompare(b.department);
            }
            return 0;
        });
    }
}