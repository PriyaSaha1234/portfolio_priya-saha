
window.addEventListener("load", () => {

    document.querySelectorAll(".stack-track").forEach((track, index) => {

        const items = Array.from(track.children);

        // duplicate once
        items.forEach(item => {
            track.appendChild(item.cloneNode(true));
        });

        let position = 0;
        const speed = [0.5, 0.7, 0.4][index]; // per column speed

        const halfHeight = track.scrollHeight / 2;

        function animate() {
            position -= speed;

            if (Math.abs(position) >= halfHeight) {
                position = 0; // reset smoothly (no jump due to duplication)
            }

            track.style.transform = `translateY(${position}px)`;

            requestAnimationFrame(animate);
        }

        animate();
    });

});
import gsap from "gsap";

const section = document.querySelector(".contact-section");
const overlay = document.querySelector(".contact-overlay");

section.addEventListener("mousemove", (e)=>{

    const rect = section.getBoundingClientRect();

    const x = ((e.clientX - rect.left)/rect.width)*100;
    const y = ((e.clientY - rect.top)/rect.height)*100;

    gsap.to(overlay,{
        '--x':`${x}%`,
        '--y':`${y}%`,
        duration:.3,
        ease:'sine.out'
    });

});
const loadingAnimationTime = 2000;

const showMainAnimation = (parent) => {

  const boxContainer = document.createElement("div");
  boxContainer.style.overflow = "hidden";

  const box = document.createElement("div");
  box.classList.add("box");

  parent.appendChild(boxContainer);
  boxContainer.appendChild(box);

  const quote = [
    ["FROM", "CONCEPT"],
    ["TO", "DEPLOYMENT"]
  ];

  let delay = 0;

  // Create lines
  quote.forEach(line => {

    const lineDiv = document.createElement("div");
    lineDiv.classList.add("flex");

    line.forEach(word => {

      const text = document.createElement("span");

      text.textContent = word;
      text.classList.add("animate-slideup");

      delay += 60;
      text.style.animationDelay = delay + "ms";

      lineDiv.appendChild(text);
    });

    box.appendChild(lineDiv);
  });

  const lastAnimationTime = 1000 + delay;

  // Orange square
  const secondLine = box.lastElementChild;

    const fs = document.createElement("div");
    fs.classList.add("fs");

    fs.style.animationDelay = (lastAnimationTime - 100) + "ms";

    secondLine.appendChild(fs);
};

const revealCurtain = (parent) => {

  const curtain = document.createElement("div");
  curtain.classList.add("flex", "curtain");

  parent.appendChild(curtain);

  const progressBar = document.createElement("div");
  progressBar.classList.add("progressBar");

  curtain.appendChild(progressBar);

  progressBar.classList.add("progressGrow-animation");

  return curtain;
};

const init = () => {

  const container = document.getElementById("main");

  const curtain = revealCurtain(container);
setTimeout(() => {

  // create text first
  showMainAnimation(container);

  // force browser paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      curtain.remove();
    });
  });

}, loadingAnimationTime);
  
};

init();