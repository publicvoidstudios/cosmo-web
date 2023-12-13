/**
 * @param {HTMLTableElement} table Table to sort
 * @param {number} column Index of column to sort
 * @param {boolean} asc If true, sort in ascending order
 */

function sortTable(table, column, asc){
    const directionModifier = asc ? 1 : -1;    
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll('tr'));
    
    //Sort each row
    const sortedRows = rows.sort((a ,b) => {
        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        
        return aColText > bColText ? (1 * directionModifier) : (-1 * directionModifier);
    });
    
    //Remove all existing TRs from the table
    while (tBody.firstChild){
        tBody.removeChild(tBody.firstChild);
    }
    
    //Re-add newly sorted rows
    tBody.append(...sortedRows);
    
    //Remember how table is sorted
    table.querySelectorAll('th').forEach(th => th.classList.remove('th-sort-asc', 'th-sort-desc'));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle('th-sort-asc', asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle('th-sort-desc', !asc);
}