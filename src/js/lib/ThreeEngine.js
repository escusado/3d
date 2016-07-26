'use strict';

class ThreeEngine extends NanoCustomEventSupport {
  constructor(conf){
    super(conf);

    Object.assign(this, conf);

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      antialias:true
    });

    this.element = this.renderer.domElement;
  };

  setup () {
    this.time = 0;

    this.renderer.setClearColor(0x000000, 1);
    // this.renderer.autoClear = false;
    // this.renderer.context.getExtension("EXT_frag_depth");

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

            let axis = new THREE.Line( geom, mat, THREE.LinePieces );

            return axis;

    };

    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z

    return axes;
  }

};
