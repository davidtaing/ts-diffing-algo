import { diff } from "./diff";

type TestTable = {
  title: string;
  left: unknown;
  right: unknown;
  expected: unknown;
}[];

type TestTableData = TestTable[number];

describe("Comparing Same Primitive Type", () => {
  it("returns null when values are the same", () => {
    const left = "string";
    const right = "string";

    const result = diff(left, right);

    expect(result).toBeNull();
  });

  it("returns null when different values but same primitive type", () => {
    const left = "string";
    const right = "100";

    const result = diff(left, right);

    expect(result).toBeNull();
  });
});

describe("Comparing Different primitive types", () => {
  const table: TestTable = [
    {
      title: "left is undefined",
      left: undefined,
      right: "string",
      expected: { right: "string" }
    },
    {
      title: "right is undefined",
      left: "string",
      right: undefined,
      expected: { left: "string" }
    },
    {
      title: "left is null and right is a value",
      left: null,
      right: "string",
      expected: { left: null, right: "string" }
    },
    {
      title: "left is a value and right is null",
      left: "string",
      right: null,
      expected: { left: "string", right: null }
    },
    {
      title: "left is undefined and right is null",
      left: undefined,
      right: null,
      expected: { right: null }
    }
  ];

  test.each(table)("$title", ({ left, right, expected }: TestTableData) => {
    const result = diff(left, right);

    expect(result).toStrictEqual(expected);
  });
});

describe("Comparing Non-Nested Objects", () => {
  const table: TestTable = [
    {
      title: "Empty Objects",
      left: {},
      right: {},
      expected: null
    },
    {
      title: "Same key values",
      left: { a: "string" },
      right: { a: "string" },
      expected: null
    },
    {
      title: "Different key values, same key types",
      left: { a: "string" },
      right: { a: "100" },
      expected: null
    },
    {
      title: "Different key types",
      left: { a: "string" },
      right: { a: 100 },
      expected: {
        a: {
          left: "string",
          right: 100
        }
      }
    },
    {
      title: "Left key not in right",
      left: { a: "string" },
      right: {},
      expected: {
        a: {
          left: "string"
        }
      }
    }
  ];

  test.each(table)("$title", ({ left, right, expected }: TestTableData) => {
    const result = diff(left, right);

    expect(result).toStrictEqual(expected);
  });
});

describe("Comparing Arrays", () => {
  const table: TestTable = [
    {
      title: "Empty Arrays",
      left: [],
      right: [],
      expected: null
    },
    {
      title: "Matching Arrays",
      left: [{ a: "string" }],
      right: [{ a: "string" }],
      expected: null
    },
    {
      title: "Right Array is Empty",
      left: [{}],
      right: [],
      expected: [{ left: {} }]
    },
    {
      title: "Diffs both Arrays",
      left: [{ a: "Diffed" }],
      right: [{}],
      expected: [{ a: { left: "Diffed" } }]
    },
    {
      title: "Diffs both Arrays",
      left: [{ a: "Diffed" }, {}],
      right: [{}],
      expected: [{ a: { left: "Diffed" } }, { left: {} }]
    }
  ];

  test.each(table)("$title", ({ left, right, expected }: TestTableData) => {
    const result = diff(left, right);

    expect(result).toStrictEqual(expected);
  });
});

describe("Comparing Primitives with Non-Primitives", () => {
  const table: TestTable = [
    {
      title: "Left is an Object and Right is a Primitive",
      left: {},
      right: "hello world",
      expected: { left: {}, right: "hello world" }
    },
    {
      title: "Left is an undefined and Right is an Object",
      left: undefined,
      right: {},
      expected: { right: {} }
    },
    {
      title: "Left is an null and Right is an Object",
      left: null,
      right: {},
      expected: { left: null, right: {} }
    },
    {
      title: "Left is an Array and Right is a Primitive",
      left: ["hello"],
      right: "world",
      expected: { left: ["hello"], right: "world" }
    },
    {
      title: "Left is an undefined and Right is an Array",
      left: undefined,
      right: [{}],
      expected: { right: [{}] }
    },
    {
      title: "Left is an null and Right is an Array",
      left: null,
      right: [{}],
      expected: { left: null, right: [{}] }
    }
  ];

  test.each(table)("$title", ({ left, right, expected }: TestTableData) => {
    const result = diff(left, right);

    expect(result).toStrictEqual(expected);
  });
});

describe("Comparing nested Objects", () => {
  const table: TestTable = [
    {
      title: "Matching nested objects",
      left: { a: {} },
      right: { a: {} },
      expected: null
    },
    {
      title: "Matching keys, but different types/values",
      left: { a: {} },
      right: { a: null },
      expected: { a: { left: {}, right: null } }
    },
    {
      title: "Doubly nested Object vs single nested Object",
      left: { a: { b: {} } },
      right: { a: {} },
      expected: { a: { b: { left: {} } } }
    }
  ];

  test.each(table)("$title", ({ left, right, expected }: TestTableData) => {
    const result = diff(left, right);

    expect(result).toStrictEqual(expected);
  });
});
