const cursor = document.getElementById('custom-cursor');
const abouts = document.querySelectorAll('a');
const canvas = document.getElementById('noiseCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function generateNoise(ctx) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const idata = ctx.createImageData(w, h);
    const buffer32 = new Uint32Array(idata.data.buffer);
    const len = buffer32.length;

    for (let i = 0; i < len; i++) {
        if (Math.random() < 0.4) {
            buffer32[i] = 0xff212121;  // Black
        } else {
            buffer32[i] = 0xff242424;  // Dark gray
        }
    }
    ctx.putImageData(idata, 0, 0);
}

function loop() {
    generateNoise(ctx);
}

setInterval(loop, 120);  // Update every 150 milliseconds (half a second)

// Event to handle window resize
window.addEventListener('resize', resizeCanvas);

// Initial setup
resizeCanvas();

// ---------mouse positioning and custom cursor movements-----------
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let velocityX = 0, velocityY = 0;
const drag = 0.2;
const strength = 0.05;


document.addEventListener('mousemove', (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

function animate() {
    let accelX = (mouseX - cursorX) * strength;
    let accelY = (mouseY - cursorY) * strength;

    velocityX += accelX;
    velocityY += accelY;
    velocityX *= (1 - drag);
    velocityY *= (1 - drag);

    cursorX += velocityX;
    cursorY += velocityY;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

//--------------------------------------------------------------------

document.addEventListener('mouseenter', () => {
    cursor.style.display = 'block'; 
});

document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
});


//hovering over link
abouts.forEach(abouts => {
    abouts.addEventListener('mouseenter', () => {
        cursor.style.display = 'none';
    });

    abouts.addEventListener('mouseleave', () => {
        cursor.style.display = 'block';
    });
});