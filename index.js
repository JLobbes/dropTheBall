document.getElementById('container').addEventListener('mousedown', function (e) {
    // Get the target
    const target = e.target;

    // Get the bounding rectangle of target
    const rect = target.getBoundingClientRect();
    

    // Mouse position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    //Display coordinates
    let coordiantes = document.createTextNode(`X: ${x}, Y: ${y}`)
    let display = document.getElementsByTagName('p')[0];
    let x_yPlaceHolder = display.firstChild;
    display.replaceChild(coordiantes, x_yPlaceHolder);

    //Relocate Ball
    let ball = document.getElementById('ball');
    ball.style.top = `${y}px`;    
    ball.style.left = `${x}px`;    
    
    //Drop Ball
    setInterval(drop, 40);
    let time = 0;
    let distFallen = 0;
    let dropping = true;
    let maxHeight = y;
    
    function drop() {
        
        if(dropping === true) {
            time++;
            distFallen = 0.5 * (4) * (time * time);
            if(y + distFallen >= 506) {
                ball.style.top = `${506}px`;
                dropping = false;
            } else {
                ball.style.top = `${y + distFallen}px`;
            }
        }

        if(dropping === false) {
            time--;
            distFallen = 0.5 * (-4) * (time * time);
            if(y - distFallen <= maxHeight) {
                ball.style.top = `${maxHeight}px`;
                dropping = true;
            } else {
                ball.style.top = `${y - distFallen}px`;
            }
        }
        console.log(time);
    }
});

console.log('Linked!')