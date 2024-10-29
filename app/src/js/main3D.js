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

var helloSection = require('./sections/helloSection');
var beamsSection = require('./sections/beamsSection');
var dropSection = require('./sections/dropSection');
var ballSection = require('./sections/ballSection');
var flowSection = require('./sections/flowSection');
// var neonsSection = require('./sections/neonsSection');
// var heightSection = require('./sections/heightSection');
// var waveSection = require('./sections/waveSection');
// var faceSection = require('./sections/faceSection');
// var rocksSection = require('./sections/rocksSection');
// var galaxySection = require('./sections/galaxySection');
// var gravitySection = require('./sections/gravitySection');
// var citySection = require('./sections/citySection');
var endSection = require('./sections/endSection');
var faceSection = require('./sections/faceSection');

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
    
  // scene
  var $heads = jQuery('.heads');
  var $viewport = $heads.find('.heads__viewport');

  SCENE.config({ quality: 1 });
  SCENE.setViewport($viewport);
  SCENE.addSections([
    helloSection,
    beamsSection,
    dropSection,
    faceSection,
    ballSection,
    flowSection,
    endSection
  ]);
  
  SCENE.on('section:changeBegin', function () {
    var way = this.way;
    var to = this.to.name;
    var from = this.from.name;
  
    // in begin
    if (to === 'hello') {
      helloSection.in();
      helloSection.start();
      helloSection.smokeStart();
  
      beamsSection.out('up');
      beamsSection.start();
    }
    else if (to === 'beams') {
      helloSection.smokeStart();
  
      beamsSection.in();
      beamsSection.start();
    }
    else if (to === 'drop') {
      beamsSection.out('down');
      beamsSection.start();
  
      dropSection.in();
      dropSection.start();
    }
    else if (to === 'face') { // New section transition
      dropSection.out('down');
      dropSection.start();

      faceSection.in();
      faceSection.start();
      const statsContainer = document.querySelector('.statsContainer');
  if (statsContainer) {
    statsContainer.style.opacity = '0'; // Ensure it starts from invisible
    statsContainer.classList.add('fadeIn'); // Add animation class
    setTimeout(() => {
      statsContainer.style.opacity = '1'; // Set opacity to 1 after animation starts
    }, 500); 
    }
    }
    else if (to === 'ball') {
      faceSection.out(way); // Ensure faceSection exits correctly
      faceSection.start();

      ballSection.in();
      ballSection.start();

      flowSection.fieldIn();
      flowSection.start();
    }
    else if (to === 'flow') {
      flowSection.in();
      flowSection.fieldIn();
      flowSection.start();
    }
    else if (to === 'end') {
      endSection.in();
    }
  
    // out begin
    if (from === 'hello') {
      helloSection.out(way);
    }
    else if (from === 'beams') {
      beamsSection.out(way);
    }
    else if (from === 'drop') {
      dropSection.out(way);
    }
    else if (from === 'face') { // Ensure faceSection exits correctly
      faceSection.out(way);

    }
    else if (from === 'ball') {
      ballSection.out(way);
    }
    else if (from === 'flow') {
      flowSection.out(way);
    }
    else if (from === 'end') {
      endSection.out(way);
    }
  });
  
  SCENE.on('section:changeComplete', function () {
    var to = this.to.name;
    var from = this.from.name;
  
    // out complete
    if (from === 'hello') {
      helloSection.stop();
  
      if (to !== 'beams') {
        helloSection.smokeStop();
      }
  
      if (to !== 'beams' && to !== 'drop') {
        beamsSection.stop();
      }
    }
    else if (from === 'beams') {
      if (to !== 'hello') {
        helloSection.smokeStop();
      }
  
      if (to !== 'hello' && to !== 'drop') {
        beamsSection.stop();
      }
    }

    else if (from === 'drop') {
      if (to !== 'hello' && to !== 'beams') {
        beamsSection.stop();
      }

  
      if (to !== 'ball') {
        dropSection.stop();
      }
    }
    else if (from === 'drop') {
      if (to !== 'hello' && to !== 'beams') {
        beamsSection.stop();
      }

      if (to !== 'face') { // Stop drop section if going to face
        dropSection.stop();
      }
    }
    else if (from === 'face') {
      if (to !== 'drop') {
        dropSection.stop();
      }

      if (to !== 'ball') { // Ensure faceSection stops if not going to ball
        faceSection.stop();
      }
    }
    else if (from === 'ball') {
      ballSection.stop();
  
      if (to !== 'drop') {
        dropSection.stop();
      }
  
      if (to !== 'flow') {
        flowSection.stop();
      }
    }
    else if (from === 'flow') {
      flowSection.stop();
    }
    else if (from === 'end') {
      endSection.stop();
    }
  });
  
  SCENE.on('end', function () {
    // SCENE.lock();
    // APP.slide(SCENE.unlock);
  });

  // map
  var map = SCENE.getMap();

  $heads.prepend(map.$el);

  map.init();

  map.onClick(function (index) {
    SCENE.goTo(index);
  });

  SCENE.on('section:changeBegin', function () {
    map.setActive(this.to.index);
  });

  // tails
  // var wireframe = new Wireframe(jQuery('.wireframe'));

  // var $tailsSections = jQuery('.tails__section');
  // $tailsSections.find('.tails__section__el').animate({ opacity: 0, y: 100 }, 0);

  // var waypoint = $tailsSections.waypoint({
  //   $viewport: jQuery('.tails'),
  //   offset: 30
  // });

  // $tailsSections.on('active', function () {
  //   var $el = jQuery(this);
    
  //   if ($el.attr('data-appeared')) {
  //     return false;
  //   }

  //   jQuery(this).find('.tails__section__el').each(function (i) {
  //     jQuery(this).stop().delay(i * 100).animate({ opacity: 1, y: 0 }, 500);
  //   });

  //   $el.attr('data-appeared', true);
  // });

  // jQuery('.tails__section--site').on('stateChange', function (e, state) {
  //   if (state === 'active') {
  //     wireframe.start();
  //     wireframe.in();
  //   } else {
  //     wireframe.stop();
  //   }
  // });

  APP.on('slideBegin', function () {
    if (this.to === 'heads') {
      waypoint.stop();

      try {
        SOUNDS.background.fadeIn(1, 2000);  
      } catch (e) {
        console.warn(e);
      }
      
    } else {
      SOUNDS.background.fadeOut(0, 2000);
    }
  });

  APP.on('slideComplete', function () {
    // if (this.to === 'tails') {
    //   waypoint.start();
    // }
  });
 
  // SCENE on/off
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