"use strict";

let socket = io();

// Get all the open issues from repo.

socket.on('allIssues', function(issues) {

    console.log(issues);

    issues.forEach((i) => {

        getIssues(i);

    });

});

// Get a new opened or closed issue.

socket.on('newIssue', function(data) {

    issueNotification(data);
    issueFromHook(data);
});

// Function to list all the open issues from repo

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

    // Get info from the sockets response

    author.textContent = issue.sender.login + ' ' + issue.action + ' an issue!';
    title.textContent = 'Title: ' + issue.issue.title;
    text.textContent = 'Message: ' + issue.issue.body;
    img.src = issue.sender.avatar_url;
    issueLink.setAttribute('href', issue.issue.html_url);

    if (issue.action === 'opened' || issue.action === 'reopened') {
        issueDiv.className = 'issueDivAlt';
    }

    // Add to DOM

    issueDiv.appendChild(img);
    issueDiv.appendChild(author);

    issueLi.appendChild(issueDiv);
    issueLi.appendChild(title);
    issueLi.appendChild(text);
    issueLi.appendChild(issueLink);

    ulList.insertBefore(issueLi, ulList.childNodes[0]);
}

// Function to list a new issue from repo

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

    // Get info from the socket

    author.textContent = 'Created by: ' + issue.user.login;
    author.style.color = '#FF0208';
    title.textContent = 'Title: ' + issue.title;
    text.textContent = 'Message: ' + issue.body;
    img.src = issue.user.avatar_url;
    issueLink.setAttribute('href', issue.html_url);

    // Add to DOM

    issueDiv.appendChild(img);
    issueDiv.appendChild(author);

    issueLi.appendChild(issueDiv);
    issueLi.appendChild(title);
    issueLi.appendChild(text);
    issueLi.appendChild(issueLink);

    ulList.appendChild(issueLi);
}

// Notification when a issue is opened or closed.

function issueNotification(issue) {

    let template = document.querySelector('.notification');
    let clone = document.importNode(template.content, true);
    let dropZone = document.querySelector('.dropzone');
    let notiDiv = clone.querySelector('.issueNotification');
    let author = clone.querySelector('.issueAuthor');
    let img = clone.querySelector('.issueImg');

    // Get info from socket

    author.textContent = issue.sender.login + ' ' + issue.action + ' an issue!';
    img.src = issue.sender.avatar_url;

    if (issue.action === 'opened' || issue.action === 'reopened') {
        author.style.color = '#FF0208';
    }

    // Add to DOM....

    notiDiv.appendChild(img);
    notiDiv.appendChild(author);

    dropZone.appendChild(notiDiv);

    // ....for 5 seconds!

    setTimeout(function(){
        dropZone.removeChild(notiDiv);
    }, 5000);

}

