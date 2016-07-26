'use strict'

class CubeApp extends NanoThreejsWidget {

  //.renderEngine

  constructor (conf) {
    super(conf);

    this.cube = new Cube({
      size : 25
    });

    this.render(this.cube.element);
  }

  setup () {
    this._bindEvents();
  }

  _bindEvents () {
    Dispatcher.bind('update', this._handleUpdate.bind(this));
  }

  _handleUpdate (ev) {
    // this.cube.element.rotation.x += ev.data.delta * 0.001;
  }
}
