window.addEventListener("load", function () {
  //Fetch our canvas
  var canvas = document.getElementById("world");

  // Initial window dimensions
  var viewportWidth = window.innerWidth;
  var viewportHeight = window.innerHeight;

  // Calculate the viewport height
  var adjustedHeight = viewportHeight * 1; // 90vh

  //Setup Matter JS
  var engine = Matter.Engine.create();
  var world = engine.world;
  var render = Matter.Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      width: viewportWidth,
      height: adjustedHeight,
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

  // Add event listener for mouse clicks
  var isNextShapeBall = true; // Alternate between adding a ball and a square
  document.addEventListener("mousedown", function (event) {
    var x = event.clientX;
    var y = event.clientY;

    // Check if the next shape to add is a ball
    if (isNextShapeBall) {
      addBall(x, y);
    } else {
      addSquare(x, y);
    }

    // Toggle the shape for the next click
    isNextShapeBall = !isNextShapeBall;
  });

  var canvasHeight = window.innerHeight;
  var floorYPosition = canvasHeight - 150;

  // Create the floor at the calculated bottom position
  var floor = Matter.Bodies.rectangle(
    document.documentElement.clientWidth / 2,
    floorYPosition,
    document.documentElement.clientWidth,
    10, // Height of the floor
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

  //Make interactive
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

  mouseConstraint.mouse.element.removeEventListener(
    "mousewheel",
    mouseConstraint.mouse.mousewheel
  );
  mouseConstraint.mouse.element.removeEventListener(
    "DOMMouseScroll",
    mouseConstraint.mouse.mousewheel
  );

  //Start the engine
  Matter.Engine.run(engine);
  Matter.Render.run(render);
});
