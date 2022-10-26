//socket connection
let socket = io();

let r;
let g;
let b;
let size;

//connect socket client 
socket.on('connect', () => {
    console.log("client connected")
});

//listen for data from server
socket.on('mouseDrawData', (data) => {
    
    console.log("mouse data from server", data);

    //render drawing data from source to ALL CANVASES
    drawObj(data);
})

//p5 code

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255);

    r = random(255);
    g = random(255);
    b = random(255);
    size = random(50);
}

function mouseMoved(){
    
    //save mouse coords into obj
    let mousePos = {
        x: mouseX,
        y: mouseY,
        r: r,
        g: g,
        b: b,
        size: size
    }

    //emit data to server, using custom data event name
    socket.emit('mouseDrawData', mousePos);
    
}

//draw helper function
function drawObj(obj){
    //noStroke();
    fill(obj.r, obj.g, obj.b);
    ellipse(obj.x, obj.y, obj.size);
}
