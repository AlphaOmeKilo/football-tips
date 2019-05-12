import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        teams: [
            "Arsenal", 
            "Bournemouth", 
            "Brighton",
            "Burnley",
            "Cardiff",
            "Chelsea",
            "Crystal Palace",
            "Everton",
            "Fulham",
            "Huddersfield",
            "Leicester",
            "Liverpool",
            "Manchester City",
            "Manchester United",
            "Newcastle United",
            "Southampton",
            "Tottenham",
            "Watford",
            "West Ham",
            "Wolves",
        ],
        games: []
    },
    mutations: {
        addResult(state, result) {
            state.games.push(result);
        }
    }
});