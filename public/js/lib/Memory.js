/*
 * Created by jimmybengtsson
 */

function Memory(rows, cols, imgUrl) {

    let appTitle = 'Memory';

    // The memory. Same as in the excercise.

    function MemoryDiv(rows, cols) {

        let i;
        let a;
        let tiles = [];
        let turn1;
        let turn2;
        let lastTile;
        let pair = 0;
        let tries = 0;

        tiles = getPictureArray(rows, cols);

        let clone = document.querySelector('#memorydiv');
        let container = document.importNode(clone.content);

        let template = document.querySelectorAll('#memorydiv')[0].content.firstElementChild;

        tiles.forEach(function (tile, index) {

            a = document.importNode(template, true);

            container.appendChild(a);

            a.addEventListener('click', function (event) {
                let img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild;

                turnBrick(tile, index, img);


            });

            if ((index + 1) % cols === 0) {
                container.appendChild(document.createElement('br'));
            }

        });

        function turnBrick(tile, index, img) {

            if (turn2) {
                return;
            }

            img.src = 'image/' + tile + '.png';

            if (!turn1) {
                turn1 = img;
                lastTile = tile;

                return;

            } else {

                if (img === turn1) {
                    return;
                }

                tries += 1;

                turn2 = img;

                if (tile === lastTile) {
                    // Found pair!
                    pair += 1;

                    if (pair === (rows * cols) / 2) {

                        /*while (container.firstChild) {
                            container.removeChild(container.firstChild);
                        }

                        let pElement = document.createElement('p');
                        let gameText = document.createTextNode('Won on ' + tries + ' number of tries!');
                        pElement.appendChild(gameText);
                        container.appendChild(pElement);*/

                        console.log('Won on ' + tries + ' number of tries!');


                    }

                    window.setTimeout(function () {
                        turn1.parentNode.classList.add('removed');
                        turn2.parentNode.classList.add('removed');

                        turn1 = null;
                        turn2 = null;

                    }, 300);

                } else {

                    window.setTimeout(function () {
                        turn1.src = 'image/0.png';
                        turn2.src = 'image/0.png';


                        turn1 = null;
                        turn2 = null;


                    }, 500);
                }

            }
        }

        function getPictureArray(rows, cols) {

            let i;
            let arr = [];

            for (i = 1; i <= (rows * cols) / 2; i += 1) {
                arr.push(i);
                arr.push(i);
            }

            for (let i = arr.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }


            return arr;
        }

        return container;

    }

    NewWindow(MemoryDiv(rows, cols), imgUrl, appTitle);
}
