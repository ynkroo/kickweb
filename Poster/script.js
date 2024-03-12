document.addEventListener('DOMContentLoaded', function() {
    const circle = document.getElementById('circle');

    document.addEventListener('mousemove', function(e) {
        const x = e.clientX;
        const y = e.clientY;

        const circleSize = parseInt(window.getComputedStyle(circle).getPropertyValue('width')); // Get circle size

        // Calculate the position to center the circle with the mouse pointer
        const circleX = x - circleSize / 2;
        const circleY = y - circleSize / 2;

        circle.style.display = 'block';
        circle.style.left = circleX + 'px';
        circle.style.top = circleY + 'px';
    });
});