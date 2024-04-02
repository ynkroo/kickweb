// Module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

// Create an engine
var engine = Engine.create();

// Initial window dimensions
var viewportWidth = window.innerWidth;
var viewportHeight = window.innerHeight;

// Calculate 90% of the viewport height
var adjustedHeight = viewportHeight * 0.9; // 90vh

// Create a renderer
var render = Render.create({
  element: document.getElementById("physics"),
  engine: engine,
  options: {
    width: viewportWidth,
    height: adjustedHeight, // Use the adjusted height here
    wireframes: false,
    background: "transparent",
  },
});

// Create ground
var groundThickness = 25; // Arbitrary thickness for visibility
var ground = Bodies.rectangle(
  viewportWidth / 2,
  adjustedHeight - groundThickness / 2, // Position it at the bottom of the 90vh area
  viewportWidth,
  groundThickness, // Use a visible thickness
  { isStatic: true }
);
World.add(engine.world, [ground]);

// Add mouse control
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

World.add(engine.world, mouseConstraint);

// Ensure the renderer stays updated with mouse events
render.mouse = mouse;

// Click event to add new shapes
render.canvas.addEventListener("mousedown", function (event) {
  var x = event.clientX;
  var y = event.clientY;
  // Randomly add a circle or a rectangle
  if (Math.random() > 0.5) {
    var circle = Bodies.circle(x, y, 80);
    World.add(engine.world, circle);
  } else {
    var box = Bodies.rectangle(x, y, 80, 80);
    World.add(engine.world, box);
  }
});

// Resize event to adjust canvas size
window.addEventListener("resize", function () {
  render.canvas.width = window.innerWidth;
  render.canvas.height = window.innerHeight;
  render.options.width = window.innerWidth;
  render.options.height = window.innerHeight;

  // Re-position the ground to adapt to new dimensions
  Matter.Body.setPosition(ground, {
    x: window.innerWidth / 2,
    y: window.innerHeight + 20,
  });
});

// Run the engine
Engine.run(engine);

// Run the renderer
Render.run(render);

mouseConstraint.mouse.element.removeEventListener(
  "mousewheel",
  mouseConstraint.mouse.mousewheel
);
mouseConstraint.mouse.element.removeEventListener(
  "DOMMouseScroll",
  mouseConstraint.mouse.mousewheel
);
