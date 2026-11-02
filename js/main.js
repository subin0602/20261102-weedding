// 사진을 클릭하면 원본 비율을 유지하며 크게 보여줍니다.
const lightbox = document.querySelector("#lightbox");
if (lightbox) {
  const lightboxImage = lightbox.querySelector("img");

  document.querySelectorAll(".clickable-photo").forEach((photo) => {
    photo.addEventListener("click", () => {
      lightboxImage.src = photo.src;
      lightboxImage.alt = photo.alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  // 닫기 버튼, 어두운 배경, ESC 키로 팝업을 닫습니다.
  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    document.body.style.overflow = "";
  };

  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

// 복사 완료 메시지를 보여줄 팝업 요소를 준비합니다.
const toast = document.querySelector("#toast");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

// 계좌번호 복사 버튼
document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const accountNumber = button.dataset.copy;

    try {
      await navigator.clipboard.writeText(accountNumber);
      showToast("계좌번호가 복사되었습니다.");
    } catch (error) {
      // 브라우저 보안 정책으로 복사가 제한되면 직접 복사할 수 있도록 표시합니다.
      window.prompt("아래 계좌번호를 복사해 주세요.", accountNumber);
      showToast("계좌번호를 확인해 주세요.");
    }
  });
});

// 모바일 화면에서 내비게이션 메뉴를 열고 닫습니다.
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(opened));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}
