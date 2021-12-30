document.getElementById('container').addEventListener('mousedown', function (e) {
    // Get the target
    const target = e.target;

    // Get the bounding rectangle of target
    const rect = target.getBoundingClientRect();
    

    // Mouse position
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top; //470 is limit

    //Define boundaries
    if(x < 15) x = 15;
    if(x > 487) x = 487;

    //Display coordinates
    let coordiantes = document.createTextNode(`X: ${x}, Y: ${472 -y}`)
    let display = document.getElementsByTagName('p')[0];
    let x_yPlaceHolder = display.firstChild;
    display.replaceChild(coordiantes, x_yPlaceHolder);

    //Relocate Ball
    let ball = document.getElementById('ball');
    ball.style.top = `${y}px`;    
    ball.style.left = `${x - 16}px`;    
    
    //Find Peaks of Bounce
    let peaks = []; //height from top of ball to bottom axis
    let initPeak = 470 - y; 
    peaks.push(initPeak);
    for(let i = 0; i < 25; i++) {
        initPeak *= 0.8;
        peaks.push(initPeak.toFixed(2));
    }

    //Find corresponding fall time | Gravity = 4;
    let fallTimes = []
    let gravity = 8;

    for(let i = 0; i < peaks.length; i++) {
        let height = peaks[i];
        let fallTime = Math.sqrt((height * 2)/ gravity);

        fallTimes.push(fallTime.toFixed(2));
    }
    let adjustedPeaks = peaks.map(a => 470 - a); //height from top of ball to top axis

    //Run fall animation
    const id = setInterval(animation, 5)

    let cycle = 0;
    let peakHeight = adjustedPeaks[0];  
    let fallTime = fallTimes[cycle];
    let currentHeight = 0;
    let currentFallDst = 0;
    let currentTime = 0;
    let falling = true;

    function animation() {

        //Drop
        if(falling === true) {
            currentTime += 0.1;
            currentFallDst = 0.5 * gravity * (currentTime ** 2);
            currentHeight = peakHeight + currentFallDst; //Greater height = closer to floor.
            
            if(currentHeight >= 470) {
                falling = false;
                cycle++;
                peakHeight = adjustedPeaks[cycle];
                fallTime = fallTimes[cycle];
                ball.style.top = `${470}px`;
            
            } else {
                ball.style.top = `${currentHeight}px`;
            }
        }
        
        //Rebound
        if(falling === false) {
            currentTime -= 0.1;
            currentFallDst = 0.5 * gravity * (currentTime **2);
            currentHeight = peakHeight + currentFallDst; //Greater height = closer to floor.

            if(currentHeight > 470) currentHeight = 470;
            
            if(currentTime <= 0) {
                falling = true;
                ball.style.top = `${peakHeight}px`;
                
            } else {
                ball.style.top = `${currentHeight}px`;
            }
        }
    }

});