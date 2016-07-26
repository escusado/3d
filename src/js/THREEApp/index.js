'use strict'

class ThreeApp extends NanoThreejsWidget {
  constructor (conf) {
    super(conf);

    this.triangle = new Triangle({
      size : 50
    });

    this.triangle.render(this.element);
  }
}
