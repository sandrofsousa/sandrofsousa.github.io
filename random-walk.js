// Random walk animation — 4 walkers from corners on a square grid
(function () {
  const canvas = document.getElementById("rw-canvas");
  if (!canvas) return;

  // Respect reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  const GRID = 20;
  const TRAIL = 170;
  const INTERVAL = 90;
  const COLORS = [
    [139, 58, 26], // rust
    [181, 101, 29], // light rust
    [107, 62, 38], // warm brown
    [222, 184, 135], // sand
    [160, 82, 45], // sienna
    [205, 133, 63], // peru
  ];

  let walkers = [];
  let cols, rows;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    cols = Math.floor(canvas.width / GRID);
    rows = Math.floor(canvas.height / GRID);
    initWalkers();
  }

  function initWalkers() {
    var midCol = Math.floor(cols / 2);
    var starts = [
      [0, 0],
      [cols - 1, 0],
      [0, rows - 1],
      [cols - 1, rows - 1],
      [midCol, 0],
      [midCol, rows - 1],
    ];
    walkers = starts.map(function (c, i) {
      return { x: c[0], y: c[1], trail: [], color: COLORS[i] };
    });
  }

  var dirs = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  function step() {
    for (var w of walkers) {
      w.trail.push({ x: w.x, y: w.y });
      if (w.trail.length > TRAIL) w.trail.shift();
      var d = dirs[Math.floor(Math.random() * 4)];
      w.x = (((w.x + d[0]) % cols) + cols) % cols;
      w.y = (((w.y + d[1]) % rows) + rows) % rows;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid dots
    ctx.fillStyle = "rgba(139, 58, 26, 0.04)";
    for (var c = 0; c < cols; c++) {
      for (var r = 0; r < rows; r++) {
        ctx.beginPath();
        ctx.arc(c * GRID + GRID / 2, r * GRID + GRID / 2, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Walkers
    for (var w of walkers) {
      var rgb = w.color;
      for (var i = 0; i < w.trail.length; i++) {
        var alpha = (i / w.trail.length) * 0.12;
        var size = 2 + (i / w.trail.length) * 4;
        ctx.fillStyle =
          "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + alpha + ")";
        ctx.fillRect(
          w.trail[i].x * GRID + GRID / 2 - size / 2,
          w.trail[i].y * GRID + GRID / 2 - size / 2,
          size,
          size,
        );
      }
      // Current position
      ctx.fillStyle = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ",0.25)";
      ctx.beginPath();
      ctx.arc(w.x * GRID + GRID / 2, w.y * GRID + GRID / 2, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  resize();
  setInterval(function () {
    step();
    draw();
  }, INTERVAL);
  window.addEventListener("resize", resize);
})();
