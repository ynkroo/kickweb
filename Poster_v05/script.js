document.addEventListener("DOMContentLoaded", function () {
  const circle = document.getElementById("circle");
  const heroSection = document.querySelector(".hero");
  const mainContainer = document.querySelector("#main-container");
  const animationDuration = 25; // Dauer der Animation in Millisekunden
  let isAnimating = false; // Flag, um Überlappung von Animationen zu verhindern

  document.addEventListener("mousemove", function (e) {
    handleCircleAnimation(e);
    if (!isAnimating) {
      handleGridAnimation(e);
    }
  });

  function handleCircleAnimation(e) {
    const x = e.clientX;
    const y = e.clientY;
    const isMouseOverHero = e.target.closest(".hero");

    if (isMouseOverHero) {
      // Anwenden des Stils Farbverlauf Kreis
      Object.assign(circle.style, {
        width: "1200px",
        height: "1200px",
        border: "none",
        background:
          "radial-gradient(ellipse at center, #220d38, #ce5c16, #c2bbb3, #c2bbb3)",
        mixBlendMode: "darken",
      });
    } else {
      // Anwenden des Stils Kreis mit Kontur
      Object.assign(circle.style, {
        width: "40px",
        height: "40px",
        border: "2px solid #c2bbb3",
        background: "rgba(0, 0, 0, 0)",
        mixBlendMode: "normal",
      });
    }

    // Common styles
    Object.assign(circle.style, {
      display: "block",
      position: "fixed",
      left: `${x - circle.offsetWidth / 2}px`,
      top: `${y - circle.offsetHeight / 2}px`,
    });
    document.body.style.cursor = "none";
  }

  function handleGridAnimation(e) {
    isAnimating = true;
    const mouseX = e.clientX;
    const rect = heroSection.getBoundingClientRect();

    if (mouseX >= rect.left && mouseX <= rect.right) {
      let newColumns;

      if (window.innerWidth <= 768) {
        newColumns = "1fr 1fr";
      } else {
        const widths = [
          (mouseX / window.innerWidth) * 10 + 1,
          (mouseX / window.innerWidth) * 3 + 1,
          3 - (mouseX / window.innerWidth) * 3 + 1,
          4 - (mouseX / window.innerWidth) * 4 + 1,
        ];
        newColumns = widths.map((val) => `${val}fr`).join(" ");
        mainContainer.style.gridAutoRows = "100vh";
      }

      mainContainer.style.gridTemplateColumns = newColumns;
    }

    setTimeout(() => {
      isAnimating = false;
    }, animationDuration);
  }
});
