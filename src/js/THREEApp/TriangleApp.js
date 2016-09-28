'use strict'

class TriangleApp extends NanoThreejsWidget {

  //.renderEngine

  constructor (conf) {
    super(conf);

    this.triangle = new Triangle({
      size : 25,
      position : {
        x: 0,
        y: 0,
        z: 0
      },
      color: 0xFFFF00
    });

    this.render(this.triangle.element);
  }

  setup () {
    this._bindEvents();
  }

  _bindEvents () {
    Dispatcher.bind('update', this._handleUpdate.bind(this));
  }

  _handleUpdate (ev) {
    // this.triangle.element.rotation.x += ev.data.delta * 0.01;
  }
}
