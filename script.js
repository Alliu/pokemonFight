let player;
let ennemy;

const display = (player, life) => {
    const p = document.getElementById(player.playerName);
    p.innerText = "";
    p.innerText = life;
};

const createBtn = (ennemy) => {
    if (document.getElementById(`${ennemy.playerName}-Btn`)) {
        document.getElementById(`${ennemy.playerName}-Btn`).remove();
    }
    const btn = document.createElement("button");
    btn.setAttribute("id", `${ennemy.playerName}-Btn`);
    btn.classList.add(
        "py-2",
        "px-8",
        "rounded-md",
        "text-white",
        "bg-amber-700",
        "text-2xl",
        "font-bold"
    );
    btn.innerText = "Attaquer";
    const myBox = document.getElementById(`${ennemy.playerName}-Box`);
    return myBox.appendChild(btn);
};

const displayAtkMsg = (message) => {
    document.getElementById("atkMsg").innerText = "";
    document.getElementById("atkMsg").innerText = message;
};

const displayMsg = (message) => {
    document.getElementById("msg").innerText = "";
    document.getElementById("msg").innerText = message;
};

const atkPlayer = (player) => {
    ptAtk = Math.floor(30 + Math.random() * 20);
    console.log(player.playerName + "before", player.life, ptAtk);
    player.life -= ptAtk;
    console.log(player.playerName + "after", player.life, ptAtk);
    return [player.life, ptAtk];
};

const endGame = () => {
    const hide = document.getElementById(`${ennemy.playerName}-Btn`);
    hide.setAttribute("disabled", "");
    hide.classList.add("invisible");
    const replayBtn = document.getElementById("startBtn");
    replayBtn.innerText = "Rejouer";
    const div = document.getElementById("start");
    div.removeChild(div.firstElementChild);
    div.classList.remove("hidden");
    replayBtn.addEventListener("click", () => {
        location.reload();
    });
};
const switchBtn = (players) => {
    if (ennemy.canPlay === true) {
        displayMsg(`C'est à ${ennemy.playerName} de jouer!`);
        setTimeout(() => {
            const result = atkPlayer(player);
            console.log(result);
            displayAtkMsg(
                `${ennemy.playerName} a attaqué ${player.playerName} de ${result[1]} points!`
            );

            if (player.life <= 0) {
                display(playerplayer, player.playerName + " 0 PV ! ");
                displayMsg(
                    `${ennemy.playerName} a battu ${player.playerName}!`
                );

                endGame();
            } else {
                display(player, player.playerName + " :" + player.life + " PV");
                ennemy.canPlay = false;
                player.canPlay = true;
                switchBtn(players);
            }
        }, "2000");
    } else {
        const showBtn = createBtn(ennemy);
        showBtn.removeAttribute("disabled");
        showBtn.classList.remove("invisible");
        console.log(showBtn);
        displayMsg(`C'est à ${player.playerName} de jouer!`);
        showBtn.addEventListener("click", () => {
            const hide = document.getElementById(`${ennemy.playerName}-Btn`);
            hide.setAttribute("disabled", "");
            hide.classList.add("invisible");
            showBtn.setAttribute("disabled", "");
            showBtn.classList.add("invisible");
            const result = atkPlayer(ennemy);
            displayAtkMsg(
                `${player.playerName} a attaqué ${ennemy.playerName} de ${result[1]} points!`
            );
            if (ennemy.life <= 0) {
                display(ennemy, ennemy.playerName + " 0 PV ! ");
                displayMsg(
                    `${player.playerName} a battu ${ennemy.playerName}!`
                );
                endGame();
            } else {
                display(ennemy, ennemy.playerName + " :" + ennemy.life + " PV");
                player.canPlay = false;
                ennemy.canPlay = true;
                switchBtn(players);
            }
        });
    }
};

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", async () => {
    players = await initPlayers();
    player = players[0];
    ennemy = players[1];
    document.getElementById("start").classList.add("hidden");
    const h1 = document.createElement("h1");
    h1.innerText = "Le duel peut commencer!";
    document.querySelector("header").appendChild(h1);
    document.getElementById("game").classList.remove("hidden");
    player.canPlay = true;
    players.map((attakant) => {
        const playerBox = document.createElement("div");
        playerBox.setAttribute("id", `${attakant.playerName}-Box`);
        playerBox.classList.add(
            "flex",
            "flex-col",
            "justify-center",
            "items-center",
            "gap-4"
        );
        document.getElementById("game").appendChild(playerBox);
        const imgPlayer = document.createElement("img");
        imgPlayer.setAttribute("src", attakant.imgSrc);
        imgPlayer.classList.add("w-full", "mx-auto");
        const p = document.createElement("p");
        p.setAttribute("id", `${attakant.playerName}`);
        p.classList.add("font-bold", "text-2xl");
        playerBox.append(imgPlayer, p);
        display(attakant, attakant.playerName + " : " + attakant.life + "  PV");
        const msgAtk = document.createElement("p");
        msgAtk.setAttribute("id", "atkMsg");
        msgAtk.classList.add("text-2xl", "font-bold");
        document
            .getElementById("game")
            .insertAdjacentElement("beforebegin", msgAtk);
        const msg = document.createElement("p");
        msg.setAttribute("id", "msg");
        msg.classList.add("text-2xl", "font-bold", "mt-12");
        document.getElementById("game").insertAdjacentElement("afterend", msg);
    });
    switchBtn(players);
});
