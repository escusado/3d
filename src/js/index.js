'use strict';

var onDomReady = function onDomReady() {
  //cental dispatcher
  window.Dispatcher = new NanoCustomEventSupport();

  //create app
  window.app = new App();

  //render
  app.render(document.querySelector('.wrapper'));

  //start
  app.setup();
  app.run();
};

//on dom ready
if (document.readyState != 'loading'){
  onDomReady();
} else {
  document.addEventListener('DOMContentLoaded', onDomReady);
}
