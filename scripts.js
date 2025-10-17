document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const resultsDiv = document.getElementById('results');

  const substances = [
    { name: 'THC', link: 'substance1.html' },
    { name: 'Caffeine', link: 'substance2.html' },
  ];

  function searchSubstance() {
    const query = searchInput.value.trim().toLowerCase();
    resultsDiv.innerHTML = '';

    if (!query) {
      resultsDiv.innerHTML = '<p>Please enter a substance name.</p>';
      return;
    }

    const results = substances.filter(sub =>
      sub.name.toLowerCase().includes(query)
    );

    if (results.length > 0) {
      results.forEach(sub => {
        const item = document.createElement('div');
        item.classList.add('result-item');
        item.textContent = sub.name;
        item.onclick = () => {
          console.log(`Redirecting to: ${sub.link}`);
          window.location.href = sub.link; // direct redirect
        };
        resultsDiv.appendChild(item);
      });

      // Automatically open the first match
      window.location.href = results[0].link;
    } else {
      resultsDiv.innerHTML = '<p>No substances found.</p>';
    }
  }

  searchBtn.addEventListener('click', searchSubstance);
  searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') searchSubstance();
  });
});
