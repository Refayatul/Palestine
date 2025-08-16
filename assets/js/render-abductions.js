(async function(){
  const d = await fetchJSON('/assets/data/abductions-2008-2023.json');
  document.getElementById('lu').textContent = d.meta.last_updated || '—';
  document.getElementById('method').textContent = d.meta.methodology || '';
  document.getElementById('sources').innerHTML = (d.meta.sources||[]).map(s => `<li><a target="_blank" rel="noopener" href="${s.url}">${s.title}</a> — ${s.publisher}</li>`).join('');

  const ctx1 = document.getElementById('byYear').getContext('2d');
  new Chart(ctx1, {
    type: 'line',
    data: {
      labels: d.by_year.map(i=>i.year),
      datasets: [{ label: 'Children', data: d.by_year.map(i=>i.children), borderColor:'#ce1126', fill:false, tension:0.25 }]
    },
    options: { scales: { y: { beginAtZero: true }}, plugins: { legend: { display:false } } }
  });

  const ctx2 = document.getElementById('byRegion').getContext('2d');
  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: d.by_region.map(i=>i.region),
      datasets: [{ label: 'Children', data: d.by_region.map(i=>i.children), backgroundColor:'#009736' }]
    },
    options: { indexAxis: 'y', plugins: { legend: { display:false } } }
  });

  const ctx3 = document.getElementById('byGender').getContext('2d');
  new Chart(ctx3, {
    type: 'doughnut',
    data: {
      labels: d.by_gender.map(i=>i.gender),
      datasets: [{ data: d.by_gender.map(i=>i.children), backgroundColor: ['#ce1126','#00643a'] }]
    },
    options: { plugins: { legend: { position:'bottom' } } }
  });
})();
