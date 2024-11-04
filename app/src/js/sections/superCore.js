'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
// var HeightMap = require('../objects3D/HeightMapObject3D');

var superCoreSection = new Section('supercore');


var text = new TextPanel(
  'Super Core',
  {
    align: 'center',
    style: '',
    size: 50,
    lineSpacing: 40,
  }
);
text.el.position.set(0, 15, 0);
superCoreSection.add(text.el);



var gallery = document.getElementById("gallery");
gallery.style.position = 'absolute';
gallery.style.top = '50%';
gallery.style.left = '50%';
gallery.style.transform = 'translate(-50%, -50%)';
gallery.style.zIndex = 10;
gallery.style.display = 'none';
superCoreSection.add(gallery);


superCoreSection.onIn(function () {
  text.in();
  gallery.style.display = 'grid';
});

superCoreSection.onOut(function (way) {
  text.out(way);
  gallery.style.display = 'none';
});

superCoreSection.onStart(function () {
    text.in();
  gallery.style.display = 'grid';
});

superCoreSection.onStop(function () {
    text.out(way);
    gallery.style.display = 'none';
    
});

superCoreSection.show = function () {
    text.in();
  gallery.style.display = 'grid';
//   heightMap.el.visible = true;

};

superCoreSection.hide = function () {
    text.out(way);
    gallery.style.display = 'none';
//   heightMap.el.visible = false;
};

module.exports = superCoreSection;