document.getElementById('searchBtn').addEventListener('click', searchSubstance);
document.getElementById('searchInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') searchSubstance();
});

function searchSubstance() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  const substances = [
    { name: 'THC', link: 'substance1.html' },
    { name: 'Caffeine', link: 'substance2.html' },
  ];

  const results = substances.filter(sub =>
    sub.name.toLowerCase().includes(query)
  );

  if (results.length > 0) {
    results.forEach(sub => {
      const item = document.createElement('div');
      item.classList.add('result-item');
      item.textContent = sub.name;
      item.onclick = () => window.location.href = sub.link;
      resultsDiv.appendChild(item);
    });
  } else {
    resultsDiv.innerHTML = '<p>No substances found.</p>';
  }
}
