/*
 * Created by jimmybengtsson
 */


function NewWindow(divCopy, imgUrl, appTitle) {

    // Select the elements from templates etc...

    let divClone = divCopy;

    let dropZone = document.querySelector('.dropzone');
    let template = document.querySelector('.dragwindow');

    let clone = document.importNode(template.content, true);
    let classClone = clone.querySelector('.windowdiv');
    let appClone = clone.querySelector('.appdiv');
    dropZone.appendChild(classClone);

    let titleDiv = classClone.querySelector('.appTitle');
    titleDiv.textContent = appTitle;
    let x = classClone.querySelector('.closewindow');
    x.src = imgUrl;

    // Append to index.

    classClone.appendChild(titleDiv);
    classClone.appendChild(x);
    classClone.appendChild(appClone);
    appClone.appendChild(divClone);

    // Handle drag and drop

    let mousePosition;
    let offset = [0,0];
    let isDown = false;

    // Start move

    classClone.addEventListener('mousedown', function(e) {

        // Append when clicking so it gets focus.

        dropZone.appendChild(classClone);
        isDown = true;
        offset = [
            classClone.offsetLeft - e.clientX,
            classClone.offsetTop - e.clientY
        ];
    }, true);

    // End move.

    document.addEventListener('mouseup', function() {
        isDown = false;
    }, true);

    // When moving

    document.addEventListener('mousemove', function(event) {
        event.preventDefault();
        if (isDown) {
            mousePosition = {

                x : event.clientX,
                y : event.clientY

            };
            classClone.style.left = (mousePosition.x + offset[0]) + 'px';
            classClone.style.top  = (mousePosition.y + offset[1]) + 'px';
        }
    }, true);

    // Close window.

    x.addEventListener('click', function(){

        event.preventDefault();

        dropZone.removeChild(classClone);


    });


    return classClone;

}




module.exports = NewWindow;


