'use strict';

class ThreeEngine extends NanoCustomEventSupport {
  constructor(conf){
    super(conf);

    Object.assign(this, conf);

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      antialias:true,
      alpha: true
    });
    this.renderer.setClearColor(0x333333, 1);
    this.element = this.renderer.domElement;
  };

  setup () {
    this.time = 0;
    if(this.debugAxis){
      this.scene.add(this._buildAxes(3000));
    }

    this.camera.position.z = 100;
    this.camera.position.y = 100;
    this.camera.position.x = 50;
  }

  resize (newSize) {
    this.camera.aspect = newSize.w / newSize.h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(newSize.w, newSize.h);
  }

  update () {
    let now = new Date().getTime(),
        updateData = {
            now: now,
            delta: now - (this.time || now)
        };

    this.time = now;

    this.dispatch('update', {
      data : updateData
    });

    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.update.bind(this));
  }

  _buildAxes (length) {
    let buildAxis, axes;

    axes = new THREE.Object3D();

    buildAxis = function buildAxis( src, dst, colorHex, dashed ) {
            let geom = new THREE.Geometry(),
                mat;

            if(dashed) {
                    mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
            } else {
                    mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
            }

            geom.vertices.push( src.clone() );
            geom.vertices.push( dst.clone() );
            geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

            let axis = new THREE.Line( geom, mat, THREE.LineSegments );

            return axis;

    };

    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF4500, false ) ); // +X
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0x982C00, true) ); // -X
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x64FF12, false ) ); // +Y
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x40A80C, true ) ); // -Y
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x69AAFF, false ) ); // +Z
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x375885, true ) ); // -Z

    return axes;
  }

};
