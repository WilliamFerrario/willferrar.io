const cursor = document.getElementById('custom-cursor');
const abouts = document.querySelectorAll('a');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});

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