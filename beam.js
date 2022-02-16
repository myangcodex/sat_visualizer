const viewer = new Cesium.Viewer("cesiumContainer");
viewer.scene.globe.depthTestAgainstTerrain = true;
const conePosition = Cesium.Cartesian3.fromDegrees(-105.0, 40.0, 100000.0);
const coneHeight = 1000000.0;

var coneOrientation = Cesium.Transforms.headingPitchRollQuaternion(
  conePosition,
  new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0.0),
                             Cesium.Math.toRadians(0.0),
                             Cesium.Math.toRadians(15.0)));

const redEllipse = viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(-105.0, 40.0),
  name: "Red ellipse on surface",
  ellipse: {
    semiMinorAxis: 250000.0,
    semiMajorAxis: 250000.0,
    material: Cesium.Color.RED.withAlpha(0.5),
  },
});

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

viewer.zoomTo(viewer.entities);