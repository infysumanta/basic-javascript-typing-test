import "./style.css";
import paragraphs from "./paragraph";
const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".wrapper .input-field");
const mistakeTag = document.querySelector(".mistake span");
const timeTag = document.querySelector(".time span b");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const tryAgainBtn = document.querySelector("button");
let charIndex = 0;
let mistakes = 0;
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let isTyping = false;

function randomParagraph() {
  let randomIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerText = "";
  paragraphs[randomIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inputField.focus());
  typingText.addEventListener("click", () => inputField.focus());
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inputField.value.split("")[charIndex];

  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
      /* A comment. */
    }

    if (typedChar == null) {
      charIndex--;
      if (characters[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      characters[charIndex].classList.remove("correct", "incorrect");
    } else {
      if (characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }

    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );

    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
    wpmTag.innerText = wpm;
  } else {
    inputField.value = "";
    clearInterval(timer);
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  randomParagraph();
  inputField.value = "";
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = 0;
  mistakes = 0;
  isTyping = false;
  timeTag.innerText = timeLeft;
  mistakeTag.innerText = mistakes;
  cpmTag.innerText = 0;
  wpmTag.innerText = 0;
}

randomParagraph();
inputField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
