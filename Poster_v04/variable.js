document.addEventListener("mousemove", function (e) {
  requestAnimationFrame(function () {
    updateFontAxes(e.clientX, e.clientY);
  });
});

function updateFontAxes(xPosition, yPosition) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const fontWeight = mapValue(xPosition, 0, screenWidth, 100, 1000);

  // Map mouse Y position to the -10 to 0 slant range
  const fontSlant = mapValue(yPosition, 0, screenHeight, -10, 0);
  // Similarly, map mouse Y position for grade (-200 to 150 as an example range)
  const fontGrade = mapValue(yPosition, 0, screenHeight, -200, 150);

  const fontVariationSettings = `'wght' ${fontWeight}, 'slnt' ${fontSlant}, 'GRAD' ${fontGrade}`;

  const textElement = document.querySelector(".text");
  textElement.style.fontVariationSettings = fontVariationSettings;
}

function mapValue(value, x1, y1, x2, y2) {
  return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
}
