'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
var Rocks = require('../objects3D/RocksObject3D');

var galaxySection = new Section('galaxy');

var rocks = new Rocks();
galaxySection.add(rocks.el);

var text = new TextPanel(
  'UDAAN',
  {
    align: 'center',
    style: '',
    size: 50,
    lineSpacing: 40
  }
);
text.el.position.set(0, 15, 0);
galaxySection.add(text.el);
text.out('down');

var videodiv = document.getElementById('udaan-video');

// Apply inline CSS to style and center the video
videodiv.style.position = 'absolute'; // Overlay on the scene
videodiv.style.top = '60%'; // Center vertically
videodiv.style.left = '50%'; // Center horizontally
videodiv.style.transform = 'translate(-50%, -50%)'; // Center properly using transform
videodiv.style.width = '100%';
 // Make the video div take 80% of the viewport width
videodiv.style.height = '80%'
 videodiv.style.zIndex = '100'; // Ensure it appears above the canvas
videodiv.style.padding = '20px'; // Add padding around the video
videodiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Dark background with transparency
videodiv.style.borderRadius = '15px'; // Rounded corners
videodiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)'; // Add a shadow effect
videodiv.style.display = 'none'; // Initially hidden
galaxySection.add(videodiv);




rocks.el.visible = false;

galaxySection.onIn(function () {
  text.in();
  rocks.in();
  videodiv.style.display = 'block';
});

galaxySection.onOut(function (way) {
  text.out('down');
  rocks.out(way);
  videodiv.style.display = 'none';
});

galaxySection.onStart(function () {
  rocks.start();
});

galaxySection.onStop(function () {
  rocks.stop();
  videodiv.style.display = 'none';
});

galaxySection.show = function () {
  rocks.el.visible = true;
};

galaxySection.hide = function () {
  rocks.el.visible = false;
};

module.exports = galaxySection;