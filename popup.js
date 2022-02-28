window.onload=function(){
    document.getElementById("leftForm").addEventListener("submit", leftChange);
    document.getElementById("leftForm").addEventListener("change", leftChange);
    document.getElementById("rightForm").addEventListener("change", rightChange);
    document.getElementById("dropLeft").addEventListener("change", leftChange);
    document.getElementById("dropRight").addEventListener("change", rightChange);
}
// async await- await just stops the function right there while it waits for the API to return.

async function leftChange() {
    var leftVal = document.getElementById("leftForm").value;
    var leftDrop = document.getElementById("dropLeft");
    var leftCur = leftDrop.options[leftDrop.selectedIndex].value;
    var rightDrop = document.getElementById("dropRight");
    var rightCur = rightDrop.options[rightDrop.selectedIndex].value;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    let response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${leftCur}.json?d=${today}`);
    let json = await response.json();
 
    document.getElementById("rightForm").value = leftVal * json[leftCur][rightCur];

}
async function rightChange() {
    var rightVal = document.getElementById("rightForm").value;
    var leftDrop = document.getElementById("dropLeft");
    var leftCur = leftDrop.options[leftDrop.selectedIndex].value;
    var rightDrop = document.getElementById("dropRight");
    var rightCur = rightDrop.options[rightDrop.selectedIndex].value;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    let response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${rightCur}.json?d=${today}`);
    let json = await response.json();
 
    document.getElementById("leftForm").value = rightVal * json[rightCur][leftCur];
}



// https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/cny.json?d=2022-02-19