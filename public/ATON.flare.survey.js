/*
    ATON Survey Addon

    author: bruno.fanini_AT_gmail.com

===========================================================*/
window.addEventListener('load',() => {

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
};


// Main setup
//======================================
F.setup = ()=>{
    F.setupEvents();

    F.UI.registerProfile();

    F.log("Initialized");
};


// Update
F.update = ()=>{
};




// Register
F.register("Survey");
});