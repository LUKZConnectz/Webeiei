const STORAGE_KEY = "webeiei_members";
const SESSION_KEY = "webeiei_current_user";

const getMembers = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
const setMembers = (members) => localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
const getCurrentUser = () => JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
const setCurrentUser = (user) => localStorage.setItem(SESSION_KEY, JSON.stringify(user));

const mobileToggle = document.querySelector(".mobile-toggle");
const navMenu = document.querySelector(".nav-menu");
const userChip = document.querySelector(".user-chip");
const userChipName = document.querySelector(".user-chip-name");
const logoutButton = document.querySelector(".logout-button");
const memberCount = document.querySelector("#member-count");

const toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2200,
  timerProgressBar: true,
});

const updateUi = () => {
  const currentUser = getCurrentUser();
  const members = getMembers();
  memberCount.textContent = `${58 + members.length} คน`;

  if (currentUser) {
    userChip.hidden = false;
    userChipName.textContent = currentUser.username;
    document.querySelectorAll(".auth-login, .auth-register").forEach((button) => {
      button.classList.add("is-muted");
    });
  } else {
    userChip.hidden = true;
    document.querySelectorAll(".auth-login, .auth-register").forEach((button) => {
      button.classList.remove("is-muted");
    });
  }
};

const closeMobileMenu = () => {
  navMenu.classList.remove("is-open");
  mobileToggle.setAttribute("aria-expanded", "false");
};

const showRegister = async () => {
  const { value: formValues } = await Swal.fire({
    title: "สมัครสมาชิก",
    html: `
      <input id="swal-name" class="swal2-input" placeholder="ชื่อผู้ใช้" autocomplete="username">
      <input id="swal-email" class="swal2-input" placeholder="อีเมล" type="email" autocomplete="email">
      <input id="swal-password" class="swal2-input" placeholder="รหัสผ่านอย่างน้อย 6 ตัว" type="password" autocomplete="new-password">
    `,
    confirmButtonText: "สร้างบัญชี",
    showCancelButton: true,
    cancelButtonText: "ยกเลิก",
    confirmButtonColor: "#e11d48",
    focusConfirm: false,
    preConfirm: () => {
      const username = document.getElementById("swal-name").value.trim();
      const email = document.getElementById("swal-email").value.trim().toLowerCase();
      const password = document.getElementById("swal-password").value;
      const members = getMembers();

      if (!username || !email || !password) return Swal.showValidationMessage("กรุณากรอกข้อมูลให้ครบ");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Swal.showValidationMessage("รูปแบบอีเมลไม่ถูกต้อง");
      if (password.length < 6) return Swal.showValidationMessage("รหัสผ่านต้องมีอย่างน้อย 6 ตัว");
      if (members.some((member) => member.email === email)) return Swal.showValidationMessage("อีเมลนี้ถูกใช้งานแล้ว");

      return { username, email, password };
    },
  });

  if (!formValues) return;
  const members = getMembers();
  const newMember = { ...formValues, createdAt: new Date().toISOString() };
  setMembers([...members, newMember]);
  setCurrentUser({ username: newMember.username, email: newMember.email });
  updateUi();
  closeMobileMenu();
  toast.fire({ icon: "success", title: "สมัครสมาชิกสำเร็จ" });
};

const showLogin = async () => {
  const { value: formValues } = await Swal.fire({
    title: "เข้าสู่ระบบ",
    html: `
      <input id="swal-email" class="swal2-input" placeholder="อีเมล" type="email" autocomplete="email">
      <input id="swal-password" class="swal2-input" placeholder="รหัสผ่าน" type="password" autocomplete="current-password">
    `,
    confirmButtonText: "เข้าสู่ระบบ",
    showCancelButton: true,
    cancelButtonText: "ยกเลิก",
    confirmButtonColor: "#e11d48",
    focusConfirm: false,
    preConfirm: () => {
      const email = document.getElementById("swal-email").value.trim().toLowerCase();
      const password = document.getElementById("swal-password").value;
      const member = getMembers().find((item) => item.email === email && item.password === password);

      if (!email || !password) return Swal.showValidationMessage("กรุณากรอกอีเมลและรหัสผ่าน");
      if (!member) return Swal.showValidationMessage("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      return { username: member.username, email: member.email };
    },
  });

  if (!formValues) return;
  setCurrentUser(formValues);
  updateUi();
  closeMobileMenu();
  toast.fire({ icon: "success", title: `ยินดีต้อนรับ ${formValues.username}` });
};

mobileToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  mobileToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".auth-register").forEach((button) => button.addEventListener("click", showRegister));
document.querySelectorAll(".auth-login").forEach((button) => button.addEventListener("click", showLogin));
logoutButton.addEventListener("click", () => {
  localStorage.removeItem(SESSION_KEY);
  updateUi();
  toast.fire({ icon: "info", title: "ออกจากระบบแล้ว" });
});

updateUi();
