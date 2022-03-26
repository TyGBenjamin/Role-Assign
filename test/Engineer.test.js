const Engineer = require("../lib/Engineer");

test("Can get Github", () => {
  const test = "GitHubUser";
  const e = new Engineer("Hi", 1, "test@test.com", test);
  expect(e.github).toBe(testValue);
});

test('getRole() should return "Engineer"', () => {
  const test = "Engineer";
  const e = new Engineer("Hi", 1, "test@test.com", "GitHubUser");
  expect(e.getRole()).toBe(test);
});

test("Can get GitHub username via getGithub()", () => {
  const test = "GitHubUser";
  const e = new Engineer("Foo", 1, "test@test.com", test);
  expect(e.getGithub()).toBe(test);
});
