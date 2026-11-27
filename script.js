const qrDialog = document.querySelector("#contact-qr-dialog");
const qrTitle = document.querySelector("#contact-qr-title");
const qrImage = document.querySelector("#contact-qr-image");

if (typeof qrDialog.showModal === "function") {
  for (const link of document.querySelectorAll("a[data-qr]")) {
    link.setAttribute("aria-haspopup", "dialog");
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const service = link.dataset.qr;
      qrTitle.textContent = service + " QR code";
      qrImage.alt = "Scan this QR code with " + service;
      qrImage.src = link.href;
      qrDialog.showModal();
    });
  }

  qrDialog.addEventListener("click", (event) => {
    if (event.target === qrDialog) qrDialog.close();
  });
}

const intro = document.querySelector(".intro");
const hoverMotion = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");

function resetIntroMotion() {
  intro.removeAttribute("data-tracking");
  intro.style.removeProperty("--drift-x");
  intro.style.removeProperty("--drift-y");
}

intro.addEventListener("pointermove", (event) => {
  if (!hoverMotion.matches || event.pointerType === "touch") return;

  const bounds = intro.getBoundingClientRect();
  const horizontal = (event.clientX - bounds.left) / bounds.width;
  const vertical = (event.clientY - bounds.top) / bounds.height;

  intro.style.setProperty("--cursor-x", `${horizontal * 100}%`);
  intro.style.setProperty("--cursor-y", `${vertical * 100}%`);
  intro.style.setProperty("--drift-x", `${(horizontal - .5) * 46}px`);
  intro.style.setProperty("--drift-y", `${(vertical - .5) * 34}px`);
  intro.setAttribute("data-tracking", "");
});

intro.addEventListener("pointerleave", resetIntroMotion);
hoverMotion.addEventListener("change", resetIntroMotion);
