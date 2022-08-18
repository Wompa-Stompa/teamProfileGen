const Employee = require('../lib/Employee.js');

test('creates employee object', () => {
    const employee = new Employee('Cheech Marin', '2', 'davesnothere@dmail.net');

    expect(employee.name).toBe('Cheech Marin');
    expect(employee.id).toBe('2');
    expect(employee.email).toBe('davesnothere@dmail.net');
});
