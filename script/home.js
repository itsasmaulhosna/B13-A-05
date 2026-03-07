// get id

const issuesContainer = document.getElementById('issues-container');
// function
async function loadIssue() {
  const res = await fetch(
    'https://phi-lab-server.vercel.app/api/v1/lab/issues',
  );
  const data = await res.json();
  displayIssue(data.data);
}
// {
//     "id": 48,
//     "title": "Browser console shows warnings",
//     "description": "Multiple deprecation warnings appearing in browser console. Need to update deprecated code.",
//     "status": "open",
//     "labels": [
//         "bug"
//     ],
//     "priority": "low",
//     "author": "console_carol",
//     "assignee": "",
//     "createdAt": "2024-02-09T14:20:00Z",
//     "updatedAt": "2024-02-09T14:20:00Z"
// }

function displayIssue(issues) {
  issuesContainer.innerHTML = '';
  for (let issue of issues) {
    const createdDate = new Date(issue.createdAt).toLocaleDateString();
    const labelHtml = issue.labels
      .map((label, index) => {
        let color = '';

        if (index === 0) {
          color = 'bg-red-100 text-red-500';
        } else if (index === 1) {
          color = 'bg-yellow-100 text-yellow-500';
        }

        return `<span class="${color} rounded-3xl px-3 py-1 text-sm mr-2"> ${label.toUpperCase()}</span>`;
      })
      .join('');
    const priorityColor =
      issue.priority === 'high'
        ? 'red-500'
        : issue.priority === 'medium'
          ? 'yellow-500'
          : 'gray-300';
    const statusIcon =
      issue.status === 'open'
        ? './assets/Open-Status.png'
        : './assets/Closed- Status .png';
    console.log(issue);
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="bg-white h-full  p-6 rounded-xl shadow border-t-4 ${
      issue.status === 'open' ? 'border-green-500' : 'border-gray-400'
    }">
        <div class="flex justify-between items-center mb-3">
          <img src='${statusIcon}'/>
          <span class="bg-${priorityColor}/20 text-${priorityColor} rounded-3xl p-2 px-5">${issue.priority.toUpperCase()}</span>
        </div>
        <h2 class="text-xl font-semibold mb-3">
          ${issue.title}
        </h2>
        <p class="line-clamp-2 text-gray-400 mb-4">
          ${issue.description}
        </p>
         <div class="mb-4">${labelHtml}</div>
        <hr class="border-t border-gray-200 my-4 mx-auto">
        <span class="text-gray-300">#${issue.id} by ${issue.author}<br />

        ${createdDate}</span>
      </div>

    `;
    issuesContainer.append(div);
  }
}
loadIssue();
