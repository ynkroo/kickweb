document.addEventListener("DOMContentLoaded", function () {
  const circle = document.getElementById("circle");
  const heroSection = document.querySelector(".hero");
  const mainContainer = document.querySelector("#main-container");
  let isAnimating = false;
  const animationDuration = 20; // Dauer für die Kreis- und Gitteranimationen

  // Einheitlicher Event-Handler (Maus- und Touch-Ereignisse)
  function handleMoveEvent(e) {
    let x, y;
    if (e.type === "touchmove") {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }

    const isMouseOverHero = e.target.closest(".hero");

    if (!isAnimating) {
      isAnimating = true;
      setTimeout(() => {
        isAnimating = false;
      }, animationDuration);

      if (isMouseOverHero) {
        Object.assign(circle.style, {
          width: "1200px",
          height: "1200px",
          border: "none",
          background:
            "radial-gradient(ellipse at center, #220d38, #ce5c16, #c2bbb3, #c2bbb3)",
          mixBlendMode: "darken",
        });
      } else {
        Object.assign(circle.style, {
          width: "40px",
          height: "40px",
          border: "2px solid #c2bbb3",
          background: "rgba(0, 0, 0, 0)",
          mixBlendMode: "normal",
        });
      }

      Object.assign(circle.style, {
        display: "block",
        position: "fixed",
        left: `${x - circle.offsetWidth / 2}px`,
        top: `${y - circle.offsetHeight / 2}px`,
      });
      document.body.style.cursor = "none";

      if (heroSection.contains(e.target)) {
        animateColumnsAndRows(x, y); // Angepasst, um x und y direkt zu übergeben
      }
    }
  }

  // Angepasste Funktion (direkten Übernahme von Koordinaten)
  function animateColumnsAndRows(mouseX, mouseY) {
    const rect = heroSection.getBoundingClientRect();
    if (
      mouseX >= rect.left &&
      mouseX <= rect.right &&
      mouseY >= rect.top &&
      mouseY <= rect.bottom
    ) {
      let newColumns, newRowHeight;
      if (window.innerWidth <= 768) {
        newColumns = "1fr 1fr";
        newRowHeight = "50vh";
      } else {
        newColumns = [
          (mouseX / window.innerWidth) * 7 + 1,
          3,
          2,
          (mouseY / window.innerHeight) * 7 + 1,
        ]
          .map((val) => `${val}fr`)
          .join(" ");
        newRowHeight = (mouseY / window.innerHeight) * 95 + 5;
        newRowHeight = `${Math.max(5, Math.min(100, newRowHeight))}vh`;
      }

      mainContainer.style.gridTemplateColumns = newColumns;
      mainContainer.style.gridAutoRows = newRowHeight;
    }
  }

  document.addEventListener("mousemove", handleMoveEvent);
  document.addEventListener("touchmove", handleMoveEvent, { passive: true });
});
