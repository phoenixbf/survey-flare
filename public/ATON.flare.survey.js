/*
    ATON Survey Addon

    author: bruno.fanini_AT_gmail.com

===========================================================*/
let F = new ATON.Flare();

F._currOp = undefined;

// Mode
F.resetMode = ()=>{
    F._currOp = undefined;
    $("#btn-measure").removeClass("atonBTN-rec");
};

F.setMode = (m)=>{
    F._currOp = m;

    if (m === "measuring") $("#btn-measure").addClass("atonBTN-rec");
};

// UI
F.UI = {};

F.UI.addButtonMeasure = (idcontainer)=>{
    ATON.FE.uiAddButton(idcontainer, "measure", ()=>{
        if (F._currOp !== "measuring"){
            F.setMode("measuring");
        }
        else {
            F.resetMode();
        }

    }, "Measure");
};

F.UI.registerProfile = ()=>{
    ATON.FE.uiAddProfile("survey", ()=>{
        $("#idTopToolbar").html(""); // clear

        ATON.FE.uiAddButtonUser("idTopToolbar");

        F.UI.addButtonMeasure("idTopToolbar");

        ATON.FE.uiAddButtonVR("idTopToolbar");
        ATON.FE.uiAddButtonScreenshot("idTopToolbar");
    });
};

F.setupEvents = ()=>{
    ATON.on("Tap", (e)=>{
        if (F._currOp === "measuring"){
            let P = ATON.getSceneQueriedPoint();
            let M = ATON.SUI.addMeasurementPoint( P );
        }
    });

    ATON.on("AllNodeRequestsCompleted",()=>{
        F.setupScene();
    });

    ATON.on("TileLoaded", s =>{
        F.setupScene(s);
    });
};

F.sceneVisitor = (o)=>{
    if ( o.material ){
        o.material.clippingPlanes   = F.clipPlanes;
        o.material.clipIntersection = true;
        o.material.clipShadows      = true;
    }
};

F.setupScene = (s)=>{
    if (s) s.traverse( F.sceneVisitor );
    else ATON.getRootScene().traverse( F.sceneVisitor );
};


// Main setup
//======================================
F.setup = ()=>{
    F.setupEvents();

    F.UI.registerProfile();

    F.clipPlanes = [
        //new THREE.Plane( new THREE.Vector3( 0, -1, 0 ), 2.0 ),
        //new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 0.0 )
    ];

    ATON._renderer.localClippingEnabled = true;

    F.log("Initialized");
};


// Update
F.update = ()=>{
};




// Register
F.register("Survey");