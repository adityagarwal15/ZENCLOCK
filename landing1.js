const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#0D0D0D", // Deep Black
  "#1C1C1C", // Jet Black
  "#2E2E2E", // Graphite
  "#404040", // Anthracite
  "#595959", // Charcoal Gray
  "#737373", // Gunmetal Gray
  "#A6A6A6", // Cool Steel Gray
  "#D9D9D9", // Light Metallic
  "#999999", // Neutral Gray
  "#B3B3B3", // Silver Gray
  "#CCCCCC", // Soft Silver
  "#E6E6E6", // Light Gray
  "#F2F2F2", // Very Light Gray
  "#FFFFFF"  // Pure White
];


// Detect if the device supports touch
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

if (!isTouchDevice) {
  // Enable custom cursor effect for non-touch devices
  circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index % colors.length];
  });

  window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
  });

  function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function (circle, index) {
      circle.style.left = x - 12 + "px";
      circle.style.top = y - 12 + "px";

      circle.style.scale = (circles.length - index) / circles.length;

      circle.x = x;
      circle.y = y;

      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
  }

  animateCircles();
} else {
  // Hide custom cursor elements on touch devices
  circles.forEach((circle) => {
    circle.style.display = "none";
  });
}
