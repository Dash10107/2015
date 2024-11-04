'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
// var Wave = require('../objects3D/WaveObject3D');

var waveSection = new Section('wave');

// var wave = new Wave();
// waveSection.add(wave.el);

var text = new TextPanel(
  'BugBuster',
  {
    align: 'center',
    style: '',
    size: 50,
    lineSpacing: 40
  }
);
text.el.position.y = 10;
text.el.rotation.x = 0.2;
waveSection.add(text.el);

var gallery = document.getElementById("gallery");
gallery.style.position = 'absolute';
gallery.style.top = '50%';
gallery.style.left = '50%';
gallery.style.transform = 'translate(-50%, -50%)';
gallery.style.zIndex = 10;
gallery.style.display = 'none';
waveSection.add(gallery);



// wave.el.visible = false;

waveSection.onIn(function (way) {
  text.in();
  gallery.style.display = 'grid';
  // wave.in(way);
});

waveSection.onOut(function (way) {
  text.out(way);
  gallery.style.display = 'none';
  // wave.out(way);
});

waveSection.onStart(function () {
  // wave.start();


  // wave.el.visible = true;
});

waveSection.onStop(function () {
  // wave.stop();
  gallery.style.display = 'none';
  // wave.el.visible = false;
});

module.exports = waveSection;