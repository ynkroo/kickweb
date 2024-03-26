window.onload = function () {
  const main = document.querySelector("main");
  const firstDynamicElement = document.createElement("div");
  main.appendChild(firstDynamicElement);
  firstDynamicElement.innerText = "I'm the first dynamic element";
  firstDynamicElement.classList.add("dynamic-element", "first");

  // Create the second dynamic element
  const secondDynamicElement = document.createElement("div");
  secondDynamicElement.innerText = "I'm the second dynamic element";
  secondDynamicElement.classList.add("dynamic-element", "second");
  main.appendChild(secondDynamicElement);
  document.addEventListener("scroll", checkIfSecondElementIsVisible);
};

function elementIsVisibleInViewport(element) {
  // Get the bounding box of the element
  const { top, left, bottom, right } = element.getBoundingClientRect();
  // Get the viewport dimensions
  const { innerHeight, innerWidth } = window;
  // Check if top, left, bottom, right are all within the viewport
  return top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}

function checkIfSecondElementIsVisible() {
  // Get the second element
  const secondElement = document.querySelector(".second");
  // Check if the second element is visible
  if (elementIsVisibleInViewport(secondElement)) {
    console.log("Second element is fully visible");
    // Add class to transition the border radius
    secondElement.classList.add("border-radius-transition");
  } else {
    console.log("Second element is not fully visible anymore");
    secondElement.classList.remove("border-radius-transition");
  }
}
