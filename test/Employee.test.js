const Employee = require("../lib/Employee");

test("Can instantiate Employee instance", () => {
  const e = new Employee();
  expect(typeof e).toBe("object");
});

test("Can set name via constructor arguments", () => {
  const name = "Tyler";
  const e = new Employee(name);
  expect(e.name).toBe(name);
});

test("Can set id via constructor argument", () => {
  const testValue = 100;
  const e = new Employee("Foo", testValue);
  expect(e.id).toBe(testValue);
});

test("Can set email via constructor argument", () => {
  const test = "test@test.com";
  const e = new Employee("Phoenix", 1, test);
  expect(e.email).toBe(testValue);
});

test("Can get name via getName()", () => {
  const test = "tyler";
  const e = new Employee(test);
  expect(e.getName()).toBe(test);
});

test("Can get id via getId()", () => {
  const test = 99;
  const e = new Employee("mike", test);
  expect(e.getId()).toBe(test);
});

test("Can get email via getEmail()", () => {
  const test = "tyler@gandy.com";
  const e = new Employee("Mike", 1, test);
  expect(e.getEmail()).toBe(test);
});

test('getRole() should return "Employee"', () => {
  const testValue = "Employee";
  const e = new Employee("Phoenix", 1, "test@test.com");
  expect(e.getRole()).toBe(testValue);
});
