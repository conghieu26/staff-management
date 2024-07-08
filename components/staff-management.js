// import { Staff } from "./staff"
// import { fetchApi } from "./conflig"

import fetchApi from "./conflig.js";

export const renderInformation = () => {
  const staffPromise = fetchApi("staff", {
    method: "GET",
  });
  staffPromise
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      const tbody = document.getElementById("tbody");
      const content = response
        .map((item) => {
          return `
            <tr>
              <td>${item.staffcode}</td>
              <td>${item.name}</td>
              <td>${item.position}</td>
              <td>${item.salary}</td>
              <td>${item}</td>
              <td>1</td>
              <td>Nhân viên xuất sắc</td>
              <td><button class="btn btn-delete">Xóa</button></td>
            </tr>
            `;
        })
        .join(" ");
      tbody.innerHTML = content;
    });
};

export function createStaff(staff) {
  fetchApi("staff", {
    method: "POST",
    body: JSON.stringify(staff),
  }).finally(() => {
    renderInformation();
  });
}
function deleteStaff() {}

document.addEventListener("DOMContentLoaded", () => {
  renderInformation();
});
