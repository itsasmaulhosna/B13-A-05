// get id
const issuesContainer = document.getElementById('issues-container');
const loddingSpinner = document.getElementById('loddingSpinner');
const allButton = document.getElementById('allBtn');
const openButton = document.getElementById('openBtn');
const closeButton = document.getElementById('closeBtn');
const issueCount = document.getElementById('issue-count');
const category = document.getElementById('modalCategory');
const title = document.getElementById('modalTitle');
const priority = document.getElementById('modalPriority');
const description = document.getElementById('modalDescription');
const author = document.getElementById('modalAuthor');
const created = document.getElementById('modalCreated');
const labels = document.getElementById('modalLabels');
const details = document.getElementById('issue-detail');
const assignee = document.getElementById('modalAssign');

let allIssues = [];
let issuesToShow = [];
const buttons = [allButton, openButton, closeButton];

allButton.addEventListener('click', () => {
  buttons.forEach((btn) => {
    if (btn === allButton) {
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-outline');
    } else {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-outline');
    }
  });

  loadIssue();
});

// function
function showSpinner() {
  loddingSpinner.classList.remove('hidden');
}
function hideSpinner() {
  loddingSpinner.classList.add('hidden');
}
// selected
async function selectBtn(status, btn) {
  showSpinner();
  updateCount(status);
  const allBtn = document.querySelectorAll('#allBtn,#openBtn,#closeBtn');
  allBtn.forEach((btn) => {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-outline');
  });
  btn.classList.add('btn-primary');
  btn.classList.remove('btn-outline');

  if (status === 'all') {
    issuesToShow = allIssues;
  } else {
    issuesToShow = allIssues.filter((issue) => issue.status === status);
  }

  displayIssue(issuesToShow);
  hideSpinner();
}
loadIssue();

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

async function loadIssue() {
  showSpinner();
  const res = await fetch(
    'https://phi-lab-server.vercel.app/api/v1/lab/issues',
  );
  const data = await res.json();
  allIssues = data.data;
  displayIssue(allIssues);
  hideSpinner();
}
function displayIssue(issues) {
  issuesContainer.innerHTML = '';
  for (let issue of issues) {
    const createdDate = new Date(issue.createdAt).toLocaleDateString();

    const labelHtml = issue.labels
      .map((label, index) => {
        let icon = '';

        if (label.toLowerCase().includes('bug')) {
          icon = '<i class="fa-solid fa-bug"></i>';
        } else if (label.toLowerCase().includes('help')) {
          icon = '<i class="fa-solid fa-handshake-angle"></i>';
        } else if (label.toLowerCase().includes('doc')) {
          icon = '<i class="fa-solid fa-file-lines"></i>';
        } else if (label.toLowerCase().includes('good')) {
          icon = '<i class="fa-solid fa-thumbs-up"></i>';
        } else if (label.toLowerCase().includes('enhancement')) {
          icon = '<i class="fa-solid fa-wand-magic-sparkles"></i>';
        }
        let color = '';

        if (index === 0) {
          color = 'bg-red-100 text-red-500';
        } else if (index === 1) {
          color = 'bg-yellow-100 text-yellow-500';
        }

        return `<span class="${color} rounded-3xl px-3 py-1 text-sm mr-2"> ${icon} ${label.toUpperCase()}</span>`;
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

    const div = document.createElement('div');
    div.innerHTML = `
    <div class="bg-white h-full  p-6 rounded-xl shadow border-t-4 ${
      issue.status === 'open' ? 'border-green-500' : 'border-purple-400'
    }">
        <div class="flex justify-between items-center mb-3">
          <img src='${statusIcon}'/>
          <span class="bg-${priorityColor}/20 text-${priorityColor} rounded-3xl p-2 px-5">${issue.priority.toUpperCase()}</span>
        </div>
        <h2 class="text-xl font-semibold mb-3 cursor-pointer" onclick="openIssueModals(${issue.id})" >
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
async function openIssueModals(issueId) {
  showSpinner();
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`,
  );
  const data = await res.json();
  const issue = data.data;
  const createdDate = new Date(issue.createdAt).toLocaleDateString();

  title.textContent = issue.title;
  description.textContent = issue.description;
  author.textContent = issue.author;
  created.textContent = createdDate;
  assignee.textContent = issue.author;
  // status
  if (issue.status === 'open') {
    category.textContent = 'Opened';
    category.className = 'badge bg-green-500 text-white';
  } else {
    category.textContent = 'Closed';
    category.className = 'badge bg-purple-500 text-white';
  }
  //  priority
  if (issue.priority === 'high') {
    priority.textContent = 'HIGH';
    priority.className = 'badge bg-red-100 text-red-500';
  } else if (issue.priority === 'medium') {
    priority.textContent = 'MEDIUM';
    priority.className = 'badge bg-yellow-100 text-yellow-500';
  } else {
    priority.textContent = 'LOW';
    priority.className = 'badge bg-gray-100 text-gray-500';
  }
  // label
  labels.innerHTML = issue.labels
    .map((label, index) => {
      let icon = '';

      if (label.toLowerCase().includes('bug')) {
        icon = '<i class="fa-solid fa-bug"></i>';
      } else if (label.toLowerCase().includes('help')) {
        icon = '<i class="fa-solid fa-handshake-angle"></i>';
      } else if (label.toLowerCase().includes('doc')) {
        icon = '<i class="fa-solid fa-file-lines"></i>';
      } else if (label.toLowerCase().includes('good')) {
        icon = '<i class="fa-solid fa-thumbs-up"></i>';
      } else if (label.toLowerCase().includes('enhancement')) {
        icon = '<i class="fa-solid fa-wand-magic-sparkles"></i>';
      }
      let color = '';

      if (index === 0) {
        color = 'bg-red-100 text-red-500';
      } else if (index === 1) {
        color = 'bg-yellow-100 text-yellow-500';
      }

      return `<span class="${color} rounded-3xl px-3 py-1 text-sm mr-2">${icon} ${label.toUpperCase()}</span>`;
    })
    .join('');

  if (details) {
    details.showModal();
  }
  hideSpinner();
}

function updateCount(status) {
  showSpinner();
  let count =
    status === 'all'
      ? allIssues.length
      : allIssues.filter((issue) => issue.status === status).length;
  issueCount.textContent = `${count} issues`;
}
document.getElementById('btn-search').addEventListener('click', () => {
  const input = document.getElementById('input-search');
  const searchValue = input.value.trim().toLowerCase();

  fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`,
  )
    .then((res) => res.json())
    .then((data) => {
      searchIssue = data.data;

      const filterIssue = searchIssue.filter((issue) => {
        const title = issue.title || '';
        const desc = issue.description || '';
        return (
          title.toLowerCase().includes(searchValue) ||
          desc.toLowerCase().includes(searchValue)
        );
      });
      displayIssue(filterIssue);
    });
});
loadIssue();
