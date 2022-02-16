const viewer = new Cesium.Viewer("cesiumContainer", {
    baseLayerPicker: false,
  });
  
  const imageryLayers = viewer.imageryLayers;
  
  const viewModel = {
    angle: 0
  };
  
  Cesium.knockout.track(viewModel);
  
  viewer.scene.globe.depthTestAgainstTerrain = true;
  const conePosition = Cesium.Cartesian3.fromDegrees(-105.0, 40.0, 100000.0);
  const coneHeight = 1000000.0;
  var angle = 0;
  var coneOrientation = Cesium.Transforms.headingPitchRollQuaternion(
    conePosition,
    new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0.0),
                               Cesium.Math.toRadians(0.0),
                               Cesium.Math.toRadians(angle)));
  
  var offset = new Cesium.Cartesian3(0,0,0);
  
  var enuTransform = Cesium.Transforms.eastNorthUpToFixedFrame(conePosition);
  
  Cesium.Matrix4.multiplyByPointAsVector(enuTransform, offset, offset);
  
  Cesium.Cartesian3.add(conePosition, offset, conePosition);
  
  const redCone = viewer.entities.add({
    name: "Red cone",
    orientation: coneOrientation,
    position: conePosition,
    cylinder: {
      length: coneHeight,
      topRadius: 0.0,
      bottomRadius: 200000.0,
      material: new Cesium.Color(0,1,1,0.5),
    },
  });
  //Bind the viewModel to the DOM elements of the UI that call for it.
  const toolbar = document.getElementById("toolbar");
  Cesium.knockout.applyBindings(viewModel, toolbar);
  
  Cesium.knockout
    .getObservable(viewModel, "angle")
    .subscribe(function (baseLayer) {
      Cesium.knockout.getObservable(viewModel, 'angle').subscribe(
          function(newValue) {
              angle = angle;
          }
      );
      var angle = viewModel.angle;
  
    });
  
  viewer.zoomTo(viewer.entities);
  