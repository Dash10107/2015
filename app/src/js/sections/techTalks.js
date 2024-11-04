'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
// var HeightMap = require('../objects3D/HeightMapObject3D');

var techTalkSection = new Section('techtalks');


var text = new TextPanel(
  'Tech Talks',
  {
    align: 'center',
    style: '',
    size: 50,
    lineSpacing: 40,
  }
);
text.el.position.set(0, 15, 0);
techTalkSection.add(text.el);



var gallery = document.getElementById("video-gallery");
gallery.style.position = 'absolute';
gallery.style.top = '50%';
gallery.style.left = '50%';
gallery.style.transform = 'translate(-50%, -50%)';
gallery.style.zIndex = 10;
gallery.style.display = 'none';
techTalkSection.add(gallery);


techTalkSection.onIn(function () {
  text.in();
  gallery.style.display = 'grid';
});

techTalkSection.onOut(function (way) {
  text.out(way);
  gallery.style.display = 'none';
});

techTalkSection.onStart(function () {
    text.in();
  gallery.style.display = 'grid';
});

techTalkSection.onStop(function () {
    text.out(way);
    gallery.style.display = 'none';
    
});

techTalkSection.show = function () {
    text.in();
  gallery.style.display = 'grid';
//   heightMap.el.visible = true;

};

techTalkSection.hide = function () {
    text.out(way);
    gallery.style.display = 'none';
//   heightMap.el.visible = false;
};

module.exports = techTalkSection;