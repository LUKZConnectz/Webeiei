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
const authModal = document.querySelector("#auth-modal");
const authForm = document.querySelector("#auth-form");
const authTitle = document.querySelector("#auth-modal-title");
const authError = document.querySelector("#auth-error");
const authEmail = document.querySelector("#auth-email");
const authPassword = document.querySelector("#auth-password");
const authUsername = document.querySelector("#auth-username");
const authSubmit = document.querySelector(".auth-submit");
const authSwitchText = document.querySelector("#auth-switch-text");
const authSwitchButton = document.querySelector("#auth-switch-button");

let authMode = "login";

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

const setAuthMode = (mode) => {
  authMode = mode;
  const isRegister = authMode === "register";
  authModal.classList.toggle("is-register", isRegister);
  authTitle.textContent = isRegister ? "สมัครสมาชิก" : "เข้าสู่ระบบ";
  authSubmit.textContent = isRegister ? "สร้างบัญชี" : "เข้าสู่ระบบ";
  authSwitchText.textContent = isRegister ? "มีบัญชีอยู่แล้ว?" : "ยังไม่มีบัญชี?";
  authSwitchButton.textContent = isRegister ? "เข้าสู่ระบบ" : "สมัครสมาชิก";
  authPassword.placeholder = isRegister ? "อย่างน้อย 6 ตัวอักษร" : "รหัสผ่าน";
  authPassword.autocomplete = isRegister ? "new-password" : "current-password";
  authError.hidden = true;
  authError.textContent = "";
};

const openAuthModal = (mode = "login") => {
  setAuthMode(mode);
  authForm.reset();
  authModal.hidden = false;
  document.body.classList.add("modal-open");
  closeMobileMenu();
  setTimeout(() => (mode === "register" ? authUsername : authEmail).focus(), 0);
};

const closeAuthModal = () => {
  authModal.hidden = true;
  document.body.classList.remove("modal-open");
};

const showError = (message) => {
  authError.textContent = message;
  authError.hidden = false;
};

const handleAuthSubmit = (event) => {
  event.preventDefault();
  const username = authUsername.value.trim();
  const email = authEmail.value.trim().toLowerCase();
  const password = authPassword.value;
  const members = getMembers();

  if (!email || !password || (authMode === "register" && !username)) return showError("กรุณากรอกข้อมูลให้ครบ");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showError("รูปแบบอีเมลไม่ถูกต้อง");
  if (password.length < 6) return showError("รหัสผ่านต้องมีอย่างน้อย 6 ตัว");

  if (authMode === "register") {
    if (members.some((member) => member.email === email)) return showError("อีเมลนี้ถูกใช้งานแล้ว");
    const newMember = { username, email, password, createdAt: new Date().toISOString() };
    setMembers([...members, newMember]);
    setCurrentUser({ username: newMember.username, email: newMember.email });
    closeAuthModal();
    updateUi();
    toast.fire({ icon: "success", title: "สมัครสมาชิกสำเร็จ" });
    return;
  }

  const member = members.find((item) => item.email === email && item.password === password);
  if (!member) return showError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
  setCurrentUser({ username: member.username, email: member.email });
  closeAuthModal();
  updateUi();
  toast.fire({ icon: "success", title: `ยินดีต้อนรับ ${member.username}` });
};

mobileToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  mobileToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".auth-register").forEach((button) => button.addEventListener("click", () => openAuthModal("register")));
document.querySelectorAll(".auth-login").forEach((button) => button.addEventListener("click", () => openAuthModal("login")));
document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeAuthModal));
authSwitchButton.addEventListener("click", () => setAuthMode(authMode === "login" ? "register" : "login"));
authForm.addEventListener("submit", handleAuthSubmit);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !authModal.hidden) closeAuthModal();
});

logoutButton.addEventListener("click", () => {
  localStorage.removeItem(SESSION_KEY);
  updateUi();
  toast.fire({ icon: "info", title: "ออกจากระบบแล้ว" });
});

updateUi();
