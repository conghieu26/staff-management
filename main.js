import { createStaff } from "./components/staff-management.js";
import { Staff } from "./model/staff.js";

const formEle = document.getElementById("form");
const ListEle = document.querySelectorAll("#form input, #form select");

formEle.onsubmit = (e) => {
  e.preventDefault();

  const listStaff = {};

  ListEle.forEach((ele) => {
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
  formEle.reset();
};

const mapper = {
  maNV: "staffcode",
  tenNV: "name",
  chucVu: "position",
  luongCB: "salary",
  gioLam: "hourOfWord",
};

function handleBlur(event) {
  // return () => {
  //   console.log(ele.id);
  // };

  staff[mapper[event.target.id]].value = event.target.value;
  const filterStaff = Object.entries(staff).filter(([key, value]) => {
    return value.touch === true;
  });

  console.log(filterStaff);
  filterStaff.forEach(([key, value]) => {
    switch (key) {
      case "staffcode":
        const maNVRegex = /^\d{4,6}$/;
        if (!maNVRegex.test(value.value.trim())) {
          staff[key].errMsg = "Mã nhân viên tối đa 4 - 6 ký số";
        } else {
          staff[key].errMsg = "";
        }
        break;
      case "name":
        const regexChiNhapChu = /^[A-Za-z\s]+$/;
        if (!regexChiNhapChu.test(value.value.trim())) {
          staff[key].errMsg = "Tên nhân viên phải là chữ";
        } else {
          staff[key].errMsg = "";
        }
        break;
      case "salary":
        const luongCBRegex = /^(1\d{6}|20\d{6})$/;
        if (!luongCBRegex.test(value.value)) {
          staff[key].errMsg = "Lương cơ bản 1 000 000 - 20 000 000";
        } else {
          staff[key].errMsg = "";
        }
        break;
      case "hourOfWord":
        if (!(value.value >= 50 && value.value <= 150)) {
          staff[key].errMsg = "Số giờ làm trong tháng 50 - 150 giờ";
        } else {
          staff[key].errMsg = "";
        }
        break;
    }
  });
  renderForm();
}
const mapperErrors = {
  spanMaStaff: "staffcode",
  spanTenStaff: "name",
  spanChuVuStaff: "position",
  spanLuongStaff: "salary",
  spanTimeStaff: "hourOfWord",
};
function renderForm() {
  const ListEleErrors = document.querySelectorAll(
    "#form input + span,#form select + span"
  );
  console.log(ListEleErrors);
  ListEleErrors.forEach((ele) => {
    const key = mapperErrors[ele.id];

    if (staff[key]) {
      ele.innerHTML = staff[key].errMsg;
    } else {
      ele.innerHTML = "";
    }
  });
}
function handlefocus(event) {
  // return () => {
  //   console.log(ele.id);
  // };
  staff[mapper[event.target.id]].touch = true;
}

class DefaultValue {
  constructor(touch = false, value = "", errMsg = "") {
    (this.touch = touch), (this.value = value), (this.errMsg = errMsg);
  }
}
const staff = {
  staffcode: new DefaultValue(),
  name: new DefaultValue(),
  position: new DefaultValue(),
  salary: new DefaultValue(),
  hourOfWord: new DefaultValue(),
};

ListEle.forEach((ele) => {
  ele.onblur = handleBlur;
  ele.onfocus = handlefocus;
});
