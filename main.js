import { createStaff } from "./components/staff-management.js";
import { Staff } from "./model/staff.js";

const formEle = document.getElementById("form");

formEle.onsubmit = (e) => {
  e.preventDefault();

  const inputEle = document.querySelectorAll("#form input, #form select");

  const listStaff = {};

  inputEle.forEach((ele) => {
    listStaff[ele.id] = ele.value;
  });
  console.log(listStaff);
  const newStaff = new Staff(
    listStaff.maNV,
    listStaff.tenNV,
    listStaff.chucVu,
    listStaff.luongCB,
    listStaff.gioLam
  );
  // console.log(newStaff);
  createStaff(newStaff);
};
