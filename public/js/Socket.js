"use strict";

let socket = io();

// Get all the open issues from repo.

socket.on('allIssues', function(issues) {


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
    let date = clone.querySelector('.issueDate');
    let comments = clone.querySelector('.issueComments');
    let img = clone.querySelector('.issueImg');
    let issueLink = clone.querySelector('.issueLink');

    // Get info from the sockets response

    author.textContent = issue.body.sender.login + ' ' + issue.body.action + ' an issue!';
    title.textContent = 'Title: ' + issue.body.issue.title;
    text.textContent = 'Message: ' + issue.body.issue.body;
    comments.textContent = 'Comments: ' + issue.body.issue.comments;
    date.textContent = 'Created: ' + formatDate(new Date(issue.body.issue.created_at));
    img.src = issue.body.sender.avatar_url;
    issueLink.setAttribute('href', issue.body.issue.html_url);

    if (issue.headers.x-github-event === 'issue_comment') {
        author.textContent = issue.body.sender.login + ' commented an issue!';
    }

    else if (issue.body.action === 'opened' || issue.body.action === 'reopened') {
        issueDiv.className = 'issueDivAlt';
    }

    // Add to DOM

    issueDiv.appendChild(img);
    issueDiv.appendChild(author);

    issueLi.appendChild(issueDiv);
    issueLi.appendChild(title);
    issueLi.appendChild(text);
    issueLi.appendChild(comments);
    issueLi.appendChild(date);
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
    let date = clone.querySelector('.issueDate');
    let comments = clone.querySelector('.issueComments');
    let img = clone.querySelector('.issueImg');
    let issueLink = clone.querySelector('.issueLink');

    // Get info from the socket

    author.textContent = 'Created by: ' + issue.body.user.login;
    issueDiv.className = 'issueDivAlt';
    title.textContent = 'Title: ' + issue.body.title;
    text.textContent = 'Message: ' + issue.body.body;
    comments.textContent = 'Comments: ' + issue.body.comments;
    date.textContent = 'Created: ' + formatDate(new Date(issue.body.created_at));
    img.src = issue.body.user.avatar_url;
    issueLink.setAttribute('href', issue.body.html_url);

    // Add to DOM

    issueDiv.appendChild(img);
    issueDiv.appendChild(author);

    issueLi.appendChild(issueDiv);
    issueLi.appendChild(title);
    issueLi.appendChild(text);
    issueLi.appendChild(comments);
    issueLi.appendChild(date);
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

    author.textContent = issue.body.sender.login + ' ' + issue.body.action + ' an issue!';
    img.src = issue.body.sender.avatar_url;

    if (issue.headers.x-github-event === 'issue_comment') {
        author.textContent = issue.body.sender.login + ' commented an issue!';
    }

    else if (issue.body.action === 'opened' || issue.body.action === 'reopened') {
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

// Format date

function formatDate(date) {
    let monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

