 const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

    let cryptoData = [];

    // Fetch using .then
    function fetchDataWithThen() {
      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          cryptoData = data;
          renderTable(data);
        })
        .catch(error => console.error('Error:', error));
    }

    // Fetch using async/await
    async function fetchDataWithAsync() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        cryptoData = data;
        renderTable(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // Choose one method to fetch initially
    fetchDataWithAsync(); // or fetchDataWithThen();

    function renderTable(data) {
      const tbody = document.getElementById('cryptoTableBody');
      tbody.innerHTML = '';
      data.forEach(coin => {
        const row = `
          <tr>
            <td><img src="${coin.image}" alt="${coin.name}" /></td>
            <td>${coin.name}</td>
            <td>${coin.symbol.toUpperCase()}</td>
            <td>$${coin.current_price.toLocaleString()}</td>
            <td>${coin.total_volume.toLocaleString()}</td>
            <td>${coin.market_cap.toLocaleString()}</td>
            <td>${coin.price_change_percentage_24h.toFixed(2)}%</td>
          </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
      });
    }

    function handleSearch() {
      const query = document.getElementById('searchInput').value.toLowerCase();
      const filteredData = cryptoData.filter(coin =>
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query)
      );
      renderTable(filteredData);
    }

    function sortByMarketCap() {
      const sorted = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
      renderTable(sorted);
    }

    function sortByPercentageChange() {
      const sorted = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
      renderTable(sorted);
    }