'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
// var HeightMap = require('../objects3D/HeightMapObject3D');

var superCore2Section = new Section('supercore2');


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
superCore2Section.add(text.el);



var gallery2 = document.getElementById("gallerysecond");
gallery2.style.position = 'absolute';
gallery2.style.top = '50%';
gallery2.style.left = '50%';
gallery2.style.transform = 'translate(-50%, -50%)';
gallery2.style.zIndex = 10;
gallery2.style.display = 'none';
superCore2Section.add(gallery2);


superCore2Section.onIn(function () {
  text.in();
  gallery2.style.display = 'grid';
});

superCore2Section.onOut(function (way) {
  text.out(way);
  gallery2.style.display = 'none';
});

superCore2Section.onStart(function () {


});

superCore2Section.onStop(function () {
    
    
});

superCore2Section.show = function () {
//   heightMap.el.visible = true;


};

superCore2Section.hide = function () {
//   heightMap.el.visible = false;


};

module.exports = superCore2Section;