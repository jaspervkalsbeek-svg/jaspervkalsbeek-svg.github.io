let projects = [];
let activeFilter = 'all';
let activeTech = '';

async function loadProjects() {
  try {
    const res = await fetch('data/projects.json');
    projects = await res.json();
    renderProjects();
    buildTechFilters();
  } catch (e) {
    document.getElementById('projectList').innerHTML =
      '<div class="empty-state glass"><p>Kon projecten niet laden.</p></div>';
  }
}

function buildTechFilters() {
  const tags = new Set();
  projects.forEach(p => p.tags?.forEach(t => tags.add(t)));
  const sorted = [...tags].sort();
  const container = document.getElementById('techFilters');
  container.innerHTML = '';
  const allBtn = document.createElement('button');
  allBtn.className = 'filter-btn' + (activeTech === '' ? ' active' : '');
  allBtn.textContent = 'Alle tech';
  allBtn.onclick = () => setTech('');
  container.appendChild(allBtn);
  sorted.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (activeTech === t ? ' active' : '');
    btn.textContent = t;
    btn.onclick = () => setTech(t);
    container.appendChild(btn);
  });
}

function setFilter(cat) {
  activeFilter = cat;
  document.querySelectorAll('#categoryFilters .filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === cat);
  });
  renderProjects();
}

function setTech(tech) {
  activeTech = tech;
  document.querySelectorAll('#techFilters .filter-btn').forEach(b => {
    const isAllBtn = b.textContent === 'Alle tech';
    b.classList.toggle('active', tech === '' ? isAllBtn : b.textContent === tech);
  });
  renderProjects();
}

function filterProjects() {
  renderProjects();
}

function renderProjects() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  const list = document.getElementById('projectList');
  const empty = document.getElementById('emptyState');

  const filtered = projects.filter(p => {
    if (activeFilter !== 'all' && p.category !== activeFilter) return false;
    if (activeTech && (!p.tags || !p.tags.includes(activeTech))) return false;
    if (q) {
      const haystack = (p.title + ' ' + p.subtitle + ' ' + p.description + ' ' + (p.tags || []).join(' ')).toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    list.innerHTML = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  list.innerHTML = filtered.map(p => `
    <div class="project-item">
      <img src="screenshots/${p.screenshots?.[0] || 'placeholder.png'}" alt="${p.title}" loading="lazy"
           onerror="this.style.display='none'">
      <div class="info">
        <h3>${p.title}</h3>
        <div class="meta">${p.subtitle}</div>
        <p>${p.description}</p>
        <div class="tech">
          ${(p.tags || []).map(t => `<span>${t}</span>`).join('')}
        </div>
        <div class="links" style="margin-top:12px">
          <a href="project.html?id=${p.id}">Bekijk project →</a>
          ${p.links?.github ? `<a href="${p.links.github}" target="_blank" rel="noopener noreferrer" style="margin-left:12px">GitHub</a>` : ''}
          ${p.links?.site ? `<a href="${p.links.site}" target="_blank" rel="noopener noreferrer" style="margin-left:12px">Live site</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', loadProjects);
