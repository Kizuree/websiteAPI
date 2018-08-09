const fruitnameElement = document.getElementById("fruitname");
const descriptionElement = document.getElementById("description");
const button = document.getElementById("enterButton");
// button.addEventListener("click",updateDB);
const display = document.createElement("p")
const yodaUrl = "https://api.funtranslations.com/translate/yoda.json";
let urlForYoda;
let data;
button.addEventListener("click", createDescription);



function replaceSpaces(word) {
    let newWord = word;
    while (newWord.indexOf(" ") > -1) {
        let indexOfSpace = newWord.indexOf(" ");
        let firstPart = newWord.substring(0, indexOfSpace);
        let secondPart = newWord.substring(indexOfSpace + 1, newWord.length);
        newWord = firstPart + "%20" + secondPart;
    }
    return newWord;
};

console.log(replaceSpaces("Matthew Melendez Inc."));

function createDescription() {
    let fruit = fruitnameElement.value;
    let nutritionUrl = "https://api.nal.usda.gov/ndb/search/?format=json&q=" + fruit + "&max=25&offset=0&api_key=FutlAVo2R14qCPipfucy16qlp9VFmKLlr8ZOX5qd";

    fetch(nutritionUrl)
        .then(function (response) {
            return response.json();

        })
        .then(function (json) {
            data = json;
            console.log(data);

            let manufacturerName = replaceSpaces(data.list.item[0].manu);
            console.log(manufacturerName);
            let foodUsedFor = replaceSpaces(data.list.item[0].name);
            console.log(foodUsedFor);

           let lineForYodaDescription = "The%20manufacturer%20is%20" + manufacturerName + ".%20"+ "The%20manufacturer%20uses%20it%20to%20produce " + foodUsedFor + ".";

            let urlForYoda = "https://api.funtranslations.com/translate/yoda.json?text=" + lineForYodaDescription;
            console.log(urlForYoda);
            

            fetch(urlForYoda)
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    console.log(json);
                    let descriptions = json.contents.translated
                    display.innerText = descriptions;
                    document.body.appendChild(display);
                })

        });
}