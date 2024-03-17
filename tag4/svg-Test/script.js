document.addEventListener('mousemove', function(e) {
    var leftDiv = document.querySelector('.left');
    var rightDiv = document.querySelector('.right');
  
    // Get the bounding rectangle of the left and right divs
    var leftRect = leftDiv.getBoundingClientRect();
    var rightRect = rightDiv.getBoundingClientRect();
  
    // Check if the cursor is inside the left div
    if (
      e.clientX >= leftRect.left && 
      e.clientX <= leftRect.right && 
      e.clientY >= leftRect.top && 
      e.clientY <= leftRect.bottom
    ) {
      var leftSvg = document.getElementById('left-svg');
      // Update SVG shape in left div based on cursor movement
      var width = leftRect.width;
      var height = leftRect.height;
      var x = e.clientX - leftRect.left;
      var y = e.clientY - leftRect.top;
      leftSvg.setAttribute('width', width);
      leftSvg.setAttribute('height', height);
      leftSvg.innerHTML = '<circle cx="' + x + '" cy="' + y + '" r="20" fill="blue"/>';
    }
  
    // Check if the cursor is inside the right div
    if (
      e.clientX >= rightRect.left && 
      e.clientX <= rightRect.right && 
      e.clientY >= rightRect.top && 
      e.clientY <= rightRect.bottom
    ) {
      var rightSvg = document.getElementById('right-svg');
      // Update SVG shape in right div based on cursor movement
      var width = rightRect.width;
      var height = rightRect.height;
      var x = e.clientX - rightRect.left - 20; // Adjust for positioning
      var y = e.clientY - rightRect.top - 20; // Adjust for positioning
      rightSvg.setAttribute('width', width);
      rightSvg.setAttribute('height', height);
      rightSvg.innerHTML = '<rect x="' + x + '" y="' + y + '" width="40" height="40" fill="red"/>';
    }
  });
  