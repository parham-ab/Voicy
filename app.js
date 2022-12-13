// elements
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const copyBtn = document.querySelector("#copy");
const textArea = document.querySelector("#textArea");
const speak = document.querySelector("#speak");
const lang = document.querySelectorAll(".lang");
const title = document.querySelector(".title");
let data = [];
// speech-to-text
const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
// choose language
lang[0].addEventListener("input", function () {
  recognition.lang = "en-US";
  speak.style.display = "inline-block";
});
lang[1].addEventListener("input", function () {
  recognition.lang = "fa-IR";
  speak.style.display = "none";
});

recognition.interimResults = false;
recognition.maxAlternatives = 1;

startBtn.addEventListener("click", () => {
  recognition.start();
});
stopBtn.addEventListener("click", () => {
  recognition.stop();
});
recognition.onresult = (e) => {
  const results = e.results[0][0].transcript;
  data = [...data, results];
  textArea.value = data.join(" ");
};
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("contextmenu", (event) => event.preventDefault());
document.onkeydown = function (e) {
  if (e.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }
};
// text-to-speech
speak.addEventListener("click", function () {
  let speech = new SpeechSynthesisUtterance();
  speech.lang = "en-US";
  speech.text = textArea.value;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
});
// copy text
copyBtn.addEventListener("click", function () {
  if (textArea.value) {
    /* Select the text field */
    textArea.select();
    textArea.setSelectionRange(0, 99999); /* For mobile devices */
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(textArea.value);
    /* Alert the copied text */
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "info",
      title: "Text Copied ✔👌",
    });
  }
});
// clear text, save last input changes
function eraseText() {
  textArea.value = "";
  data = [];
}
textArea.addEventListener("input", function (e) {
  data = [e.target.value];
  if (e.target.value == "") {
    data = [];
  }
});
// info about the app
title.addEventListener("click", function () {
  let speech = new SpeechSynthesisUtterance();
  speech.lang = "en-US";
  speech.text =
    "welcome to voicy, this application is developed by paarhham abolghaasemi";
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
});
