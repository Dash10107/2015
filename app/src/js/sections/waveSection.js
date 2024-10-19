'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
var Wave = require('../objects3D/WaveObject3D');

var waveSection = new Section('wave');

var wave = new Wave();
waveSection.add(wave.el);

var text = new TextPanel(
  'Aim:',
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
var text2 = new TextPanel(
  'To promote general advancement of electronics and telecommunication engineering\n and to foster technological innovation',
  {
    align: 'center',
    style: '',
    size: 30,  // Slightly smaller font size for the overview heading
    lineSpacing: 40
  }
);
text2.el.position.set(0, -3, 0); // Position this panel slightly lower
waveSection.add(text2.el);



wave.el.visible = false;

waveSection.onIn(function (way) {
  text.in();
  text2.in();
  wave.in(way);
});

waveSection.onOut(function (way) {
  text.out(way);
  text2.out(way);
  wave.out(way);
});

waveSection.onStart(function () {
  wave.start();

  wave.el.visible = true;
});

waveSection.onStop(function () {
  wave.stop();

  wave.el.visible = false;
});

module.exports = waveSection;