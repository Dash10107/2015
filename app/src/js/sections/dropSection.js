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

// // Function to apply responsive styles
// const applyResponsiveStyles = () => {
//     const windowWidth = window.innerWidth;
    
//     if (windowWidth <= 768) {
//         // Mobile styles
//         statsContainer.style.top = '15%';
//         statsContainer.style.left = '50%';
//         statsContainer.style.transform = 'translate(-50%, -15%)';
//         statsContainer.style.width = '95%';
//         statsContainer.style.flexDirection = 'column';
//         statsContainer.style.textAlign = 'center';
//         statsContainer.style.fontSize = '1.2em';

//         mission.style.top = '65%';
//         mission.style.left = '50%';
//         mission.style.transform = 'translate(-50%, -50%)';
//         mission.style.width = '90%';
//         mission.style.fontSize = '1.1em';
//     } else {
//         // Desktop styles
//         statsContainer.style.top = '30%';
//         statsContainer.style.left = '55%';
//         statsContainer.style.transform = 'translate(-50%, -50%)';
//         statsContainer.style.width = 'auto';
//         statsContainer.style.flexDirection = 'row';

//         mission.style.top = '65%';
//         mission.style.left = '39%';
//         mission.style.transform = 'translate(-50%, -50%)';
//         mission.style.width = 'auto';
//     }
// };

// Stats container setup
var statsContainer = document.getElementById("statscards");
statsContainer.style.position = 'absolute';
statsContainer.style.top = '30%';
// statsContainer.style.right = '-35%';
statsContainer.style.left = '75%';
statsContainer.style.transform = 'translate(-50%, -50%)';
statsContainer.style.zIndex = 10;
statsContainer.style.display = 'none';
dropSection.add(statsContainer);

// Mission container setup
var mission = document.getElementById("missions");
mission.style.position = 'absolute';
mission.style.top = '65%';
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
text.el.position.set(-30, 5, 0);
dropSection.add(text.el);

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
        statsContainer.style.top = '25%';
        text.el.position.set(0, 18, 0); // Adjust TextPanel position for 480px
    } else {
        // Apply default styles for larger screens
        statsContainer.style.top = '30%';
        text.el.position.set(-30, 5, 0); // Default TextPanel position
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
    statsContainer.style.display = 'flex';
    mission.style.display = 'block';

    // Run counters when the section becomes visible
    runCounters();
});

dropSection.onOut(function (way) {
    drop.out(way);
    text.out(way);
    statsContainer.style.display = 'none';
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
