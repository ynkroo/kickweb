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

    // Anwenden des Stils Kreis mit Kontur, unabhängig davon, ob sich der Mauszeiger über dem Hero-Bereich befindet oder nicht
    Object.assign(circle.style, {
      width: "80px",
      height: "80px",
      border: "3px solid #fff",
      background: "none",
      mixBlendMode: "difference",
    });

    if (isMouseOverHero) {
      // Wenn sich der Mauszeiger im Hero-Bereich befindet, den Cursor ausblenden
      document.body.style.cursor = "none";
    } else {
      // Wenn sich der Mauszeiger nicht im Hero-Bereich befindet, den Cursor anzeigen
      document.body.style.cursor = "none";
    }

    // Common styles
    Object.assign(circle.style, {
      display: "block",
      position: "fixed",
      left: `${x - circle.offsetWidth / 2}px`,
      top: `${y - circle.offsetHeight / 2}px`,
    });
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
