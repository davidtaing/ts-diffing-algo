import { diff } from "./diff";

import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>`;

const test = {
  title: "Diffs both Arrays",
  left: [{ a: "Diffed" }],
  right: [{}],
  expected: [{ a: { left: "Diffed" } }]
};

console.log(diff(test.left, test.right));
