// import { Staff } from "./staff"
// import { fetchApi } from "./conflig"

import fetchApi from "./conflig.js";

export function createStaff(staff) {
  fetchApi("staff", {
    method: "POST",
    body: JSON.stringify(staff),
  });
}
function deleteStaff() {}
function renderInformation() {}
