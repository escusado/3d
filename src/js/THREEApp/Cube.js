'use strict'

class Cube extends NanoThreejsWidget {
  constructor (conf) {
    super(conf);

    this.object = new THREE.Mesh( new THREE.CubeGeometry( this.size, this.size, this.size ), new THREE.MeshNormalMaterial() );

    this.object.position.set(0, 0, 0);

    this.element.add(this.object);
  }
}
