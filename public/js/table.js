async function loadIntoTable(url, table) {
    const response = await fetch(url);
    const json = await response.json();
    const tableBody = document.getElementById(table);
    json.forEach(function (row) {
        const rowElement = document.createElement('tr');
        Object.keys(row).forEach(function (key) {
            const cell = document.createElement('td');
            cell.innerText = row[key];
            rowElement.appendChild(cell);
        });
        tableBody.appendChild(rowElement);
    });    
}

loadIntoTable('http://localhost:3000/api/tasks', 'taskTable');