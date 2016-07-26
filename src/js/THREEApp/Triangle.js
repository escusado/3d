'use strict'

class Triangle extends NanoThreejsWidget {
  constructor (conf) {
    super(conf);

    let triangleMaterial;

    this.geometry = new THREE.Geometry();

    this.vertex = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(conf.size, 0, 0),
      new THREE.Vector3(conf.size, conf.size, 0)
    ];

    this.geometry.vertices.push(this.vertex[0]);
    this.geometry.vertices.push(this.vertex[1]);
    this.geometry.vertices.push(this.vertex[2]);

    this.geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

    triangleMaterial = new THREE.MeshBasicMaterial({
                         color:0xFFFFFF,
                         side:THREE.DoubleSide
                     });

    this.object = new THREE.Mesh( this.geometry, triangleMaterial );
    this.object.position.set(0, 0, 0);

    this.element.add(this.object);
  }
}
