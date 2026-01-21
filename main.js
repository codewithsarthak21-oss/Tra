let langOption = document.querySelectorAll("select");
let fromText = document.querySelector(".fromText");
let toText = document.querySelector(".toText");
let fromVoice = document.querySelector('.property_from .bx-volume-full');

/* Load languages into dropdowns */
langOption.forEach((select, index) => {
    for (let countryCode in language) {
        let option = document.createElement("option");
        option.value = countryCode;
        option.innerText = language[countryCode];

        if (index === 0 && countryCode === "en-GB") {
            option.selected = true;
        }
        if (index === 1 && countryCode === "hi-IN") {
            option.selected = true;
        }

        select.appendChild(option);
    }
});

/* Translate text */
fromText.addEventListener("input", () => {
    let text = fromText.value;
    let fromLang = langOption[0].value;
    let toLang = langOption[1].value;

    if (!text) {
        toText.value = "";
        return;
    }

    let transLINK = `https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLang}|${toLang}`;

    fetch(transLINK)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText;
        });
});

/* Text to Speech */
fromVoice.addEventListener('click', () => {
    let fromTalk = new SpeechSynthesisUtterance(fromText.value);
    fromTalk.lang = langOption[0].value;
    speechSynthesis.speak(fromTalk);
});
