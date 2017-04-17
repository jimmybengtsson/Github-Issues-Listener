/*
 * Created by jimmybengtsson
 */

function WebCam(imgUrl) {

    // Get template and append.

    let appTitle = 'WebCam';
    let template = document.querySelector('#webcam');
    let clone = document.importNode(template.content, true);

    let webCamDiv = clone.querySelector('#webcamDiv');
    let webCam = webCamDiv.querySelector('#videoElement');
    let canvas = webCamDiv.querySelector('canvas');
    let photoButton = webCamDiv.querySelector('#takephoto');
    let photoContainer = webCamDiv.querySelector('#photoContainer');

    // Different apis depending on browser.

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, webcamVideo, videoError);
    }

    // Get the webcam stream

    function webcamVideo(stream) {
        webCam.src = window.URL.createObjectURL(stream);
    }

    function videoError(e) {

    }

    // Play sound when taking photo.

    function playSound() {
        document.getElementById('shutteraudio').play();
    }

    // Take a photo. And append it to the photo container.

    photoButton.addEventListener('click', function() {

        playSound();

        canvas.getContext("2d").drawImage(webCam, 0, 0, 300, 220);
        let img = canvas.toDataURL("image/png");
        let imgElement = document.createElement('img');
        let aElement = document.createElement('a');
        imgElement.setAttribute('src', img);
        aElement.appendChild(imgElement);
        photoContainer.appendChild(aElement);

        let template = photoContainer.querySelectorAll('a');

        if (template.length % 5 === 0) {
            photoContainer.appendChild(document.createElement('br'));
        }




        /*photoArr.push(img);
        let photoToJson = JSON.stringify(photoArr);

        localStorage.setItem('photos', photoToJson);*/

    });

    NewWindow(webCamDiv, imgUrl, appTitle);
}
