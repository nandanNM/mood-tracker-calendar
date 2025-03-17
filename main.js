const emojiButtons = document.querySelectorAll(".mood-button");
const moodEntries = document.querySelector(".mood-entries");
const filterBtns = document.querySelectorAll(".filter-btn");
let moodHistory = [];
console.log(filterBtns);
function initializeApp() {
  moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
  displayMoodEntries("day");

  filterBtns.forEach((btn) => {
    if (btn.dataset.filter === "day") {
      btn.classList.add("active");
    }
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      displayMoodEntries(btn.dataset.filter || "day");
    });
  });
}

emojiButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleEmojiButtonClick(button);
  });
});
const handleEmojiButtonClick = (button) => {
  const emoji = button.innerHTML.split("<")[0];
  const mood = button.querySelector("span").textContent;

  addMoodEntry(emoji, mood);
};

function addMoodEntry(emoji, mood) {
  const entry = {
    id: Date.now(),
    emoji,
    mood,
    timestamp: new Date(),
  };
  moodHistory.unshift(entry);
  localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
  displayMoodEntries("day");
}
function displayMoodEntries(filter) {
  console.log(moodHistory);
  const now = new Date();
  let filteredEntries = moodHistory.filter((entry) => {
    const entryDate = new Date(entry.timestamp);
    switch (filter) {
      case "day":
        return entryDate.toDateString() === now.toDateString();

      case "month":
        return (
          entryDate.getMonth() === now.getMonth() &&
          entryDate.getFullYear() === now.getFullYear()
        );

      case "year":
        return entryDate.getFullYear() === now.getFullYear();

      default:
        return true;
    }
  });
  moodEntries.innerHTML = filteredEntries
    .map(
      (entry) =>
        `<div class="mood-entry-card">
            <span class="emoji">${entry.emoji}</span>
            <span class="mood">${entry.mood}</span>
            <span class="date">${new Date(
              entry.timestamp
            ).toLocaleDateString()}</span>
        </div>`
    )

    .join(""); // join to fix raw html and render
}
// filter buttons
// console.log(document.querySelectorAll(".filter-container .filter-btn"));
document.querySelectorAll(".filter-container .filter-btn").forEach((button) => {
  button.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});
