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
