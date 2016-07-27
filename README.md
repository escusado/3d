# 3d
![ThreeApp](http://i.imgur.com/jleq1RJ.gif)


This repo is an experiment used as a demo for the talks @gdl_js. It proposes a Three.js app structure using [`NanoWidget`](https://github.com/escusado/nano-widget) implementation of the [`Widget`](https://github.com/azendal/neon) pattern.

## Video
https://youtu.be/MZQmJr0FmZs?t=1h9m39s

##Slides
https://docs.google.com/presentation/d/1bwAGiKeEwiZ82vfW7Bg5P9K5kQfDEWOa-xA_EmEYuYc/edit?usp=sharing

# NanoWidget based THREEjs Framework

The experiment lies on the way the framework is buit, we have a simple koa server to serve the js app located at `localhost:3000`

```bash
npm install
npm start
```

The `index.js` is the one that kickstarts the app, this will create a `window.Dispatcher` singleton and also instanciate, `setup()` and `render` the main app element.

Our main `app.js` will instanciate an `ThreeEngine` which by itself instanciates a `THREE.Camera`, `THREE.Scene` and a `THREE.Renderer` which offers a `domElement` as the rendering api. The main app will take this element and render it to the DOM. It will handle the `requestAnimationFrame` loop and `'update'` using a broadcast event using the global `Dispatcher`.

# NanoThreeWidget

The main experiment is to check if this API makes sense for simple component based apps, the [`Widget`](https://github.com/azendal/neon) pattern in theory can be applied to any rendereable components, this experiment tries to prove thats possible and keep being as easy to use as `Widget`.

## API

```
class NanoThreejsWidget extends includes(NanoCustomEventSupport, NanoNodeSupport) {
  //.element An empty 3DObject as a holder of Widget elements

  //Adds the inner element to the caller element
  render (element) {}

  //Removes and element from the caller element
  take (element) {}

  //Adds a custom UserData.active prop in the 3D object and sets it to true
  activate () {}
  
  //Adds a custom UserData.active prop in the 3D object and sets it to false
  deactivate() {}
  
  //Adds a custom UserData.disabled prop in the 3D object and sets it to false
  enable() {}
  
  //Adds a custom UserData.disabled prop in the 3D object and sets it to true
  disable() {}
  
  //Calls for element removal, and nullification
  destroy () {}
  
  //Remove element
  destroyElement () {}

  //Overideables private methods
  _getElement () {} //it should return an ".add eable" THREE object element
  _render (element) {}
  _take (element) {}
  _activate() {}
  _deactivate() {}
  _enable() {}
  _disable() {}
  _destroy () {}
  _destroyElement () {}
}
```

And has the `NanoNodeSupport` and `NanoEventSupport` Api ready to use for hierarchy and event handling.

Finally it instanciates the main "3D" app, 
