window.addEventListener("load", function () {
  var canvas = document.getElementById("world");

  // Window size
  var viewportWidth = window.innerWidth;
  var viewportHeight = window.innerHeight * 1.6;

  // Setup Matter JS Engine
  var engine = Matter.Engine.create({
    enableSleeping: false,
  });

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

  // Calculate the total area of the canvas
  var totalArea = viewportWidth * viewportHeight;
  var occupiedArea = 0;

  // Function to update the occupied area
  function updateOccupiedArea(shapeArea) {
    occupiedArea += shapeArea;
  }

  // Function to add a ball at a specific location with a specific size
  function addBall(x, y, size) {
    var radius = size / 2;
    var area = Math.PI * radius * radius;
    updateOccupiedArea(area);

    var newBall = Matter.Bodies.circle(x, y, radius, {
      density: 0.1,
      friction: 0.15,
      frictionAir: 0.005,
      frictionStatic: 2,
      restitution: 0.6,
      render: {
        fillStyle: "#b82ebd",
        strokeStyle: "#101011",
        lineWidth: 3,
      },
    });
    Matter.World.add(world, newBall);
  }

  // Function to add a square at a specific location with a specific size
  function addSquare(x, y, size) {
    var area = size * size;
    updateOccupiedArea(area);

    var square = Matter.Bodies.rectangle(x, y, size, size, {
      density: 0.5,
      friction: 0.15,
      frictionAir: 0.005,
      frictionStatic: 4,
      restitution: 0.3,
      render: {
        fillStyle: "#ce5c16",
        strokeStyle: "#101011",
        lineWidth: 3,
      },
    });
    Matter.World.add(world, square);
  }

  // Function to add a triangle at a specific location with a specific size
  function addTriangle(x, y, size) {
    var area = (Math.sqrt(3) / 4) * size * size;
    updateOccupiedArea(area);

    var newTriangle = Matter.Bodies.polygon(x, y, 3, size / Math.sqrt(3), {
      density: 0.15,
      friction: 0.15,
      frictionAir: 0.005,
      frictionStatic: 3,
      restitution: 0.5,
      render: {
        fillStyle: "#c2bbb3",
        strokeStyle: "#101011",
        lineWidth: 3,
      },
    });
    Matter.World.add(world, newTriangle);
  }

  var isNextShapeBall = true;
  document.addEventListener("mousedown", function (event) {
    var x = event.clientX;
    var y = event.clientY;
    var size = Math.random() * (280 - 90) + 100; // Generate a random size between 50px and 180px

    switch (nextShape) {
      case 0:
        addBall(x, y, size);
        break;
      case 1:
        addSquare(x, y, size);
        break;
      case 2:
        addTriangle(x, y, size);
        break;
      default:
        break;
    }
  });

  const angle = 85 * (Math.PI / 180); // Adjusting back for clarity, but you can modify this as needed
  const lineLength = Math.sqrt(
    Math.pow(viewportHeight, 2) + Math.pow(viewportWidth / 2, 2)
  );
  // Calculate positions based on the viewport dimensions and desired angle
  const middleY = viewportHeight / 2 + (Math.sin(angle) * lineLength) / 3; // Adjust based on your requirements

  // Left side of the V
  var leftSide = Matter.Bodies.rectangle(
    0,
    middleY - (Math.sin(angle) * lineLength) / 7,
    30,
    lineLength,
    {
      isStatic: true,
      angle: -angle,
      render: {
        fillStyle: "#c2bbb3",
        visible: true,
      },
    }
  );

  // Right side of the V
  var rightSide = Matter.Bodies.rectangle(
    viewportWidth,
    middleY - (Math.sin(angle) * lineLength) / 2,
    30,
    lineLength,
    {
      isStatic: true,
      angle: angle,
      render: {
        fillStyle: "#c2bbb3",
        visible: true,
      },
    }
  );

  Matter.World.add(world, [leftSide, rightSide]);

  // Create the floor
  var floor = Matter.Bodies.rectangle(
    viewportWidth / 2,
    viewportHeight,
    viewportWidth,
    15,
    {
      isStatic: true,
      render: {
        fillStyle: "#b82ebd",
        visible: true,
      },
    }
  );
  Matter.World.add(world, floor);

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

  let nextShape = 0;

  setTimeout(function () {
    var shapeInterval = setInterval(function () {
      if (occupiedArea / totalArea < 0.6) {
        // Check if less than 60% of the canvas is occupied
        var x = Math.random() * viewportWidth;
        var y = -100;
        var size = Math.random() * (200 - 60) + 60; // Generate a random size between 60px and 200px

        switch (nextShape) {
          case 0:
            addBall(x, y, size);
            break;
          case 1:
            addSquare(x, y, size);
            break;
          case 2:
            addTriangle(x, y, size);
            break;
        }
        nextShape = (nextShape + 1) % 3;
      } else {
        clearInterval(shapeInterval);
      }
    }, 450);
  }, 10000); // 15000 milliseconds = 15 seconds

  Matter.Engine.run(engine);
  Matter.Render.run(render);
});
