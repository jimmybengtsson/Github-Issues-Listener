let socket = io.connect();

let ulList = document.querySelector('.ulClass');
let liList = document.createElement('li');

socket.on('allIssues', function(issues) {

    /*for (let i in issues) {
        ulList.appendChild(createNewIssueDiv(issues[i]));
        console.log(ulList);

    }*/
    //issues.forEach((i) => {

        console.log(issues + 'getissues');
    //});
});

socket.on('newIssue', function(data) {
    console.log(data + 'new');
});

function createNewIssueDiv(issue) {

    let text = document.createTextNode(issue);
        let el = document.createElement('li');
       let messages = document.getElementById('messages');
    el.appendChild(text);
    messages.appendChild(el);
}

