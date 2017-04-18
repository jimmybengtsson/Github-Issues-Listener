let socket = io();

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
    return createNewIssueDiv(data);
});

function createNewIssueDiv(issue) {

    let ulList = document.querySelector('.ulClass');

    let template = document.querySelector('.issueTemplate');
    let clone = document.importNode(template.content, true);
    let issueLi = clone.querySelector('.issueLi');
    let issueDiv = clone.querySelector('.issueDiv');
    let author = clone.querySelector('.issueAuthor');
    let title = clone.querySelector('.issueTitle');
    let text = clone.querySelector('.issueText');

    author.textContent = issue.issue.user.login + ' ' + issue.action + ' an issue!';
    title.textContent = issue.issue.title;
    text.textContent = issue.issue.body;

    if (issue.action === 'opened' || issue.action === 'reopened') {
        author.style.color = '#FF0208';
    }

    issueDiv.appendChild(author);
    issueDiv.appendChild(title);
    issueDiv.appendChild(text);

    issueLi.appendChild(issueDiv);
    ulList.appendChild(issueLi);
}

