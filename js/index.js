let coffeeData = {
    "熱拿鐵咖啡－大": {
        "重量": [375, 12, 2],
        "溫度": [65, 5, 2]
    },

    "熱美式咖啡－大": {
        "重量": [400, 7, 2],
        "溫度": [76, 4, 2]
    },

    "精品美式咖啡": {
        "重量": [310, 5, 1],
        "溫度": [78, 4, 1]
    },

    "精品拿鐵咖啡": {
        "重量": [320, 10, 1],
        "溫度": [65, 5, 1]
    }
};


const temperature = [[375, 12, 2], [65, 5, 2], [400, 7, 2], [76, 4, 2], [310, 5], [78, 4], [320, 10], [65, 5]];



const domById = catchDomById("page-1-date", "page-1-time", "latte", "americano", "generate-random-number"),
    today = new Date;

domById.generateRandomNumber.addEventListener("click", () => {
    renderWeightTemperature(latte);

    renderWeightTemperature(americano);

    renderWritingTime(domById.page1Time);
})

// 渲染亂數在咖啡 重量 和 溫度
function renderWeightTemperature(coffee) {
    const weight = coffee.getElementsByClassName("page-1-coffee-value-weight")[0],
        temperature = coffee.getElementsByClassName("page-1-coffee-value-temperature")[0];

    weight.innerHTML = randomTwoTemperature(375, 12);

    temperature.innerHTML = randomTwoTemperature(65, 5);
}

// 今天日期
function renderWritingToday(dom) {
    const writingToday = dom.getElementsByClassName("writing-today")[0];

    writingToday.innerHTML = today.getDate();
}

renderWritingToday(domById.page1Date);

// 渲染隨機時間
function renderWritingTime(dom) {
    const writingTime = dom.getElementsByClassName("writing-time")[0];

    console.log(writingTime);

    writingTime.innerHTML = generateRandomTime();
}

// 產生隨機時間
function generateRandomTime() {
    let time,
        randomZeroToSix = randomNumber(3, 3)[0];

    if (randomZeroToSix === 6) {
        time = "08:00"
    } else {
        time = "07:" + randomZeroToSix + "0"
    }

    console.log(time);

    return time;
}

// 輸入基準、誤差、數量，輸出數量個的誤差值
function randomNumber(ideal, tolerance, number = 1) {
    const max = ideal + tolerance,
        min = ideal - tolerance;

    let arr = [];

    // 重複 number 次
    for (let i = 0; i < number; i++) {
        // 在 arr 裡放進一個 min ~ max 的亂數
        arr.push(Math.floor(Math.round(Math.random() * 10) / 10 * (max - min) + min));
    };

    return arr;
}

// 產生一個溫度亂數
function randomOneTemperature(ideal, tolerance) {
    return randomNumber(ideal, tolerance, 1);
}

// 產生兩個溫度亂數
function randomTwoTemperature(ideal, tolerance) {
    return randomNumber(ideal, tolerance, 2);
}




function catchDomById(...Id) {
    // console.log(arguments);

    let domArr = {};

    for (let i = 0, length = arguments.length; i < length; i++) {
        // console.log(arguments[i]);

        domArr[cssNameToJsName(arguments[i])] = document.getElementById(arguments[i]);
        // toUpperCase()
    }

    return domArr;
}

// 把 css 的名字轉成 js 的名字   透過 - 判斷
function cssNameToJsName(idName) {
    let newWord,
        index;

    if (idName.includes("-")) {
        index = idName.indexOf("-");

        newWord = idName.replace("-", "");

        newWord = covertOneLetterOfStringToUppercaseOrLowercase(newWord, index)

        newWord = cssNameToJsName(newWord);
    } else {
        newWord = idName;
    }

    return newWord;
}

// 把特定位置的字母大小寫轉換
function covertOneLetterOfStringToUppercaseOrLowercase(string, index = 0) {
    let newString;

    // 如果 字母 === 大寫的字母，代表是大寫
    if (string[index] === string[index].toUpperCase()) {
        // 把字串 字母前字串 + 字母小寫 + 字母後字串
        newString = string.slice(0, index) + string[index].toLowerCase() + string.slice(index + 1, string.length);
    } else {
        // 把字串 字母前字串 + 字母大寫 + 字母後字串
        newString = string.slice(0, index) + string[index].toUpperCase() + string.slice(index + 1, string.length);
    }

    // console.log(newString);

    return newString;
}