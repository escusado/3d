'use strict';

class App extends NanoWidget {
  constructor (conf) {
    super(conf);

    //get the engine API
    this.renderEngine = new ThreeEngine({
      debugAxis : true
    });

    //get rendereable DOMElement from egine (which is the THREEjs renderer El)
    this.element = this.renderEngine.element;
  }

  setup () {
    this.size = {};
    this.children = [];

    this.renderEngine.setup();

    this._bindEvents();

    this.threeApp = new ThreeApp();

    this.renderEngine.scene.add(this.threeApp.element);

    this.renderEngine.camera.lookAt(this.renderEngine.scene.position);
    
    this._resize();
  }

  run () {
    this.renderEngine.update(); //kickstart update loop
  }

  _bindEvents () {
    window.addEventListener('resize', this._resize.bind(this));
    this.renderEngine.bind('update', (ev) => Dispatcher.dispatch('update', ev.data));
  }

  _resize () {
  var newSize = {
    w: window.innerWidth,
    h: window.innerHeight
  };

  this.renderEngine.resize(newSize);
  this.size = newSize;
}
}
