document.getElementById('container').addEventListener('mousedown', function (e) {
    // Get the target
    const target = e.target;

    // Get the bounding rectangle of target
    const rect = target.getBoundingClientRect();
    

    // Mouse position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    //Display coordinates
    let coordiantes = document.createTextNode(`X: ${x}, Y: ${506 - y}`)
    let display = document.getElementsByTagName('p')[0];
    let x_yPlaceHolder = display.firstChild;
    display.replaceChild(coordiantes, x_yPlaceHolder);

    //Relocate Ball
    let ball = document.getElementById('ball');
    ball.style.top = `${y - 31}px`;    
    ball.style.left = `${x - 15.5}px`;    
    
    //Drop Ball
    setInterval(drop, 40);
    let maxHeight = y;
    let height = y;
    let velocity = 1;
    let speed = 0;
    let falling = true;
    
    function drop() {
        if(falling === true) {
            height += speed;
            speed += velocity;
            if(height >= (506)) {
                falling = false;
                maxHeight *= 1.15;
                speed;
                height = 506;
            }
        }
        
        ball.style.top = `${height - 31}px`;
        
        if(falling === false) {
            height -= speed;
            speed -= velocity;
            if(height <= maxHeight) {
                falling = true;
                speed = 0;
            }
        }
        
        ball.style.top = `${height - 31}px`;
        
        console.log('height:', height, 'speed:', speed)
        console.log('maxHeight:', maxHeight, 'falling:', falling)

    }
    //added comment
});

console.log('Linked!')