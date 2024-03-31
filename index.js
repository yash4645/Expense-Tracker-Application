let editIndex = localStorage.getItem("editIndex");
let editData = JSON.parse(localStorage.getItem("editData"));

let form = document.getElementById("form");

if (editIndex !== null && editData !== null) {
    document.getElementById("name").value = editData.pName;
    document.getElementById("category").value = editData.pcategory;
    document.getElementById("date").value = editData.pdate;
    document.getElementById("type").value = editData.ptype;
    document.getElementById("Amount").value = editData.pamount;
}

form.addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    let name = form.name.value.trim();
    let category = form.category.value.trim();
    let date = form.date.value.trim();
    let type = form.type.value;
    let amount = form.Amount.value.trim();
    
    if (name && category && date && type !== "NONE" && amount) {
        alert("Data added successfully!");
        
        if (editIndex !== null) {
            let Arr = JSON.parse(localStorage.getItem("ExpenceList")) || [];
            Arr[editIndex] = {
                pName: name,
                pcategory: category,
                pdate: date,
                ptype: type,
                pamount: amount,
            };
            localStorage.setItem("ExpenceList", JSON.stringify(Arr));

            localStorage.removeItem("editIndex");
            localStorage.removeItem("editData");
        } else {
            let Obj = {
                pName: name,
                pcategory: category,
                pdate: date,
                ptype: type,
                pamount: amount,
            };
            let Arr = JSON.parse(localStorage.getItem("ExpenceList")) || [];
            Arr.push(Obj);
            localStorage.setItem("ExpenceList", JSON.stringify(Arr));
        }

        window.location.href = "history.html";
    } else {
        alert("Please fill all fields correctly!");
    }
});
