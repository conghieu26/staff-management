import { Staff } from "./components/staff";
import { createStaff } from "./components/staff-management";

const formEle = document.getElementById("form");

formEle.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputEle = document.querySelectorAll("#form input, #form select");

  const listStaff = {};

  inputEle.forEach((ele) => {
    listStaff[ele.id] = ele.value;
  });
  // console.log(listStaff);
  const newStaff = new Staff(
    listStaff.maNV,
    listStaff.tenNV,
    listStaff.chucVu,
    listStaff.luongCB,
    listStaff.gioLam
  );
  console.log(newStaff);
  createStaff(newStaff);
});
