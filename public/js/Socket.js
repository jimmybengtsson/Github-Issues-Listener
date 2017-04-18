let socket = io();

let ulList = document.querySelector('.ulClass');
let liList = document.createElement('li');

socket.on('allIssues', function(issues) {

    console.log('All issue on');

    /*for (let i in issues) {
        ulList.appendChild(createNewIssueDiv(issues[i]));
        console.log(ulList);

    }*/
    //issues.forEach((i) => {

        console.log(issues);
    //});
});

socket.on('newIssue', function(data) {
    console.log('new issue on');
    console.log(data);
});

function createNewIssueDiv(issue) {

    let text = document.createTextNode(issue);
        let el = document.createElement('li');
       let messages = document.getElementById('messages');
    el.appendChild(text);
    messages.appendChild(el);
}

