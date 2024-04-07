window.addEventListener("load", function () {
  var canvas = document.getElementById("world");

  // Window size
  var viewportWidth = window.innerWidth;
  var viewportHeight = window.innerHeight * 1.5;
  var engine = Matter.Engine.create({
    enableSleeping: true, // This enables the sleeping feature
  });

  // Setup Matter JS
  var engine = Matter.Engine.create();
  var world = engine.world;
  var render = Matter.Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      width: viewportWidth,
      height: viewportHeight,
      background: "transparent",
      wireframes: false,
      showAngleIndicator: false,
    },
  });

  // Function to add a ball at a specific location
  function addBall(x, y) {
    var newBall = Matter.Bodies.circle(x, y, 100, {
      density: 0.1,
      friction: 0.15,
      frictionAir: 0.005,
      restitution: 0.3,
      render: {
        fillStyle: "transparent",
        strokeStyle: "#ce5c16",
        lineWidth: 5,
      },
    });
    Matter.World.add(world, newBall);
  }

  // Function to add a square at a specific location
  function addSquare(x, y) {
    var square = Matter.Bodies.rectangle(x, y, 100, 100, {
      density: 0.1,
      friction: 0.15,
      frictionAir: 0.005,
      restitution: 0.3,
      render: {
        fillStyle: "transparent",
        strokeStyle: "#1688ce",
        lineWidth: 5,
      },
    });
    Matter.World.add(world, square);
  }

  // Function to add a triangle at a specific location
  function addTriangle(x, y) {
    var newTriangle = Matter.Bodies.polygon(x, y, 3, 120, {
      density: 0.1,
      friction: 0.15,
      frictionAir: 0.005,
      restitution: 0.3,
      render: {
        fillStyle: "transparent",
        strokeStyle: "#16ce5c",
        lineWidth: 5,
      },
    });
    Matter.World.add(world, newTriangle);
  }

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

  // Adjustments for a wider V that touches the side walls
  const angle = 87 * (Math.PI / 180); // Adjusting back for clarity, but you can modify this as needed
  const lineLength = Math.sqrt(
    Math.pow(viewportHeight, 2) + Math.pow(viewportWidth / 2, 2)
  ); // Length to ensure touching the walls

  // Calculate positions based on the viewport dimensions and desired angle
  const middleY = viewportHeight / 2 + (Math.sin(angle) * lineLength) / 3; // Adjust based on your requirements

  // Left side of the V
  var leftSide = Matter.Bodies.rectangle(
    0, // Start from the left edge
    middleY - (Math.sin(angle) * lineLength) / 7,
    5,
    lineLength,
    {
      isStatic: true,
      angle: -angle, // Angle adjusted to match the new calculation
      render: {
        fillStyle: "#c2bbb3",
        visible: true,
      },
    }
  );

  // Right side of the V
  var rightSide = Matter.Bodies.rectangle(
    viewportWidth, // Start from the right edge
    middleY - (Math.sin(angle) * lineLength) / 2,
    5,
    lineLength,
    {
      isStatic: true,
      angle: angle, // Angle adjusted to match the new calculation
      render: {
        fillStyle: "#c2bbb3",
        visible: true,
      },
    }
  );

  Matter.World.add(world, [leftSide, rightSide]);

  // Create and add walls
  var rightWall = Matter.Bodies.rectangle(
    viewportWidth,
    viewportHeight / 2,
    10,
    viewportHeight,
    {
      isStatic: true,
      render: {
        fillStyle: "transparent",
        visible: true,
      },
    }
  );
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
  Matter.World.add(world, floor);

  var leftWall = Matter.Bodies.rectangle(
    0,
    viewportHeight / 2,
    10,
    viewportHeight,
    {
      isStatic: true,
      render: {
        fillStyle: "transparent",
        visible: true,
      },
    }
  );

  Matter.World.add(world, [rightWall, leftWall]);

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

  function isCanvasFullyVisible() {
    var rect = canvas.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  }

  function startFallingIfVisible() {
    if (isCanvasFullyVisible()) {
      Matter.Events.trigger(engine, "gravityFalling", { x: 0, y: 1 });
      window.removeEventListener("scroll", startFallingIfVisible);
    }
  }

  window.addEventListener("scroll", startFallingIfVisible);
  startFallingIfVisible();

  // Initialize a counter to cycle through shapes
  let nextShape = 0; // 0 for ball, 1 for square, 2 for triangle

  // Automatically add shapes at a regular interval
  setInterval(function () {
    var x = Math.random() * viewportWidth;
    var y = 20; // Starting Y position for shapes

    switch (nextShape) {
      case 0:
        addBall(x, y);
        break;
      case 1:
        addSquare(x, y);
        break;
      case 2:
        addTriangle(x, y); // Assuming you've added the addTriangle function as previously described
        break;
      default:
        break;
    }

    // Update nextShape to cycle through the three shapes
    nextShape = (nextShape + 1) % 3; // This will cycle nextShape through 0, 1, 2
  }, 1500); // Interval set to 1000 milliseconds (1 second)

  // Start the engine and renderer
  Matter.Engine.run(engine);
  Matter.Render.run(render);
});
