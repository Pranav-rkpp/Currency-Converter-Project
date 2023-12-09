//Refering the select tag
const curr = document.querySelectorAll(".currency");
//select first input box
const InputBox = document.querySelectorAll(".value");

//Select convert button
const convertButton = document.querySelector(".convert");

//Fetch Api for currency converter
fetch("https://api.frankfurter.app/currencies")
    .then(response => { return response.json(); })
    .then(currency => { displayCurrency(currency); })

function displayCurrency(currencyJson) {
    //Setting currencies to each and every select tag
    for (let i = 0; i < curr.length; i++)
        appendCurrency(currencyJson, curr[i]);
}

//append currency under select tag using function
function appendCurrency(currencyJson, curr) {
    //Convert json to array format
    const currencies = Object.entries(currencyJson);

    for (let i = 0; i < currencies.length; i++) {
        const option = document.createElement("option");
        option.setAttribute("name", `${currencies[i][0]}`);
        option.textContent = `${currencies[i][0]}`;
        curr.append(option);
    }
}

//Event for convert button
convertButton.addEventListener("click", () => {
    let currency1 = curr[0].value;
    let currency2 = curr[1].value;
    let inputValue1 = InputBox[0].value;
    // console.log(currency1, currency2, inputValue);
    if (currency1 === currency2) {
        alert("Choose Different Currencies...");
    } else {
        convertCurrency(currency1, currency2, inputValue1);
    }
});

//Function to convert currency value
function convertCurrency(currency1, currency2, inputValue1) {
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${inputValue1}&from=${currency1}&to=${currency2}`)
        .then(resp => resp.json())
        .then((data) => {
            InputBox[1].value = Object.values(data.rates);
        });
}