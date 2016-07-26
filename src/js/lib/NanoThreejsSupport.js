'use strict';

class NanoThreejsWidget extends includes(NanoCustomEventSupport, NanoNodeSupport) {
  constructor (conf) {
    super();

    let _defaults = {
      element : new THREE.Object3D(),
      active : false,
      disabled : false,
      __destroyed : false
    };

    Object.assign(_defaults, conf);
    Object.assign(this, _defaults);

    if (!this.element) {
      this.element = this._getElement();
    }

    this.element.position.x = 0;
    this.element.position.y = 0;
    this.element.position.z = 0;

  }

  _getElement () {
    return new THREE.Object3D();
  }

  render (element) {
    if (this.__destroyed === true) {
      console.warn('calling on destroyed object');
    }
    this.dispatch('beforeRender', { element });
    this._render(element);
    this.dispatch('render');
    return this;
  }

  _render (element) {
    this.element.add(element);
    return this;
  }

  take (element) {
    if (this.__destroyed === true) {
      console.warn('calling on destroyed object');
    }
    this.dispatch('beforeTake', { element });
    this._take(element);
    this.dispatch('take');
    return this;
  }

  _take (element) {
    this.element.remove(element);
    return this;
  }

  activate () {
    if (this.__destroyed) {
        console.warn('calling on destroyed object');
    }
    this.dispatch('beforeActivate');
    this._activate();
    this.dispatch('activate');
    return this;
  }

  _activate() {
    this.active = true;
    this.element.userData.active = true;
    return this;
  }

  deactivate() {
    if (this.__destroyed) {
        console.warn('calling on destroyed object');
    }
    this.dispatch('beforeDeactivate');
    this._deactivate();
    this.dispatch('deactivate');
    return this;
  }

  _deactivate() {
    this.active = false;
    this.element.userData.active = false;
  }

  enable() {
    if (this.__destroyed) {
        console.warn('calling on destroyed object');
    }
    this.dispatch('beforeEnable');
    this._enable();
    this.dispatch('enable');
    return this;
  }

  _enable() {
    this.disabled = false;
    this.element.userData.disabled = false;
  }

  disable() {
    if (this.__destroyed) {
        console.warn('calling on destroyed object');
    }
    this.dispatch('beforeDisable');
    this._disable();
    this.dispatch('disable');
    return this;
  }

  _disable() {
    this.disabled = true;
    this.element.userData.disabled = true;
  }

  destroy () {
    if (this.__destroyed) {
        console.warn('calling on destroyed object');
    }
    this.dispatch('beforeDestroy');
    this._destroy();
    this.dispatch('destroy');
    return null;
  }

  _destroy () {
    this.destroyElement();
    this.destroyChildren();
    if (this.parent) {
        this.parent.removeChild(this);
    }
    this.unbindAll();
    this.__destroyed = true;
  }

  destroyElement () {
    this.dispatch('beforeDestroyElement');
    this._destroyElement();
    this.dispatch('destroyElement');
  }

  _destroyElement () {
    if (this.element) {
      if (this.element.parent) {
        this.element.parent.remove(this.element);
      }
    }
    this.element = null;
    return this;
  }
}
