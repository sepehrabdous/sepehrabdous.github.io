(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const search = document.querySelector('#publication-search');
  const buttons = Array.from(document.querySelectorAll('[data-filter]'));
  const pubs = Array.from(document.querySelectorAll('[data-publication]'));
  if (pubs.length) {
    let activeFilter = 'all';
    function applyFilters() {
      const query = search ? search.value.trim().toLowerCase() : '';
      pubs.forEach(function (item) {
        const typeMatches = activeFilter === 'all' || item.dataset.type === activeFilter;
        const textMatches = !query || item.textContent.toLowerCase().includes(query);
        item.classList.toggle('hidden', !(typeMatches && textMatches));
      });
      document.querySelectorAll('[data-year-group]').forEach(function (group) {
        const visible = Array.from(group.querySelectorAll('[data-publication]')).some(function (item) {
          return !item.classList.contains('hidden');
        });
        group.classList.toggle('hidden', !visible);
      });
    }
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        activeFilter = button.dataset.filter;
        buttons.forEach(function (b) { b.classList.toggle('active', b === button); });
        applyFilters();
      });
    });
    if (search) search.addEventListener('input', applyFilters);
  }

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
