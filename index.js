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
    let peaks = [];

    function findPeaks() {
        let peak = 475 - y;
        peaks.push(peak);

        const id = setInterval(populate, 200);
        function populate() {
            peak *= 0.8;
            peaks.push(peak.toFixed(2));
            if(peaks.length > 15) {
                clearInterval(id);
                const adjusted = peaks.filter(a => a > 31);
            }
        }
    }

    findPeaks();
});

console.log('Linked!')