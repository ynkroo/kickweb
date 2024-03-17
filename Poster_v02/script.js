document.addEventListener('DOMContentLoaded', function() {
    const circle = document.getElementById('circle');

    document.addEventListener('mousemove', function(e) {
        const x = e.clientX;
        const y = e.clientY;

        const circleSize = parseInt(window.getComputedStyle(circle).getPropertyValue('width')); // Get circle size

        // Calculate the position to center the circle with the mouse pointer
        const circleX = x - circleSize / 2 + window.pageXOffset;
        const circleY = y - circleSize / 2 + window.pageYOffset;

        circle.style.display = 'block';
        circle.style.left = circleX + 'px';
        circle.style.top = circleY + 'px';
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const mainContainer = document.querySelector('#main-container');
    const animationDuration = 20; // in milliseconds
    let isAnimating = false;

    function animateColumnsAndRows(event) {
      if (!isAnimating) {
        isAnimating = true;

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Calculate new column widths
        const newColumns = [
          (mouseX / window.innerWidth) * 6 + 1,
          3,
          2,
          (mouseY / window.innerHeight) * 6 + 1
        ].map(val => `${val}fr`).join(' ');

        // Calculate new row height, limiting it to a range of 5vh to 100vh
        let newRowHeight = (mouseY / window.innerHeight) * 95 + 5;
        newRowHeight = Math.max(5, Math.min(100, newRowHeight));
        newRowHeight = `${newRowHeight}vh`;

        // Update grid columns and row heights
        mainContainer.style.gridTemplateColumns = newColumns;
        mainContainer.style.gridAutoRows = newRowHeight;

        setTimeout(() => {
          isAnimating = false;
        }, animationDuration);
      }
    }

    document.addEventListener('mousemove', animateColumnsAndRows);
  });