'use strict';

var THREE = require('three');

var Section = require('../classes/SectionClass');

var FlowField = require('../objects3D/FlowFieldObject3D');
var TextPanel = require('../objects3D/TextPanelObject3D');

var flowSection = new Section('flow');

var points = [
  new THREE.Vector3(0, 50, 20),
  new THREE.Vector3(20, 0, -10),
  new THREE.Vector3(-20, -100, 0)
];

var field = new FlowField(points, {
  subsAmplitude: 50,
  subsNumber: 10
});

var text = new TextPanel(
  'F  O  L  L  O  W \n US ON SOCIAL MEDIA',
  {
    align: 'center',
    style: '',
    size: 50,
    lineSpacing: 40
  }
);

var socialmediadiv = document.getElementById('socialmedia');

socialmediadiv.style.position = 'absolute'; // Overlay on the scene
socialmediadiv.style.zIndex = '10'; // Make sure it appears above the canvas
socialmediadiv.style.display = 'none'; // Initially hidden

// Center the div horizontally and place it just below the 3D text
// socialmediadiv.style.left = '35%'; // Move to the center horizontally
socialmediadiv.style.transform = 'translateX(-50%) rotateY(0.4)'; // Match the rotation with the text
socialmediadiv.style.top = '50%'; // Adjust to align with the 3D text
socialmediadiv.style.justifyContent = 'center';
socialmediadiv.style.width = '100%';
// Adjust based on text size and padding (depends on your layout)
text.el.position.z = -10;
// text.el.rotation.y = 0.4;
flowSection.add(text.el);

flowSection.add(socialmediadiv);


field.el.visible = false;

var fieldIn = false;

flowSection.fieldIn = function () {
  if (fieldIn) {
    return false;
  }

  fieldIn = true;

  field.in();
};

flowSection.onIn(function () {
  text.in();
  socialmediadiv.style.display = 'flex';
});

flowSection.onOut(function (way) {
  text.out(way);
   socialmediadiv.style.display = 'none';
});

flowSection.onStart(function () {
  field.start();


});

flowSection.onStop(function () {
  field.el.visible = true;

  field.stop();
  socialmediadiv.style.display = 'none';
  field.el.visible = false;
});

module.exports = flowSection;