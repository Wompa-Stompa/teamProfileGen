const Manager = require('../lib/Manager.js');

test('create manager object', () => {
    const manager = new Manager('Henry Walton Jones, Jr.', '12', 'indy@dmail.net', '02');

    expect(manager.name).toEqual(expect.any(String));
    expect(manager.id).toEqual(expect.any(String));
    expect(manager.officeNumber).toEqual(expect.any(String));
    expect(manager.email).toEqual(expect.any(String));    
    
});