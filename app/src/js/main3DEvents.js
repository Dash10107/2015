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

var rocksSection = require('./sections/rocksSection');
var galaxySection = require('./sections/galaxySection');
var gravitySection = require('./sections/gravitySection');
// var citySection = require('./sections/citySection');
var endSection = require('./sections/endSection');
var techTalksSection = require('./sections/techTalks');
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
    heightSection,
    neonsSection,
    waveSection,
    techTalksSection,
    // faceSection,
    rocksSection,
    galaxySection,
    gravitySection,
    // citySection,
    endSection
  ]);

  // Initialize the first section immediately when the scene starts
function initializeFirstSection() {
  const initialSection = heightSection; // Assuming 'height' is the first section
  initialSection.show();
  initialSection.in();
  initialSection.start();
}

// Call initializeFirstSection when the page loads or scene initializes
initializeFirstSection();

  function transitionToSection(toSection, fromSection) {
    return new Promise((resolve) => {
      if (fromSection && fromSection.out) {
        fromSection.out(); // Trigger the "out" transition
        fromSection.stop(); // Stop the section's active processes
      }
      setTimeout(() => {
        if (toSection) {
          toSection.in();   // Trigger the "in" transition
          toSection.start(); // Start the section's active processes
        }
        resolve(); // Resolve the promise after the transition is complete
      }, 500); // Adjust timeout to match the out transition duration
    });
  }
  
  SCENE.on('section:changeBegin', async function () {
    const to = this.to.name;
    const from = this.from.name;
    
    // Map section names to section objects
    const sections = {
      height: heightSection,
      neons: neonsSection,
      wave: waveSection,
      techTalks: techTalksSection,
      galaxy: galaxySection,
      gravity: gravitySection,
      end: endSection
    };
    
    // Get the current and target section objects
    const fromSection = sections[from];
    const toSection = sections[to];
  
    // Transition from the current section to the target section
    await transitionToSection(toSection, fromSection);
  });
  
  SCENE.on('section:changeComplete', function () {
    // Any additional cleanup or final actions after transition
  });
  

  SCENE.on('section:changeComplete', function () {
    var from = this.from.name;
    if (from === 'height') {
      heightSection.stop();
    }
    else  if (from === 'neons') {
      neonsSection.out();
      neonsSection.stop();
    }
    else if (from === 'wave') {
     waveSection.onOut();
      waveSection.stop();
    }
    else if (from === 'techTalks'){
      techTalksSection.out();
      techTalksSection.stop();
      }
    // else if (from === 'face') {
    //   faceSection.stop();
    // }
    else if (from === 'rocks') {
      rocksSection.stop();
    }
    else if (from === 'galaxy') {
      galaxySection.out();
      galaxySection.stop();
    }
    else if (from === 'gravity') {
      gravitySection.out();
      gravitySection.stop();
    }
  });

  SCENE.on('end', function () {
    // SCENE.lock();
    // APP.slide(SCENE.unlock);
  });

  var map = SCENE.getMap();
  $heads.prepend(map.$el);

  map.init();
  map.onClick(function (index) {
    SCENE.goTo(index);
  });

  SCENE.on('section:changeBegin', function () {
    var delay = 0.5; // Adjust the delay as needed (in seconds)
  
    // Delay setting the active section
    TweenLite.delayedCall(delay, function() {
      map.setActive(this.to.index);
    }.bind(this)); // Bind 'this' to maintain context inside the delayed function
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
