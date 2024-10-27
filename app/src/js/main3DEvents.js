'use strict';

require('./polyfills/animFramePolyfill');
require('./polyfills/bindPolyfill');
require('./polyfills/indexOfPolyfill');

var jQuery = require('jquery');
var TweenLite = require('tweenlite');
TweenLite.defaultEase = window.Quad.easeInOut;

require('./libs/waypointLib');

var APP = require('./modules/appModule');
var SCENE = require('./modules/sceneModule');
var SOUNDS = require('./modules/soundsModule');
var HASH = require('./modules/hashModule');

var ImagesLoader = require('./classes/LoaderClass');

var Loader = require('./objects2D/LoaderObject2D');
var Menu = require('./objects2D/menuObject2D');
var Help = require('./objects2D/HelpObject2D');
var Wireframe = require('./objects2D/WireframeObject2D');

// Keep only required sections
var neonsSection = require('./sections/neonsSection');
var heightSection = require('./sections/heightSection');
var waveSection = require('./sections/waveSection');
var faceSection = require('./sections/faceSection');
var rocksSection = require('./sections/rocksSection');
var galaxySection = require('./sections/galaxySection');
var gravitySection = require('./sections/gravitySection');
var citySection = require('./sections/citySection');
var endSection = require('./sections/endSection');

jQuery(function () {
  HASH.replacePlaceholders();

  var loader = new Loader();
  var help = new Help();
  var menu = new Menu();
  var imagesLoader = new ImagesLoader([
    './app/public/img/texture-ball.png',
    './app/public/img/texture-ballAlpha.png',
    './app/public/img/sprite-smoke.png',
    './app/public/img/sprite-AKQA.png'
  ]);

  // preload
  imagesLoader.start();

  imagesLoader.onProgress(function (percent) {
    loader.update(percent);
  });

  imagesLoader.onComplete(function () {
    loader.out();
    TweenLite.delayedCall(0.8, SCENE.in);
    TweenLite.delayedCall(1.5, function () {
      map.in();
      menu.in();
    });
  });

  menu.onClick(function () {
    var $el = jQuery(this);
    var name = $el.attr('data-button') || '';

    if (name === 'sounds') {
      SOUNDS.toggle();
      $el.html(SOUNDS.isMuted() ? 'UNMUTE' : 'MUTE');
    }
    else if (name === 'help') {
      help.in();
    }
    else if (name === 'quality') {
      var text;
      var quality;

      if (SCENE.getQuality() === 0.5) {
        text = 'QUALITY 1';
        quality = 1;
      } else {
        text = 'QUALITY 0.5';
        quality = 0.5;
      }

      $el.html(text);
      SCENE.quality(quality);
    }
  });

  var $heads = jQuery('.heads');
  var $viewport = $heads.find('.heads__viewport');

  SCENE.config({ quality: 1 });
  SCENE.setViewport($viewport);
  SCENE.addSections([
    neonsSection,
    heightSection,
    waveSection,
    faceSection,
    rocksSection,
    galaxySection,
    gravitySection,
    citySection,
    endSection
  ]);

  SCENE.on('section:changeBegin', function () {
    var to = this.to.name;

    if (to === 'neons') {
      neonsSection.start();
      neonsSection.smokeStart();
      heightSection.show();
    }
    else if (to === 'height') {
      heightSection.in();
      heightSection.start();
    }
    else if (to === 'wave') {
      waveSection.in();
      waveSection.start();
    }
    else if (to === 'face') {
      faceSection.in();
      faceSection.start();
      rocksSection.show();
    }
    else if (to === 'rocks') {
      rocksSection.in();
      rocksSection.start();
    }
    else if (to === 'galaxy') {
      galaxySection.in();
      galaxySection.start();
    }
    else if (to === 'gravity') {
      gravitySection.in();
      gravitySection.start();
    }
    else if (to === 'city') {
      citySection.in();
    }
    else if (to === 'end') {
      endSection.in();
    }
  });

  SCENE.on('section:changeComplete', function () {
    var from = this.from.name;

    if (from === 'neons') {
      neonsSection.stop();
    }
    else if (from === 'height') {
      heightSection.stop();
    }
    else if (from === 'wave') {
      waveSection.stop();
    }
    else if (from === 'face') {
      faceSection.stop();
    }
    else if (from === 'rocks') {
      rocksSection.stop();
    }
    else if (from === 'galaxy') {
      galaxySection.stop();
    }
    else if (from === 'gravity') {
      gravitySection.stop();
    }
  });

  SCENE.on('end', function () {
    SCENE.lock();
    APP.slide(SCENE.unlock);
  });

  var map = SCENE.getMap();
  $heads.prepend(map.$el);

  map.init();
  map.onClick(function (index) {
    SCENE.goTo(index);
  });

  SCENE.on('section:changeBegin', function () {
    map.setActive(this.to.index);
  });

  var wireframe = new Wireframe(jQuery('.wireframe'));
  APP.on('heads:visible', function () {
    SCENE.start();
  });
  APP.on('heads:invisible', function () {
    SCENE.stop();
  });

  APP.start();
  SCENE.start();
  SOUNDS.background.fadeIn(1, 2000);
});
