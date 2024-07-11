// import { Staff } from "./staff"
// import { fetchApi } from "./conflig"

import fetchApi from "./conflig.js";

export const renderInformation = () => {
  const staffPromise = fetchApi("staff", {
    method: "GET",
  });
  staffPromise
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((response) => {
      // console.log(response);
      const tbody = document.getElementById("tbody");
      const content = response
        .map((item) => {
          return `
            <tr>
              <td>${item.staffcode}</td>
              <td>${item.name}</td>
              <td>${item.position}</td>
              <td>${item.salary}</td>
              <td>${TotalSalary(
                Number(item.salary),
                Number(item.hourOfWord)
              )}</td>
              <td>${item.hourOfWord}</td>
              <td>Nhân viên xuất sắc</td>
              <td><button class="btn btn-delete" onclick='deleteStaff(${
                item.id
              })'>Xóa</button></td>
            </tr>
            `;
        })
        .join(" ");
      tbody.innerHTML = content;
    })
    .catch((err) => {
      console.log(err);
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
const toastEle = document.querySelector(".toast");
const deleteStaff = (id) => {
  fetchApi(`staff/${id}`, {
    method: "delete",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((response) => {
      toastEle.classList.add("show");
      const toastBodyEle = toastEle.querySelector(".toast-body");

      toastBodyEle.innerHTML = `Xoá sinh vien: ${response.name} thành công`;

      setTimeout(() => {
        toastEle.classList.remove("show");
      }, 3000);
    });
  renderInformation();

  // toastEle.classList.add("show");
};

window.deleteStaff = deleteStaff;

const TotalSalary = (salary, hourOdWord) => {
  return salary * hourOdWord;
};
window.TotalSalary = TotalSalary;
document.addEventListener("DOMContentLoaded", () => {
  renderInformation();
});
