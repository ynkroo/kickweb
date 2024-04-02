document.addEventListener("DOMContentLoaded", function () {
  const circle = document.getElementById("circle");

  document.addEventListener("mousemove", function (e) {
    const x = e.clientX;
    const y = e.clientY;

    const circleSize = parseInt(
      window.getComputedStyle(circle).getPropertyValue("width")
    ); // Get circle size

    // Calculate the position to center the circle with the mouse pointer
    const circleX = x - circleSize / 2 + window.pageXOffset;
    const circleY = y - circleSize / 2 + window.pageYOffset;

    circle.style.display = "block";
    circle.style.left = circleX + "px";
    circle.style.top = circleY + "px";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.querySelector("#main-container");
  const animationDuration = 20; // Duration of the animation in milliseconds
  let isAnimating = false; // Flag to prevent animation overlap

  // Function to animate the columns and rows
  function animateColumnsAndRows(event) {
    // Only animate if no current animation is in progress
    if (!isAnimating) {
      isAnimating = true;
      const mouseX = event.clientX; // Get mouse X-coordinate

      // Select the .hero container and get its dimensions
      const heroContainer = document.querySelector(".hero");
      const rect = heroContainer.getBoundingClientRect();

      // Check if the mouse event occurred within the .hero container
      if (mouseX >= rect.left && mouseX <= rect.right) {
        let newColumns; // Variable to store the new column sizes

        // Adjust the grid based on screen width
        if (window.innerWidth <= 768) {
          // For phone and tablet screens, use a simple 2-column layout
          newColumns = "1fr 1fr";
        } else {
          // For larger screens, dynamically adjust the column sizes based on mouse position
          newColumns = [
            (mouseX / window.innerWidth) * 10 + 1,
            (mouseX / window.innerWidth) * 3 + 1,
            3 - (mouseX / window.innerWidth) * 3 + 1,
            4 - (mouseX / window.innerWidth) * 4 + 1, // Ensure total fractions remain consistent
          ]
            .map((val) => `${val}fr`)
            .join(" ");

          // Set row height to 100vh for larger screens
          mainContainer.style.gridAutoRows = "100vh";
        }

        // Update the grid template columns with the new sizes
        mainContainer.style.gridTemplateColumns = newColumns;
      }

      // Reset the animation flag after the specified duration
      setTimeout(() => {
        isAnimating = false;
      }, animationDuration);
    }
  }

  // Attach the animation function to the mousemove event on the .hero container
  document
    .querySelector(".hero")
    .addEventListener("mousemove", animateColumnsAndRows);
});
