const Intern = require("../lib/Intern");

test("Can get Github", () => {
  const test = "GitHubUser";
  const e = new Intern("Hi", 1, "test@test.com", test);
  expect(e.github).toBe(test);
});

test('getRole() should return "Intern"', () => {
  const test = "Intern";
  const e = new Intern("Hi", 1, "test@test.com", "GitHub");
  expect(e.getRole()).toBe(test);
});

test("Can get GitHub from getGithub()", () => {
  const test = "GitHub";
  const e = new Intern("Hi", 1, "test@test.com", test);
  expect(e.getGithub()).toBe(test);
});
