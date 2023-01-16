function createTable(tableId, options) {
   
    var table = document.getElementById(tableId);
    var container = document.createElement("div");
    container.setAttribute("id",tableId + "_wrapper")
    table.appendChild(container);
    
    table.replaceWith(container);
    container.parentNode.insertBefore(table,container.nextElementSibling);

    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    table.appendChild(thead);
    table.appendChild(tbody);

    if (options && options.title) {
        var headerRow = document.createElement("tr");
        for (var i = 0; i < options.title.length; i++) {
            var headerCell = document.createElement("th");
            headerCell.innerHTML = options.title[i];
            headerCell.setAttribute("onclick", "sortTable(event, " + i + ")");
            headerCell.innerHTML += "<i class='fas fa-sort-down' style='margin-left:5px;'></i>";
            headerRow.appendChild(headerCell);
        }
        thead.appendChild(headerRow);
    }

    if (options && options.rows) {
        for (var i = 0; i < options.rows.length; i++) {
            var row = document.createElement("tr");
            for (var j = 0; j < options.rows[i].length; j++) {
                var cell = document.createElement("td");
                cell.innerHTML = options.rows[i][j];
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }
    }

    var searchDiv = document.createElement("div");
    searchDiv.setAttribute("id", tableId + "-search");
    searchDiv.style.display = "flex";
    searchDiv.style.justifyContent = "flex-end";
    searchDiv.style.margin = "10px";

    var searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "Search...");
    searchInput.setAttribute("onkeyup", "searchTable(event, '" + tableId + "')");
    searchDiv.appendChild(searchInput);
    container.appendChild(searchDiv);
    container.appendChild(table);
    if (options && options.search === false) {
        document.getElementById(tableId + "-search").style.display = "none";
    }
    if (options && options.sortArrow === false) {
        var sortArrows = table.getElementsByClassName("fa-sort-up");
        for (var i = 0; i < sortArrows.length; i++) {
            sortArrows[i].style.display = "none";
        }
        sortArrows = table.getElementsByClassName("fa-sort-down");
        for (var i = 0; i < sortArrows.length; i++) {
            sortArrows[i].style.display = "none";
        }
    }
}

function searchTable(event, tableId) {
    var input = event.target.value.toLowerCase();
    var table = document.getElementById(tableId);
    var rows = table.getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var found = false;
        for (var j = 0; j < cells.length; j++) {
            if (cells[j].innerHTML.toLowerCase().indexOf(input) > -1) {
                found = true;
                break;
            }
        }
        if (found) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}


function sortTable(event, column) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = event.target.parentNode.parentNode.parentNode;
    var headers = table.getElementsByTagName("th");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("tr");
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[column];
            y =rows[i + 1].getElementsByTagName("td")[column];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
         if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
        var headers = table.getElementsByTagName("i");
        for (var j = 0; j < headers.length; j++) {
            headers[j].classList.remove("fa-sort-up");
            headers[j].classList.remove("fa-sort-down");
        }
        if (dir == "asc") {
            headers[column].classList.add("fa-sort-up");
            headers[column].classList.remove("fa-sort-down");
        } else {
            headers[column].classList.add("fa-sort-down");
            headers[column].classList.remove("fa-sort-up");
        }
    } else {
        if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
        }
    }
}
}

function addRow(tableId, rowData) {
    var table = document.getElementById(tableId);
    var thead = table.getElementsByTagName("thead")[0];
    var tbody = table.getElementsByTagName("tbody")[0];
    var headers = thead.getElementsByTagName("th");
    var newRow = document.createElement("tr");
    for (var i = 0; i < headers.length; i++) {
        var newCell = document.createElement("td");
        newCell.innerHTML = rowData[i];
        newRow.appendChild(newCell);
    }
    tbody.appendChild(newRow);
    if (table.getAttribute("data-search") == "true") {
        newRow.style.display = "none";
    }
}

function deleteRow(tableId, rowIndex) {
    var table = document.getElementById(tableId);
    var tbody = table.getElementsByTagName("tbody")[0];
    var rows = tbody.getElementsByTagName("tr");
    if (rowIndex > rows.length) {
        console.error("There is no row with index " + rowIndex);
    } else {
        tbody.removeChild(rows[rowIndex]);
    }
}

function getRowData(tableId, rowIndex) {
    var table = document.getElementById(tableId);
    var tbody = table.getElementsByTagName("tbody")[0];
    var rows = tbody.getElementsByTagName("tr");
    var cells = rows[rowIndex].getElementsByTagName("td");
    var rowData = [];
    for (var i = 0; i < cells.length; i++) {
        rowData.push(cells[i].innerHTML);
    }
    return rowData;
}

function getCellData(tableId, rowIndex, columnIndex) {
    var table = document.getElementById(tableId);
    var tbody = table.getElementsByTagName("tbody")[0];
    var rows = tbody.getElementsByTagName("tr");
    var cells = rows[rowIndex].getElementsByTagName("td");
    return cells[columnIndex].innerHTML;
}

function setCellData(tableId, rowIndex, columnIndex, newData) {
    var table = document.getElementById(tableId);
    var tbody = table.getElementsByTagName("tbody")[0];
    var rows = tbody.getElementsByTagName("tr");
    var cells = rows[rowIndex].getElementsByTagName("td");
    cells[columnIndex].innerHTML = newData;
}
