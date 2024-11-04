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
// var neonsSection = require('./sections/neonsSection');
var heightSection = require('./sections/heightSection');
var waveSection = require('./sections/waveSection');

var rocksSection = require('./sections/rocksSection');
// var galaxySection = require('./sections/galaxySection');
// var gravitySection = require('./sections/gravitySection');
// var citySection = require('./sections/citySection');
var endSection = require('./sections/endSection');
var ourTeamSection = require ('./sections/ourTeam')
var superCoreSection = require('./sections/superCore')
var superCore2Section  = require('./sections/superCore2')


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
    TweenLite.delayedCall(0.3, SCENE.in);
    TweenLite.delayedCall(0.5, function () {
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
    ourTeamSection,
    superCoreSection,
    superCore2Section,
    heightSection,
    waveSection,
    // faceSection,
    // rocksSection,
    // galaxySection,
    // gravitySection,
    // citySection,
    endSection
  ]);
// Initialize the first section (if needed) when the scene starts
function initializeFirstSection() {
  const initialSection = ourTeamSection; 
  initialSection.show();
  // Replace with the actual initial section if it's different
  initialSection.in();
  initialSection.start();
}

// Call initializeFirstSection when the page loads or scene initializes
initializeFirstSection();

// Function to handle transitions between sections
function transitionToSection(toSection, fromSection) {
  return new Promise((resolve) => {
    if (fromSection && fromSection.out) {
      fromSection.out();  // Trigger the "out" transition for the current section
      fromSection.stop(); // Stop the section's active processes
    }
    setTimeout(() => {
      if (toSection) {
        toSection.in();    // Trigger the "in" transition for the next section
        toSection.start(); // Start the section's active processes
      }
      resolve(); // Resolve the promise after the transition completes
    }, 500); // Adjust this timeout as needed for the out transition duration
  });
}

SCENE.on('section:changeBegin', async function () {
  const to = this.to.name;
  const from = this.from.name;

  // Map section names to section objects
  const sections = {
    ourteam: ourTeamSection,
    supercore: superCoreSection,
    supercore2: superCore2Section,
    end: endSection,
    // Uncomment and add other sections as needed:
    // face: faceSection,
    // rocks: rocksSection,
    // galaxy: galaxySection,
    // gravity: gravitySection,
    // city: citySection,
  };

  // Get the current (from) and target (to) sections
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

    if (from === 'ourteam') {
      ourTeamSection.out();
      ourTeamSection.stop();
    }
    else if (from === 'supercore') {
      // heightSection.stop();
      superCoreSection.out();
      superCoreSection.stop();
    }
    else if (from === 'supercore2') {
      superCore2Section.out();
      superCore2Section.stop();
    }
    // else if (from === 'face') {
    //   faceSection.stop();
    // }
    else if (from === 'rocks') {
      rocksSection.stop();
    }
    // else if (from === 'galaxy') {
    //   galaxySection.stop();
    // }
    // else if (from === 'gravity') {
    //   gravitySection.stop();
    // }
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
