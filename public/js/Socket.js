let socket = io.connect();

let ulList = document.querySelector('.ulClass');
let liList = document.createElement('li');

socket.on('FetchGithub', function(issues) {

    /*for (let i in issues) {
        ulList.appendChild(createNewIssueDiv(issues[i]));
        console.log(ulList);

    }*/
    issues.forEach((i) => {

        console.log(i);
    });
});

socket.on('opened', function(data) {
    console.log(data);
});

socket.on('reopened', function(data) {
    console.log(data);
});

socket.on('closed', function(data) {
    console.log(data);
});

function createNewIssueDiv(issue) {

    let text = document.createTextNode(issue);
        let el = document.createElement('li');
       let messages = document.getElementById('messages');
    el.appendChild(text);
    messages.appendChild(el);
}

