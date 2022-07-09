const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave")
const clearBtn = document.getElementById("jsClear")
canvas.width = 700;
canvas.height = 500;

function canvasInit() {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, 700,500);
}
canvasInit()
ctx.strokeStyle = "black";
ctx.lineWidth = 2.5;
let painting = false;
let filling = false;
function onMouseClick(event) {
    if (filling===true) {
        ctx.fillRect(0,0,700,500);
    }
}
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startPainting() {
    painting = true;
}
function stopPainting() {
    painting = false;
}

function changeColor(event) {
    if (filling===true){
        ctx.fillStyle = event.target.style.backgroundColor;
    } else {
        ctx.strokeStyle = event.target.style.backgroundColor;
    }
    event.target.style.boxShadow = "0 1px 10px green";
    setTimeout(() => event.target.style.boxShadow = "", 500);
    
}
function handleInputChange(event) {
    ctx.lineWidth = event.target.value;
}
function handleModeClick(event) {
    if (filling===true) {
        filling=false;
        mode.innerText = "fill";
        mode.style.backgroundColor = "white";
        
    } else {
        filling=true
        mode.innerText = "paint";
        mode.style.backgroundColor = "grey";
    }
}
function handleSaveClick(event) {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image; 
    link.download = "PaintJS[EXPORT]";
    link.click() // fake click
}
function handleContext(event) {
    event.preventDefault();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", onMouseClick);
    canvas.addEventListener("contextmenu", handleContext) // 우클릭 안돼게 하기위함
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor));
if(range){
    range.addEventListener("input", handleInputChange);
}
if(mode){
    mode.addEventListener("click", handleModeClick);
}
if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick)
}
if(clearBtn){
    clearBtn.addEventListener("click", canvasInit)
}