window.addEventListener("load", function () {
  // Fetch our canvas
  var canvas = document.getElementById("world");

  // Initial window dimensions
  var viewportWidth = window.innerWidth;
  var viewportHeight = window.innerHeight;

  // Setup Matter JS
  var engine = Matter.Engine.create();
  var world = engine.world;
  var render = Matter.Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      width: viewportWidth,
      height: viewportHeight, // Updated to use viewportHeight directly
      background: "transparent",
      wireframes: false,
      showAngleIndicator: false,
    },
  });

  // Function to add a ball at a specific location
  function addBall(x, y) {
    var newBall = Matter.Bodies.circle(x, y, 100, {
      density: 0.04,
      friction: 0.1,
      frictionAir: 0.005,
      restitution: 0.5,
      render: {
        fillStyle: "transparent",
        strokeStyle: "#c2bbb3",
        lineWidth: 5,
      },
    });
    Matter.World.add(world, newBall);
  }

  // Function to add a square at a specific location
  function addSquare(x, y) {
    var square = Matter.Bodies.rectangle(x, y, 100, 100, {
      density: 0.04,
      friction: 0.01,
      frictionAir: 0.005,
      restitution: 0.5,
      render: {
        fillStyle: "transparent",
        strokeStyle: "#c2bbb3",
        lineWidth: 5,
      },
    });
    Matter.World.add(world, square);
  }

  // Add event listener for mouse clicks to alternate shapes
  var isNextShapeBall = true;
  document.addEventListener("mousedown", function (event) {
    var x = event.clientX;
    var y = event.clientY;

    if (isNextShapeBall) {
      addBall(x, y);
    } else {
      addSquare(x, y);
    }

    isNextShapeBall = !isNextShapeBall;
  });

  // Create the floor
  var floor = Matter.Bodies.rectangle(
    viewportWidth / 2,
    viewportHeight,
    viewportWidth,
    10,
    {
      isStatic: true,
      render: {
        fillStyle: "#c2bbb3",
        visible: true,
      },
    }
  );

  // Add the floor to the world
  Matter.World.add(world, floor);

  // Make interactive
  var mouseConstraint = Matter.MouseConstraint.create(engine, {
    element: canvas,
    constraint: {
      render: {
        visible: false,
      },
      stiffness: 0.8,
    },
  });

  // Create and add walls
  var rightWall = Matter.Bodies.rectangle(
    viewportWidth,
    viewportHeight / 2,
    10,
    viewportHeight,
    {
      isStatic: true,
      render: {
        fillStyle: "#c2bbb3",
        visible: true,
      },
    }
  );

  var leftWall = Matter.Bodies.rectangle(
    0,
    viewportHeight / 2,
    10,
    viewportHeight,
    {
      isStatic: true,
      render: {
        fillStyle: "#c2bbb3",
        visible: true,
      },
    }
  );

  Matter.World.add(world, [rightWall, leftWall]);

  // Add mouse constraint to the world
  Matter.World.add(world, mouseConstraint);

  // Remove scroll events from the mouse constraint
  mouseConstraint.mouse.element.removeEventListener(
    "mousewheel",
    mouseConstraint.mouse.mousewheel
  );
  mouseConstraint.mouse.element.removeEventListener(
    "DOMMouseScroll",
    mouseConstraint.mouse.mousewheel
  );

  // Function to check if canvas is fully visible
  function isCanvasFullyVisible() {
    var rect = canvas.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  }

  // Improved function to start the falling process if visible
  function startFallingIfVisible() {
    if (isCanvasFullyVisible()) {
      Matter.Events.trigger(engine, "gravityFalling", { x: 0, y: 1 });
      window.removeEventListener("scroll", startFallingIfVisible);
    }
  }

  // Use the improved function as the scroll event listener
  window.addEventListener("scroll", startFallingIfVisible);

  // Also check and possibly trigger falling when the page initially loads
  startFallingIfVisible();

  // Start the engine and renderer
  Matter.Engine.run(engine);
  Matter.Render.run(render);
});
