'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
var Rocks = require('../objects3D/RocksObject3D');

var ourTeamSection = new Section('ourteam');

var rocks = new Rocks();
ourTeamSection.add(rocks.el);

var text = new TextPanel(
  'OUR TEAM',
  {
    align: 'center',
    style: '',
    size: 50,
    lineSpacing: 40
  }
);
text.el.position.set(0, 15, 0);
ourTeamSection.add(text.el);
text.out('down');

var videodiv = document.getElementById('team-video');

// Apply inline CSS to style and center the video
videodiv.style.position = 'absolute'; // Overlay on the scene
videodiv.style.top = '20%'; // Center vertically
videodiv.style.left = '0'; // Center horizontally
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
ourTeamSection.add(videodiv);




rocks.el.visible = false;

ourTeamSection.onIn(function () {
  text.in();
  rocks.in();
  videodiv.style.display = 'block';
});

ourTeamSection.onOut(function (way) {
  text.out('down');
  rocks.out(way);
  videodiv.style.display = 'none';
});

ourTeamSection.onStart(function () {
  rocks.start();
});

ourTeamSection.onStop(function () {
  rocks.stop();
});

ourTeamSection.show = function () {
  rocks.el.visible = true;
};

ourTeamSection.hide = function () {
  rocks.el.visible = false;
};

module.exports = ourTeamSection;