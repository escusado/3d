'use strict'

class Map extends NanoThreejsWidget {
  constructor (conf) {
    super(conf);

    var loader = new THREE.GLTFLoader();

    loader.load( this.url, function(data) {
      var object = data.scene;

      this._handleMeshLoaded(object);
    }.bind(this));

    // this.object = new THREE.Object3D();
    //
    // this.object.position.set(0, 0, 0);

  }

  _handleMeshLoaded (object) {
    this.element.add(object);
    this.element.add(new THREE.AmbientLight(0xFFFFFF, 1.0));
    console.log('loader!!!');
  }

}
