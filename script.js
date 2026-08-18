const repoList = document.getElementById('starred-list');

async function fetchStarredRepos() {
  try {
    const response = await fetch('events.json');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const repos = await response.json();
    renderRepos(repos);
  } catch (error) {
    repoList.innerHTML = '<li class="error">Unable to load the starred repositories.</li>';
    console.error('Error loading events.json:', error);
  }
}

function renderRepos(repos) {
  repoList.innerHTML = repos
    .map(
      (repo) => `
        <li class="repo-item">
          <div class="repo-header">
            <a href="${repo.url}" target="_blank" rel="noreferrer">${repo.name}</a>
            <span class="star-count">★ ${repo.stars.toLocaleString()}</span>
          </div>
          <p>${repo.description}</p>
          <div class="repo-meta">
            <span>${repo.language}</span>
            <span>Updated ${repo.updated_at}</span>
          </div>
        </li>
      `
    )
    .join('');
}

fetchStarredRepos();
