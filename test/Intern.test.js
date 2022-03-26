const Intern = require("../lib/Intern");

test("Can set name via constructor arguments", () => {
  const school = "Tyler";
  const e = new Intern(school);
  expect(e.school).toBe(school);
});

test('getRole() should return "Intern"', () => {
  const test = "Intern";
  const e = new Intern("Hi", 1, "tyler@tyler.com", "Tyler University");
  expect(e.getRole()).toBe(test);
});

test("Can get School from getSchool()", () => {
  const test = "Tyler University";
  const e = new Intern("Hi", 1, "what@what.com", test);
  expect(e.getSchool()).toBe(test);
});
