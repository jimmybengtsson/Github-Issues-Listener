let socket = io();

let ulList = document.querySelector('.ulClass');
let liList = document.createElement('li');

socket.on('getAllIssues', function(issues) {

    for (let i in issues) {
        liList.appendChild(createNewIssueDiv(issues[i]));
        ulList.appendChild(liList);
        console.log(liList);
    }
});

function createNewIssueDiv(issue) {
    var issueBlock = document.createElement('a');
    var title = document.createElement('span');
    var description = document.createElement('p');
    var createdAtSpan = document.createElement('span');
    var updatedAtSpan = document.createElement('span');
    var labelsSpan = document.createElement('span');
    var labelSpan;
    var numberOfCommentsSpan = document.createElement('span');

    issueBlock.id = issue.id;
    issueBlock.className = notification ? 'issue new' : 'issue';

    title.className = 'title';
    issueBlock.href = issue.html_url;
    title.innerHTML = issue.title;

    description.className = 'description';
    description.innerHTML = issue.body;

    createdAtSpan.className = 'createdAt';
    createdAtSpan.innerHTML = 'created ' /*+ formatDate(new Date(issue.created_at))*/;

    updatedAtSpan.className = 'updatedAt';
    updatedAtSpan.innerHTML = 'updated ' /*+ formatDate(new Date(issue.updated_at))*/;

    labelsSpan.className = 'labels';

    numberOfCommentsSpan.className = 'numberOfComments';
    numberOfCommentsSpan.innerHTML = issue.comments + ' comment' + (issue.comments != 1 ? 's' : '');

    console.log(issue);

    for(var label in issue.labels) {
        labelSpan = document.createElement('span');

        labelSpan.style.background = '#' + issue.labels[label].color;
        labelSpan.innerHTML = issue.labels[label].name;

        labelsSpan.appendChild(labelSpan);
    }

    issueBlock.appendChild(title);
    issueBlock.appendChild(description);
    issueBlock.appendChild(createdAtSpan);
    issueBlock.appendChild(updatedAtSpan);
    issueBlock.appendChild(labelsSpan);
    issueBlock.appendChild(numberOfCommentsSpan);

    return issueBlock;
}