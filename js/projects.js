let projects = [];
let activeFilter = 'all';

async function loadProjects() {
  try {
    const res = await fetch('data/projects.json');
    projects = await res.json();
    buildCategoryFilters();
    renderProjects();
  } catch (e) {
    document.getElementById('projectList').innerHTML =
      '<p style="color: var(--accent); text-align: center;">Kon projecten niet laden.</p>';
  }
}

function buildCategoryFilters() {
  const categories = new Set(['all']);
  projects.forEach(p => categories.add(p.category));
  const container = document.getElementById('categoryFilters');
  container.innerHTML = '';
  
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (activeFilter === cat ? ' active' : '');
    btn.dataset.filter = cat;
    btn.textContent = cat === 'all' ? 'Alle' : cat.charAt(0).toUpperCase() + cat.slice(1);
    btn.onclick = () => setFilter(cat);
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

function filterProjects() {
  renderProjects();
}

function renderProjects() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  const list = document.getElementById('projectList');

  const filtered = projects.filter(p => {
    if (activeFilter !== 'all' && p.category !== activeFilter) return false;
    if (q) {
      const haystack = (p.title + ' ' + p.subtitle + ' ' + p.description + ' ' + (p.tags || []).join(' ')).toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    list.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Geen projecten gevonden.</p>';
    return;
  }

  list.innerHTML = filtered.map(p => {
    const comps = detectCompetencies(p);
    return `
    <div class="project-card reveal">
      <img src="screenshots/${p.screenshots?.[0] || 'placeholder.webp'}" alt="${p.title}" loading="lazy">
      <div class="body">
        <h3>${p.title}</h3>
        <div class="meta">${p.subtitle}</div>
        <p>${p.description}</p>
        <div class="tech-tags">
          ${(p.tags || []).map(t => `<span>${t}</span>`).join('')}
        </div>
        ${comps.length > 0 ? `
        <div class="competency-badges">
          ${comps.map(c => `<span class="competency-tag">${c}</span>`).join('')}
        </div>
        ` : ''}
        <div style="margin-top: 24px;">
          <a href="project.html?id=${p.id}" class="btn btn-outline" style="width: 100%; justify-content: center;">Bekijk details &rarr;</a>
        </div>
      </div>
    </div>
    `;
  }).join('');

  // Re-trigger reveal animation for new items
  document.querySelectorAll('.project-card.reveal').forEach(el => {
    el.classList.add('visible');
  });
}

document.addEventListener('DOMContentLoaded', loadProjects);
