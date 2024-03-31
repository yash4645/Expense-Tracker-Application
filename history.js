let totalList = JSON.parse(localStorage.getItem("ExpenceList")) || [];

displayFun(totalList);

function displayFun(totalList) {
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = ""; 

    let totalAmount = 0;
    totalList.forEach(function(elem, index) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerText = elem.pName;
        let td2 = document.createElement("td");
        td2.innerText = elem.pcategory;
        let td3 = document.createElement("td");
        td3.innerText = elem.pdate;
        let td4 = document.createElement("td");
        td4.innerText = elem.ptype;
        let td5 = document.createElement("td");
        td5.innerText = elem.pamount;
        let td6 = document.createElement("td");
        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.style.cursor="pointer";
        editButton.style.padding="2% 4%";
        editButton.addEventListener("click", function() {
            editExpense(index);
        });
        td6.appendChild(editButton);

        if (elem.ptype === "Income") {
            totalAmount += parseFloat(elem.pamount);
        } else if (elem.ptype === "Expence") {
            totalAmount -= parseFloat(elem.pamount);
        }

        tr.append(td1, td2, td3, td4, td5, td6);
        tbody.appendChild(tr);
    });

    let totalRow = document.createElement("tr");
    let totalCell = document.createElement("td");
    totalCell.colSpan = "6"; 
    totalCell.style.fontWeight = "bold";
    totalCell.style.textAlign = "right";
    totalCell.innerText = "Total Amount: " + totalAmount.toFixed(2); 
    totalRow.appendChild(totalCell);
    tbody.appendChild(totalRow);
}

function editExpense(index) {
    localStorage.setItem("editIndex", index);
    localStorage.setItem("editData", JSON.stringify(totalList[index]));
    window.location.href = "index.html";
}

document.getElementById("filter").addEventListener("change", function() {
    let filterValue = this.value;
    let filteredList = totalList.filter(function(elem) {
        return filterValue === "all" || elem.ptype === filterValue;
    });
    displayFun(filteredList);
});

document.getElementById("sort").addEventListener("change", function() {
    let sortValue = this.value;
    let sortedList = totalList.slice().sort(function(a, b) {
        if (sortValue === "date") {
            return new Date(a.pdate) - new Date(b.pdate);
        } else if (sortValue === "type") {
            return a.ptype.localeCompare(b.ptype);
        } else if (sortValue === "amount") {
            return parseFloat(a.pamount) - parseFloat(b.pamount);
        }
    });
    displayFun(sortedList);
});
