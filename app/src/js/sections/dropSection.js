'use strict';

var Section = require('../classes/SectionClass');
const THREE = require('three');

var TextPanel = require('../objects3D/TextPanelObject3D');
var Drop = require('../objects3D/DropObject3D');

var dropSection = new Section('drop');

var drop = new Drop({ amplitude: 4 });
drop.el.rotation.x = -1.2;
drop.el.position.y = -10;
dropSection.add(drop.el);

var text = new TextPanel(
  'ABOUT US',
  {
    align: 'right',
    style: '',
    size: 50,
    lineSpacing: 40
  }
);
text.el.position.set(0, 8, 0);
dropSection.add(text.el);


var videodiv = document.getElementById('about-video');

// Apply inline CSS to style and center the video
videodiv.style.position = 'absolute'; // Overlay on the scene
videodiv.style.top = '50%'; // Center vertically
videodiv.style.left = '50%'; // Center horizontally
videodiv.style.transform = 'translate(-50%, -50%)'; // Center properly using transform
videodiv.style.width = '80%'; // Make the video div take 80% of the viewport width
videodiv.style.zIndex = '100'; // Ensure it appears above the canvas
videodiv.style.padding = '20px'; // Add padding around the video
videodiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Dark background with transparency
videodiv.style.borderRadius = '15px'; // Rounded corners
videodiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)'; // Add a shadow effect
videodiv.style.display = 'none'; // Initially hidden
dropSection.add(videodiv);
drop.el.visible = false;

dropSection.onIn(function () {
  drop.in();
  text.in();
  videodiv.style.display = 'block';
});

dropSection.onOut(function (way) {
  drop.out(way);
  text.out(way);
  videodiv.style.display = 'none';
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