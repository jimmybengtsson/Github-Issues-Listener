'use strict';

// Select the li elements for icons.

let memoryIcon = document.querySelector('#memory');
let webcamIcon = document.querySelector('#webcamicon');

document.body.background = "image/Background.jpg";
let memoryImg = memoryIcon.querySelector('img');
memoryImg.src = "image/Memoryicon.png";
let webcamImg = webcamIcon.querySelector('img');
webcamImg.src = "image/Webcamicon.png";

let dropDown = document.querySelector('.ulMemory');

// Change img when hover over icons so you can see the app-name.

memoryImg.addEventListener('mouseover', function() {

    memoryImg.src = "image/Memoryiconhover.png";
    memoryImg.style.cursor = "pointer";

});

memoryImg.addEventListener('mouseout', function() {

    memoryImg.src = "image/Memoryicon.png";

});

webcamImg.addEventListener('mouseover', function() {

    webcamImg.src = "image/Webcamiconhover.png";
    webcamImg.style.cursor = "pointer";
});

webcamImg.addEventListener('mouseout', function() {

    webcamImg.src = "image/Webcamicon.png";
});

// Event listeners when click icons. img.src for the icon in window.

webcamIcon.addEventListener('click', function() {

    WebCam(webcamImg.src);

});

memoryIcon.addEventListener('click', function() {

    if (dropDown.style.visibility === 'visible') {
        dropDown.style.visibility = 'hidden';
    } else {
        dropDown.style.visibility = 'visible';
    }
});

dropDown.addEventListener('click', function(e) {

    Memory(e.target.name, e.target.value, memoryImg.src);
    dropDown.style.visibility = 'hidden';


});

// Clock

window.addEventListener('load', function() {

    Clock();
});
