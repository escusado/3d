'use strict'

class MapApp extends NanoThreejsWidget {

  //.renderEngine

  constructor (conf) {
    super(conf);

    this.cube = new Map({
      url : '/mesh-1.gltf'
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
    this.cube.element.rotation.x += ev.data.delta * 0.001;
    this.cube.element.rotation.y += ev.data.delta * 0.001;
  }
}
