'use strict'

class ThreeApp extends NanoThreejsWidget {
  constructor (conf) {
    super(conf);

    this.triangle = new Triangle({
      size : 5
    });

    this.triangle.element.position.x = 10;
    this.triangle.element.position.y = 10;
    this.triangle.element.position.z = 10;

    this.render(this.triangle.element);
  }

  setup () {
    this._bindEvents();
  }

  _bindEvents () {
    Dispatcher.bind('update', this._handleUpdate.bind(this));
  }

  _handleUpdate (ev) {
    this.triangle.element.rotation.z += ev.data.delta * 0.01;
    console.log('>>', this.triangle.element.rotation.z);
  }
}
