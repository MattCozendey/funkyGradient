const CONFIG = {
    isDarkMode: false,
    lightRadius: 500,
    fibonnaci: [false, 8],
    inferno: [false, 18],
}
const gradientParentDiv = document.getElementById("spinnersParent");
const lightDiv = document.getElementById("light");

function getCoordinatesFrom(container){
    const containerAsShown = container.getBoundingClientRect();
    const OFFSET_LEFT = containerAsShown.left;
    const OFFSET_TOP = containerAsShown.top;
    const WIDTH = containerAsShown.width;
    const HEIGHT = containerAsShown.height;
    const CENTER_POINTS = {x: OFFSET_LEFT + (WIDTH/2), y: OFFSET_TOP + (HEIGHT / 2)};

    return {element: container, OFFSET_LEFT, OFFSET_TOP, WIDTH, CENTER_POINTS};
}
function getAngleFromCoordinates(vector1, vector2){
    const angleDeg = Math.atan2(vector2.y - vector1.y, vector2.x - vector1.x) * 180 / Math.PI;
    const angleAsInteger = Number.parseInt(angleDeg);

    return angleAsInteger;
}
function lightOn(){
    return document.getElementById("light").dataset.on === "true";
}
if(CONFIG.isDarkMode){
    const lightDiv = document.getElementById("light");
    lightDiv.dataset.on = "true";
}
    
document.addEventListener("mousemove", (e)=>{
    if(lightOn()){
        lightDiv.setAttribute("style",`
        position: absolute;
        left: ${e.clientX - (CONFIG.lightRadius/2)}px;
        top: ${e.clientY - (CONFIG.lightRadius/2)}px;
        background: radial-gradient(white, transparent 50%);
        width:${CONFIG.lightRadius}px;
        height:${CONFIG.lightRadius}px;
        border-radius: 75%;
        z-index: 0;`);
    }

    [].slice.call(gradientParentDiv.children).forEach((gradientContainer)=>{
        const CENTER_POINTS_OF_DIV = getCoordinatesFrom(gradientContainer).CENTER_POINTS;
        const CENTER_POINTS_OF_CURSOR = {x: e.clientX, y: e.clientY};
        const ANGLE_FROM_CENTERS = getAngleFromCoordinates(CENTER_POINTS_OF_DIV, CENTER_POINTS_OF_CURSOR);
        const WIDTH = gradientContainer.dataset.width;
        const HEIGHT = gradientContainer.dataset.height;
        const FIRST_COLOR  = gradientContainer.dataset.primary;
        const SECOND_COLOR = gradientContainer.dataset.secundary;
        const hasCounter  = gradientContainer.dataset.has_counter;
        const BORDER_RADIUS = gradientContainer.dataset.radius;

        gradientContainer.
        setAttribute("style",
        `background: linear-gradient(
        ${ANGLE_FROM_CENTERS - 90}deg,
        ${CONFIG.isDarkMode?"white":FIRST_COLOR},
        ${CONFIG.isDarkMode?"black":SECOND_COLOR}
        );
        width: ${WIDTH}px;
        height: ${HEIGHT}px;
        border-radius: ${BORDER_RADIUS};
        margin-bottom: 25px;
        `);

        if(hasCounter == "true"){
            gradientContainer.innerHTML = '';
            const counter = document.createElement("h1");
            counter.setAttribute("class", "noselect");
            counter.innerText = ANGLE_FROM_CENTERS + "º";
            gradientContainer.appendChild(counter);
        }
        
    }); 
});

function fibonacci(limit){
    let a = 1, b = 0, temp;
  
    while (limit >= 0){
      temp = a;
      a = a + b;
      b = temp;
      limit--;

      const newGradient = document.createElement("div");
      newGradient.setAttribute("class", "gradientSpin");
      newGradient.dataset.has_counter = "false";
      newGradient.dataset.width = b + "0";
      newGradient.dataset.height = b + "0";
      newGradient.dataset.primary="blue";
      newGradient.dataset.secundary="red";
      newGradient.dataset.radius= "50%";//b + "0%";

      gradientParentDiv.appendChild(newGradient);
    }
  }

if(CONFIG.fibonnaci[0]){
    while(gradientParentDiv.firstElementChild){
        gradientParentDiv.removeChild(gradientParentDiv.firstElementChild);
    }
fibonacci(CONFIG.fibonnaci[1]);
}
else if(CONFIG.inferno[0]){
    while(gradientParentDiv.firstElementChild){
        gradientParentDiv.removeChild(gradientParentDiv.firstElementChild);
    }

    for(let i=0; i < CONFIG.inferno[1]; i++){
        const newGradient = document.createElement("div");
        newGradient.setAttribute("class", "gradientSpin");
        newGradient.dataset.has_counter = "false";
        newGradient.dataset.width = "200";
        newGradient.dataset.height = "200";
        newGradient.dataset.primary="black";
        newGradient.dataset.secundary="red";
        newGradient.dataset.radius= "10px";

        gradientParentDiv.appendChild(newGradient);
    }
}