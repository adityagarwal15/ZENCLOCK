
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
    "#0D0D0D", // Deep Black
    "#1C1C1C", // Jet Black
    "#2E2E2E", // Graphite
    "#404040", // Anthracite
    "#4D4D4D", // Dark Gray
    "#595959", // Charcoal Gray
    "#666666", // Dim Gray
    "#737373", // Gunmetal Gray
    "#808080", // Mid Gray
    "#999999", // Neutral Gray
    "#B3B3B3", // Silver Gray
    "#CCCCCC", // Soft Silver
    "#D9D9D9", // Light Metallic
    "#E6E6E6", // Light Gray
    "#F2F2F2", // Very Light Gray
    "#FFFFFF"  // Pure White
  ];
  
  

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
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


let currentScroll = 0;
    let isScrollingDown = true;
    let arrows = document.querySelectorAll(".arrow");

    // Create tween for animation
    let tween = gsap.to(".marquee__part", {
        xPercent: 100, // Moves the content from left to right
        repeat: -1,    // Infinite repetition
        duration: 5,   // Duration of one cycle
        ease: "linear",
        paused: false  // Ensures the animation starts immediately
    });
    

    gsap.set(".marquee__inner", { xPercent: -50 });

    window.addEventListener("scroll", function() {
        if (window.pageYOffset > currentScroll) {
            isScrollingDown = true;
        } else {
            isScrollingDown = false;
        }

        // Control the speed based on scroll direction
        gsap.to(tween, {
            timeScale: isScrollingDown ? 1 : -1,
        });

        // Change arrow direction based on scroll direction
        arrows.forEach((arrow) => {
            if (isScrollingDown) {
                arrow.classList.remove("active");
            } else {
                arrow.classList.add("active");
            }
        });

        currentScroll = window.pageYOffset;
    });

    gsap.from(".chronicle-button", {
        duration: 1,
        opacity: 0,
        y: 20,
        stagger: 0.2,
      });
      
      gsap.from(".top-bar", {
        duration: 1, // Animation duration
        opacity: 0,  // Fade in from transparent
        y: -20,      // Slide in from above
        stagger: 0.2 // Delay between items
      });
      
      gsap.from(".marquee", {
        duration: 1, // Animation duration
        opacity: 0,  // Fade in from transparent
        y: 30,       // Slide in from the right
        ease: "power2.out" // Smooth easing
      });
      
      
    

      const marqueeSpeed = window.innerWidth < 768 ? 30 : 15;
document.documentElement.style.setProperty("--marquee-speed", `${marqueeSpeed}s`);

const buttons = document.querySelectorAll('.chronicle-button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.1, duration: 0.3, ease: "power2.out" });
    });
    button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, duration: 0.3, ease: "power2.in" });
    });
});

// Redirect function
function redirectToPage(buttonId, pageUrl) {
    const button = document.getElementById(buttonId);
    button.addEventListener("click", function () {
        window.location.href = pageUrl;
    });
}

// Attach event listeners to buttons
redirectToPage("timerButton", "timer.html");
redirectToPage("stopwatchButton", "stopwatch.html");
redirectToPage("pomodoroButton", "pomodoro.html");
redirectToPage("alarmButton", "alarm.html");


