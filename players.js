const initPlayers = async () => {
    const randomPokemon1 = await getRandomPokemon();
    const randomPokemon2 = await getRandomPokemon();
    // console.log(randomPokemon1.forms[0].name);
    // console.log(randomPokemon1.sprites.back_default);
    // console.log(randomPokemon1.base_experience);
    const players = [
        {
            playerName: randomPokemon1.forms[0].name,
            imgSrc: randomPokemon1.sprites.back_default,
            life: randomPokemon1.base_experience,
            canPlay: false,
        },
        {
            playerName: randomPokemon2.forms[0].name,
            imgSrc: randomPokemon2.sprites.front_default,
            life: randomPokemon2.base_experience,
            canPlay: false,
        },
    ];
    return players;
};

let players;
