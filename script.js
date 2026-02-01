const noBtn = document.getElementById("noBtn");
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

noBtn.addEventListener("mouseenter", flee);
noBtn.addEventListener("mousemove", flee);

function flee() {
  const x = (Math.random() - 0.5) * 300;
  const y = (Math.random() - 0.5) * 200;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}
const yesBtn = document.querySelector(".yes");
const heartCursor = document.getElementById("heartCursor");

yesBtn.addEventListener("mouseenter", () => {
  heartCursor.style.display = "block";
});

yesBtn.addEventListener("mouseleave", () => {
  heartCursor.style.display = "none";
});

document.addEventListener("mousemove", (e) => {
  heartCursor.style.left = e.clientX + "px";
  heartCursor.style.top = e.clientY + "px";
});

document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const hint = document.getElementById("hint"); // existing <p>

  yesBtn.addEventListener("click", () => {
    // Hide the question <p>
    hint.style.display = "none";

    // Hide No button
    noBtn.style.display = "none";

    // Show a Yes answer below buttons
    let answer = document.querySelector(".yes-answer");
    if (!answer) {
      answer = document.createElement("p");
      answer.classList.add("yes-answer");
      answer.style.fontSize = "20px";
      answer.style.marginTop = "20px";

      const buttonsDiv = document.querySelector(".buttons");
      buttonsDiv.after(answer);
    }

    answer.textContent = "Wiiih!! 💕 Sorry, but thank you for saying Yes 😌";

    // Optional: launch confetti
    confetti({
      particleCount: 500,
      spread: 150,
      origin: { y: 0.6 }
    });
  });
});


if (isTouchDevice) {

  // NO button: jump when tapped
  noBtn.addEventListener("touchstart", moveButton);

    yesBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  yesAnswer();
  sendAnswer("Yes");
});


  // YES button: animated heart follows finger and show Yes answer
  yesBtn.addEventListener("touchstart", (e) => {
    e.preventDefault(); // prevent double click/touch
    heartCursor.style.display = "block";

    const touch = e.touches[0];
    heartCursor.style.left = touch.clientX + "px";
    heartCursor.style.top = touch.clientY + "px";

    // ✅ Call Yes answer function for mobile
    yesAnswer();
  });

  yesBtn.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    heartCursor.style.left = touch.clientX + "px";
    heartCursor.style.top = touch.clientY + "px";
  });

  yesBtn.addEventListener("touchend", () => {
    heartCursor.style.display = "none";
  });


}


const FORMSPREE_URL = "https://formspree.io/f/xeezogdo"; // replace

function sendAnswer(answer) {
  fetch(FORMSPREE_URL, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      choice: answer
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Formspree success:", data);
  })
  .catch(err => {
    console.error("Formspree error:", err);
  });
}
