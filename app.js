const App_ID = "e0831ca3f2a04f6aa9c15a1e47d0b5c2"; 
const Base_URL = "https://open.er-api.com/v6/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button"); 
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns) {
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateExchgrate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal <1){
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${Base_URL}?app_id=${App_ID}`;

    let response = await fetch(URL);
    let data = await response.json();
    let fromRate = data.rates[fromCurr.value];
    let toRate = data.rates[toCurr.value];
    
    let finalamt = (amtVal / fromRate) * toRate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalamt.toFixed(2)} ${toCurr.value}`;
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchgrate();
})

window.addEventListener("load", () => {
    updateExchgrate();
});
