document.getElementById("applyBtn").addEventListener("click", () => {
  const number = document.getElementById("bgNumber").value;
  if (!number) return;
  const fileName = `${number}.jpg`; // ili .png ako koristiš slike
  chrome.storage.sync.set({ chaoticBg: fileName, chaoticColor: null });
});

// Dugmad za boju
document.querySelectorAll(".colorBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const color = btn.dataset.color;
    chrome.storage.sync.set({ chaoticColor: color, chaoticBg: null });
  });
});
