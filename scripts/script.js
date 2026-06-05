const DATA_URL = "cards.json";

let cards = 0;
let showChosen = true;
let randomCard = 0;

function reload() {
    window.location.reload();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toggleRand() {
    if (showChosen) {
        container.childNodes[randomCard].classList.remove("chosen");
        showChosen = false;
    } else {
        container.childNodes[randomCard].classList.add("chosen");
        showChosen = true;
    }
}

async function loadCards() {
    const res = await fetch(DATA_URL);
    const data = await res.json();

    const container = document.getElementById("container");

    data.cards.forEach((item, index) => {
        const card = document.createElement("div");
        cards++;

        card.className = "card";

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${item.image}" alt="img">
                    <h3>${item.text}</h3>
                    <h6>${item.role}</h6>
                </div>
            </div>
        `;

        card.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            card.classList.toggle("crossed");
        });

        container.appendChild(card);
    });

    randomCard = getRandomInt(0, cards - 1);

    container.childNodes[randomCard].classList.add("chosen");

}

loadCards();