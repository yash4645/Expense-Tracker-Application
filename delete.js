let totalList = JSON.parse(localStorage.getItem("ExpenceList")) || [];

displayFun(totalList);

function displayFun(TotalList) {
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = ""; 

    totalList.forEach(function(elem, index) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerText = elem.pName;
        let td2 = document.createElement("td");
        td2.innerText = elem.pdate;
        let td3 = document.createElement("td");
        td3.innerText = elem.pamount;
        let td4 = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.style.color = "red";
        deleteButton.style.cursor = "pointer";
        deleteButton.style.padding="2% 4%"
        deleteButton.addEventListener("click", function() {
            deleteFun(index);
        });
        td4.appendChild(deleteButton);
        tr.append(td1, td2, td3, td4);
        tbody.appendChild(tr);
    });
}

function deleteFun(index) {
    totalList.splice(index, 1);
    localStorage.setItem("ExpenceList", JSON.stringify(totalList));
    displayFun(totalList);

    // window.location.href = "history.html";
}
