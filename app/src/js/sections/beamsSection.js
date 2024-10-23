'use strict';

var Section = require('../classes/SectionClass');

var Beam = require('../objects3D/BeamObject3D');

var beamsSection = new Section('beams');




var leftBeam = new Beam({ color: '#808080', delay: 0.2 });
leftBeam.el.position.set(15, 25, -10);
beamsSection.add(leftBeam.el);

var middleBeam = new Beam({ color: '#ffffff', width: 4, cubeSize: 1, delay: 0.1 });
middleBeam.el.position.y = 15;
beamsSection.add(middleBeam.el);

var rightBeam = new Beam({ color: '#4c4c4c', delay: 0.4 });
rightBeam.el.position.set(-20, 30, -20);
beamsSection.add(rightBeam.el);

leftBeam.el.visible = false;
middleBeam.el.visible = false;
rightBeam.el.visible = false;

var videodiv = document.getElementById('about-video');

// Apply inline CSS to style and center the video
videodiv.style.position = 'absolute'; // Overlay on the scene
videodiv.style.top = '0'; // Center vertically
videodiv.style.left = '0'; // Center horizontally
videodiv.style.transform = 'translate(-50%, -50%)'; // Center properly using transform
videodiv.style.width = '100%';
 // Make the video div take 80% of the viewport width
videodiv.style.height = '100%'
 videodiv.style.zIndex = '100'; // Ensure it appears above the canvas
videodiv.style.padding = '20px'; // Add padding around the video
videodiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Dark background with transparency
videodiv.style.borderRadius = '15px'; // Rounded corners
videodiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)'; // Add a shadow effect
videodiv.style.display = 'none'; // Initially hidden
beamsSection.add(videodiv);


beamsSection.onIn(function () {
  leftBeam.in();
  middleBeam.in();
  rightBeam.in();
  videodiv.style.display = 'block';
});

beamsSection.onOut(function (way) {
  leftBeam.out(way);
  middleBeam.out(way);
  rightBeam.out(way);
  videodiv.style.display = 'none';

});

beamsSection.onStart(function () {
  leftBeam.start();
  middleBeam.start();
  rightBeam.start();

  leftBeam.el.visible = true;
  middleBeam.el.visible = true;
  rightBeam.el.visible = true;
});

beamsSection.onStop(function () {
  leftBeam.stop();
  middleBeam.stop();
  rightBeam.stop();

  leftBeam.el.visible = false;
  middleBeam.el.visible = false;
  rightBeam.el.visible = false;
});

module.exports = beamsSection;