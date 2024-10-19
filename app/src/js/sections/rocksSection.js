'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
var Rocks = require('../objects3D/RocksObject3D');

var rocksSection = new Section('rocks');

var rocks = new Rocks();
rocksSection.add(rocks.el);

var text = new TextPanel(
  'OVERVIEW',
  {
    align: 'center',
    style: '',
    size: 50,
    lineSpacing: 40
  }
);
text.el.position.set(0, 0, 0);
rocksSection.add(text.el);
text.out('down');

var text2 = new TextPanel(
  'To advance Science and Technology for \n Electronics, Telecommuncation, Computers, \n Information Technology and related areas',
  {
    align: 'left',
    style: '',
    size: 30,  // Slightly smaller font size for the overview heading
    lineSpacing: 40
  }
);
text2.el.position.set(0, -7, 0); // Position this panel slightly lower
rocksSection.add(text2.el);
text2.out('down');



rocks.el.visible = false;

rocksSection.onIn(function () {
  text.in();
  text2.in();
  rocks.in();
});

rocksSection.onOut(function (way) {
  text.out('down');
  text2.out('down');
  rocks.out(way);
});

rocksSection.onStart(function () {
  rocks.start();
});

rocksSection.onStop(function () {
  rocks.stop();
});

rocksSection.show = function () {
  rocks.el.visible = true;
};

rocksSection.hide = function () {
  rocks.el.visible = false;
};

module.exports = rocksSection;