const Manager = require("../lib/Manager");

test('getRole() should return "Manager"', () => {
  const test = "Manager";
  const e = new Manager("Hi", 1, "phoenix@phoenix.com", "GitHub");
  expect(e.getRole()).toBe(test);
});

test("Can get Office Number from getOfficeNumber()", () => {
  const test = 999;
  const e = new Manager("Hi", 1, "tyler@tyler.com", test);
  expect(e.getOfficeNumber()).toBe(test);
});
