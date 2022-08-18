const Intern = require('../lib/Intern.js');

test('creates intern object', () => {
    const intern = new Intern('Marion Ravenwood', '15', 'marion@adventuresociety.net', 'University of Missouri School of Journalism');

    expect(intern.name).toEqual(expect.any(String));
    expect(intern.id).toEqual(expect.any(String));
    expect(intern.school).toEqual(expect.any(String));
    expect(intern.email).toEqual(expect.any(String));
});