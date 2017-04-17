let socket = io();

let ulList = document.querySelector('.ulClass');
let liList = document.createElement('li');

socket.on('getAllIssues', function(issues) {

    for (let i in issues) {
        ulList.appendChild(createNewIssueDiv(issues[i]));
        console.log(ulList);
    }
});

function createNewIssueDiv(issue) {

    let text = document.createTextNode(issue);
        let el = document.createElement('li');
       let messages = document.getElementById('messages');
    el.appendChild(text);
    messages.appendChild(el);
}

