'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
var Ball = require('../objects3D/BallObject3D');
var Grid = require('../objects3D/GridObject3D');

var ballSection = new Section('ball');

var ball = new Ball();
ball.el.rotation.z = 2;
ballSection.add(ball.el);

var grid = new Grid({
  step: 5,
  stepsX: 11,
  stepsY: 11,
  loop: true
});
grid.el.rotation.set(1.5, 1, 2);
grid.el.position.x = -20;
ballSection.add(grid.el);

var text = new TextPanel(
  '',
  {
    align: 'left',
    style: '',
    size: 50,
    lineSpacing: 40
  }
);
text.el.position.set(0, 0, 15);
text.el.rotation.y = -0.4;
ballSection.add(text.el);

var text2 = new TextPanel(
  '',
  {
    align: 'center',
    style: '',
    size: 30,
    lineSpacing: 40
  }
);
text2.el.position.set(0, -5, 15);
// text2.el.rotation.y = -0.4;
ballSection.add(text2.el);


ball.el.visible = false;
grid.el.visible = false;

ballSection.onIn(function () {
  ball.in();
  grid.in();
  text.in();
  text2.in();
});

ballSection.onOut(function (way) {
  text.out(way);
  grid.out(way);
  text2.out(way);

  if (way === 'up') {
    ball.out();
  }
});

ballSection.onStart(function () {
  ball.start();
  grid.start();

  ball.el.visible = true;
  grid.el.visible = true;
});

ballSection.onStop(function () {
  ball.stop();
  grid.stop();

  ball.el.visible = false;
  grid.el.visible = false;
});

module.exports = ballSection;