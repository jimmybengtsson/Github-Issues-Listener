"use strict";

let socket = io();

socket.on('allIssues', function(issues) {

    console.log(issues);

    issues.forEach((i) => {

        getIssues(i);

    });

});

socket.on('newIssue', function(data) {

    issueNotification(data);
    issueFromHook(data);
});

function issueFromHook(issue) {

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

    author.textContent = issue.sender.login + ' ' + issue.action + ' an issue!';
    title.textContent = 'Title: ' + issue.issue.title;
    text.textContent = 'Message: ' + issue.issue.body;
    img.src = issue.sender.avatar_url;
    issueLink.setAttribute('href', issue.issue.html_url);

    if (issue.action === 'opened' || issue.action === 'reopened') {
        author.style.color = '#FF0208';
    }

    issueDiv.appendChild(img);
    issueDiv.appendChild(author);

    issueLi.appendChild(issueDiv);
    issueLi.appendChild(title);
    issueLi.appendChild(text);
    issueLi.appendChild(issueLink);

    ulList.insertBefore(issueLi, ulList.childNodes[0]);
}

function getIssues(issue) {

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

    author.textContent = 'Created by: ' + issue.user.login;
    author.style.color = '#FF0208';
    title.textContent = 'Title: ' + issue.title;
    text.textContent = 'Message: ' + issue.body;
    img.src = issue.user.avatar_url;
    issueLink.setAttribute('href', issue.html_url);

    issueDiv.appendChild(img);
    issueDiv.appendChild(author);

    issueLi.appendChild(issueDiv);
    issueLi.appendChild(title);
    issueLi.appendChild(text);
    issueLi.appendChild(issueLink);

    ulList.appendChild(issueLi);
}

function issueNotification(issue) {

    let template = document.querySelector('.notification');
    let clone = document.importNode(template.content, true);
    let dropZone = document.querySelector('.dropzone');
    let notiDiv = clone.querySelector('.issueNotification');
    let author = clone.querySelector('.issueAuthor');
    let img = clone.querySelector('.issueImg');

    author.textContent = issue.sender.login + ' ' + issue.action + ' an issue!';
    img.src = issue.sender.avatar_url;

    if (issue.action === 'opened' || issue.action === 'reopened') {
        author.style.color = '#FF0208';
    }

    notiDiv.appendChild(img);
    notiDiv.appendChild(author);

    dropZone.appendChild(notiDiv);

    setTimeout(function(){
        dropZone.removeChild(notiDiv);
    }, 5000);

}

