function applyBackground(bg) {
  const area = document.querySelector(".main-area.thicc-border-area");
  if (area) {
    const url = chrome.runtime.getURL("backgrounds/" + bg);
    console.log("Pokušavam učitati:", url);

    area.style.backgroundImage = `url(${url})`;
    area.style.backgroundSize = "cover";
    area.style.backgroundPosition = "center";
  }
}

// kad se promijeni storage
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "sync" && changes.chaoticBg?.newValue) {
    applyBackground(changes.chaoticBg.newValue);
  }
});

// posmatraj pojavu main-area
const observer = new MutationObserver(() => {
  chrome.storage.sync.get("chaoticBg", data => {
    if (data.chaoticBg) {
      applyBackground(data.chaoticBg);
    }
  });
});
observer.observe(document.body, { childList: true, subtree: true });

// odmah ako već postoji
chrome.storage.sync.get("chaoticBg", data => {
  if (data.chaoticBg) {
    applyBackground(data.chaoticBg);
  }
});


function applyBackground(bg, color) {
  const area = document.querySelector(".main-area.thicc-border-area");
  if (!area) return;

  if (color) {
    area.style.backgroundColor = color;
    area.style.backgroundImage = "none";
  } else if (bg) {
    const url = chrome.runtime.getURL("backgrounds/" + bg);
    area.style.backgroundImage = `url(${url})`;
    area.style.backgroundSize = "cover";
    area.style.backgroundPosition = "center";
    area.style.backgroundColor = "transparent"; // fallback
  }
}

// listener za promjenu storage-a
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "sync") return;

  const bg = changes.chaoticBg?.newValue || null;
  const color = changes.chaoticColor?.newValue || null;
  applyBackground(bg, color);
});

// odmah provjeri postojeću vrijednost
chrome.storage.sync.get(["chaoticBg", "chaoticColor"], data => {
  applyBackground(data.chaoticBg, data.chaoticColor);
});
