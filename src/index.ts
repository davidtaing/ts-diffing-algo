import { diff } from "./diff";

const test = {
  title: "Diffs both Arrays",
  left: [{ a: "Diffed" }],
  right: [{}],
  expected: [{ a: { left: "Diffed" } }],
};

console.log(diff(test.left, test.right));
