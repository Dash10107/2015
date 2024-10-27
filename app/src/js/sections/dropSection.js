'use strict';

var Section = require('../classes/SectionClass');
const THREE = require('three');

var TextPanel = require('../objects3D/TextPanelObject3D');
var Drop = require('../objects3D/DropObject3D');

var dropSection = new Section('drop');

// Drop object setup
var drop = new Drop({ amplitude: 4 });
drop.el.rotation.x = -1.2;
drop.el.position.y = -10;
dropSection.add(drop.el);




// Mission container setup
var mission = document.getElementById("missions");
mission.style.position = 'absolute';
mission.style.top = '50%';
mission.style.left = '50%';
mission.style.transform = 'translate(-50%, -50%)';
mission.style.zIndex = 10;
mission.style.display = 'none';
dropSection.add(mission);

// Text setup
var text = new TextPanel(
    'ABOUT US',
    {
        align: 'right',
        style: '',
        size: 55,
        lineSpacing: 40
    }
);
text.el.position.set(0, 18, 0);
dropSection.add(text.el);


// Function to handle responsive changes
const applyResponsiveStyles = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 480) {
        // Apply mobile-specific styles
        // statsContainer.style.top = '25%';
        text.el.position.set(0, 18, 0); // Adjust TextPanel position for 480px
    } else {
        // Apply default styles for larger screens
        // statsContainer.style.top = '30%';
        text.el.position.set(0, 10, 0); // Default TextPanel position
    }
};

// Add an event listener to trigger on window resize or load
window.addEventListener('resize', applyResponsiveStyles);
window.addEventListener('load', applyResponsiveStyles);

// Call the function once initially
applyResponsiveStyles();


// dropSection lifecycle events
dropSection.onIn(function () {
    drop.in();
    text.in();
    // statsContainer.style.display = 'flex';
    mission.style.display = 'block';
    mission.style.opacity = '0'; // Ensure it starts from invisible
    mission.classList.add('fadeIn'); // Add animation class
    setTimeout(() => {
     mission.style.opacity = '1'; // Set opacity to 1 after animation starts
    }, 1000); 

    // Run counters when the section becomes visible
    // runCounters();
});

dropSection.onOut(function (way) {
    drop.out(way);
    text.out(way);
    // statsContainer.style.display = 'none';
    mission.style.display = 'none';
});

dropSection.onStart(function () {
    drop.start();
    drop.el.visible = true;
});

dropSection.onStop(function () {
    drop.stop();
    drop.el.visible = false;
});

module.exports = dropSection;
