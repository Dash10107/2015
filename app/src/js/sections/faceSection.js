'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
var Face = require('../objects3D/FaceHpObject3D');
var Strips = require('../objects3D/StripsObject3D');

var faceSection = new Section('face');

var text = new TextPanel(
  'Achievements',
  {
    align: 'center',
    style: '',
    size: 50,
    lineSpacing: 40
  }
);
text.el.position.set(0, 10, 0);
// text.el.rotation.y = -0.4;
faceSection.add(text.el);

// Stats container setup
var statsContainer = document.getElementById("statscards");
statsContainer.style.position = 'absolute';
statsContainer.style.top = '70%';

// statsContainer.style.right = '-35%';
statsContainer.style.left = '65%';
statsContainer.style.transform = 'translate(-50%, -50%)';
statsContainer.style.zIndex = 10;
statsContainer.style.display = 'none';
faceSection.add(statsContainer);


// Counter functionality
const runCounters = () => {
  const counters = document.querySelectorAll('[class^="counter"]');
  
  counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const increment = target / 2000;
      
      const updateCounter = () => {
          const count = +counter.innerText;
          if (count < target) {
              counter.innerText = Math.ceil(count + increment);
              setTimeout(updateCounter, 1);
          } else {
              counter.innerText = target;
          }
      };
      
      updateCounter();
  });
};

// Function to handle responsive changes
const applyResponsiveStyles = () => {
  const windowWidth = window.innerWidth;

  if (windowWidth <= 480) {
      // Apply mobile-specific styles
      statsContainer.style.top = '40%';
      text.el.position.set(0, 18, 0); // Adjust TextPanel position for 480px
  } else {
      // Apply default styles for larger screens
      statsContainer.style.top = '50%';
      text.el.position.set(0, 10, 0); // Default TextPanel position
  }
};

// Add an event listener to trigger on window resize or load
window.addEventListener('resize', applyResponsiveStyles);
window.addEventListener('load', applyResponsiveStyles);

// Call the function once initially
applyResponsiveStyles();

// var face = new Face();
// face.el.position.y = -5;
// face.el.rotation.x = -0.1;
// face.el.rotation.z = 0.25;
// faceSection.add(face.el);

var strips = new Strips({
  count: 10,
  colors: ['#444444', '#333333', '#222222'],
  rangeY: [-60, 60]
});
faceSection.add(strips.el);

// face.el.visible = false;
strips.el.visible = false;


faceSection.onIn(function () {
  // face.in();
  strips.in();
  statsContainer.style.display = 'flex';
  statsContainer.style.opacity = '0'; // Ensure it starts from invisible
  statsContainer.classList.add('fadeIn'); // Add animation class
  setTimeout(() => {
    statsContainer.style.opacity = '1'; // Set opacity to 1 after animation starts
  }, 1000); 

  text.in();
});

faceSection.onOut(function (way) {
  // face.out(way);
  statsContainer.style.display = 'none';
  strips.out();
  text.out();
});

faceSection.onStart(function () {
  // face.start();

  // face.el.visible = true;
  strips.el.visible = true;
      statsContainer.style.display = 'flex';
      // Run counters when the section becomes visible
      runCounters();
});

faceSection.onStop(function () {
  // face.stop();
 statsContainer.style.display = 'none';
   
  // face.el.visible = false;
  strips.el.visible = false;
});

module.exports = faceSection;