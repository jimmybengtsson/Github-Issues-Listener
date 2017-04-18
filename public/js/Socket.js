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
    let img = clone.querySelector('.issueImg');
    let issueLink = clone.querySelector('.issueLink');
    let commentsLink = clone.querySelector('.commentsLink');

    author.textContent = issue.sender.login + ' ' + issue.action + ' an issue!';
    title.textContent = issue.issue.title;
    text.textContent = issue.issue.body;
    img.src = issue.sender.avatar_url;
    issueLink.src = issue.issue.url;
    commentsLink.src = issue.issue.comments_url;

    if (issue.action === 'opened' || issue.action === 'reopened') {
        author.style.color = '#FF0208';
    }

    issueDiv.appendChild(img);
    issueDiv.appendChild(author);

    issueLi.appendChild(issueDiv);
    issueLi.appendChild(title);
    issueLi.appendChild(text);
    issueLi.appendChild(issueLink);
    issueLi.appendChild(commentsLink);

    ulList.insertBefore(issueLi, ulList.childNodes[0]);
}

