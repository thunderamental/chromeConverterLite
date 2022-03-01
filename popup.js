window.onload= async function(){

    console.log('Popup opened');
    chrome.storage.local.get("leftCur", (result) => document.getElementById("dropLeft").value = `${result.leftCur}` );
    chrome.storage.local.get("leftVal", (result) => console.log(`leftVal is ${result.leftVal}`) );
    chrome.storage.local.get("leftVal", (result) => document.getElementById("leftForm").value = `${result.leftVal}` );

    chrome.storage.local.get("rightCur", (result) => document.getElementById("dropRight").value = `${result.rightCur}` );
    chrome.storage.local.get("rightVal", (result) => console.log(`rightVal is ${result.rightVal}`) );
    chrome.storage.local.get("rightVal", (result) => document.getElementById("rightForm").value = `${result.rightVal}` );

    document.getElementById("leftForm").addEventListener("submit", leftChange);
    document.getElementById("rightForm").addEventListener("submit", rightChange);

    document.getElementById("leftForm").addEventListener("change", leftChange);
    document.getElementById("rightForm").addEventListener("change", rightChange);
    document.getElementById("dropLeft").addEventListener("change", leftChange);
    document.getElementById("dropRight").addEventListener("change", rightChange);

    leftChange;
    rightChange;
    console.log("end of onload")
}

async function leftChange() {
    var leftVal = document.getElementById("leftForm").value;
    console.log(`leftVal is ${leftVal}`);
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

    var rightVal = leftVal * json[leftCur][rightCur];

    chrome.storage.local.set({leftCur: `${leftCur}`}, () => console.log("recorded"));
    chrome.storage.local.set({leftVal: `${leftVal}`}, () => console.log("recorded"));
    chrome.storage.local.set({rightVal: `${rightVal}`}, () => console.log("recorded"));
    

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

    var leftVal = rightVal * json[rightCur][leftCur];
    
    chrome.storage.local.set({rightCur: `${rightCur}`}, () => console.log("recorded"));
    chrome.storage.local.set({leftVal: `${leftVal}`}, () => console.log("recorded"));
    chrome.storage.local.set({rightVal: `${rightVal}`}, () => console.log("recorded"));
}



// https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/cny.json?d=2022-02-19