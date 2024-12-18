const api = useApi();

const getRandomPokemon = async () => {
    try {
        const {data} = await api.get(Math.floor(Math.random() *150)+"/");
       return data;
    } catch (error) {
        console.error(error);
    }
};