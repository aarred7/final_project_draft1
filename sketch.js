var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(120, 50, 8), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'chair1' shape.
    var chair1 = placeObject('./', 'chair1.obj',
    new BABYLON.Vector3(0, 0, 0), scene, 20,
    new BABYLON.Vector3(0, Math.PI, 0));
    
    //placing set of tables 
    var tables1 = placeObject('./', 'tables1.obj',
    new BABYLON.Vector3(36, 0, 0), scene, 20,
    new BABYLON.Vector3(0, -3.1, 0));
    

    //placing parametric table 
    var table2 = placeObject('./', 'table2.obj',
    new BABYLON.Vector3(46, 0, 0), scene, 20,
    new BABYLON.Vector3(0, -2.1, 0));
    


    // Move the sphere upward 1/2 its height
    //sphere.position.y = 1;



       //to move parametric table higher
       var move_table2 = {obj: table2, prop: 'position', 
       val: new BABYLON.Vector3(0, -3, 0), dims: ['x', 'y', 'z']};

     //create animation object to dim light
     var dim_light = {obj: light, prop: 'intensity', val: 0, dims: false};



    //create array of animations
    var animations = [];



       //add cylinder and light animations to array 
       animations.push(move_table2); 
       animations.push(dim_light);   



  //execute animations on canvas click
  document.getElementById('renderCanvas').addEventListener('click', 
  function() {
      animate(animations, scene, 4);
  });


    // Our built-in 'ground' shape.
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    return scene;
};
        window.initFunction = async function() {
            
            
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});