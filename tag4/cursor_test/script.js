document.addEventListener("DOMContentLoaded", function() {
    const svg = document.getElementById("morph-svg");
    const morphCircle = document.getElementById("morph-circle");
  
    document.addEventListener("mousemove", function(event) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
  
      morphCircle.setAttribute("cx", mouseX);
      morphCircle.setAttribute("cy", mouseY);
    });
  });
  