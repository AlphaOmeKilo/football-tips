<template>
    <div class="uk-section">
        <div class="uk-container">
            <div v-for="(fixture, index) in fixtures" v-bind:key="index">
                <h1>{{fixture.homeTeam}} - {{fixture.awayTeam}}</h1>
                <h2>{{calcBTTS(fixture.homeTeam, fixture.awayTeam)}}</h2>
                <div class="uk-flex">
                    <div class="uk-margin-large-right">
                        <p v-for="(game, index) in homeTeamFixtures(fixture.homeTeam)" v-bind:key="index">
                            {{game.homeTeam}} {{game.homeGoals}} - {{game.awayGoals}} {{game.awayTeam}}
                        </p>
                    </div>
                    <div>
                        <p v-for="(game, index) in awayTeamFixtures(fixture.awayTeam)" v-bind:key="index">
                            {{game.homeTeam}} {{game.homeGoals}} - {{game.awayGoals}} {{game.awayTeam}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '../firebase'

export default {
    name: 'Home',
    data() {
        return {
            games: [],
            fixtures: [],
            gameRef: firebase.firestore().collection('games'),
            fixtureRef: firebase.firestore().collection('fixtures'),
        }
    },
    methods: {
        homeTeamFixtures: function(homeTeam) {
            return this.games.filter(function (game) {
                return game.homeTeam == homeTeam;
            })
        },
        awayTeamFixtures: function(awayTeam) {
            return this.games.filter(function (game) {
                return game.awayTeam == awayTeam;
            })
        },
        calcBTTS: function(homeTeam, awayTeam) {
            const homeGames = this.games.filter(function (game) {
                return game.homeTeam == homeTeam;
            });

            const awayGames = this.games.filter(function (game) {
                return game.awayTeam == awayTeam;
            });

            const homeGameCount = homeGames.length;
            const awayGameCount = awayGames.length;

            let homeGameBTTS = 0;
            let awayGameBTTS = 0;
            let homeScore = 0;
            let homeTotalGoals = 0;
            let homeFailToScore = 0;
            let awayScore = 0;
            let awayTotalGoals = 0;
            let awayFailToScore = 0;
            let homeCleanSheet = 0;
            let awayCleanSheet = 0;

            homeGames.forEach(function(game) {
                if(game.homeGoals > 0 && game.awayGoals > 0) {
                    homeGameBTTS++;
                }

                if(game.homeGoals > 0 ) {
                    homeScore++;
                } else {
                    homeFailToScore++;
                }

                if(game.awayGoals == 0 ) {
                    homeCleanSheet++;
                }

                homeTotalGoals += parseInt(game.homeGoals);
                
            });

            awayGames.forEach(function(game) {
                if(game.homeGoals > 0 && game.awayGoals > 0) {
                    awayGameBTTS++;
                }

                if(game.awayGoals > 0) {
                    awayScore++;
                } else {
                    awayFailToScore++;
                }

                if(game.HomeGoals == 0) {
                    awayCleanSheet++;
                }

                awayTotalGoals += parseInt(game.awayGoals);
            });

            const homeBTTSPercent = homeGameBTTS / homeGameCount;
            const awayBTTSPercent = awayGameBTTS / awayGameCount;
            const homeScorePercent = homeScore / homeGameCount;
            const awayScorePercent = awayScore / awayGameCount;

            const homePercent = (homeBTTSPercent + homeScorePercent) / 2;
            const awayPercent = (awayBTTSPercent + awayScorePercent) / 2;

            let divider = 2;

            if (homeCleanSheet >= 4 || awayCleanSheet >= 4) {
                divider += 0.5;
            }

             if (homeFailToScore >= 3 || awayFailToScore >= 3) {
                divider += 0.5;
            }

            if (homeScorePercent < 0.5 || awayScorePercent < 0.5) {
                divider += 0.5;
            }

            if (homeScorePercent < 0.3) {
                divider += 0.5;
            }

            if (awayScorePercent < 0.3) {
                divider += 0.5;
            }

            let BTTS = (homePercent + awayPercent) / divider;

            // if(BTTS > 1) {
            //     BTTS = 1;
            // }

            const homeGoals = (homeTotalGoals / homeGameCount) - (awayCleanSheet / homeGameCount);
            const awayGoals = (awayTotalGoals / awayGameCount) - (homeCleanSheet / awayGameCount);

            return "BTTS - " + BTTS + ", Score: " + Math.round(homeGoals) + " - " + Math.round(awayGoals);
        }
    },
    created () {
        this.gameRef.onSnapshot((querySnapshot) => {
            this.games = [];
            querySnapshot.forEach((game) => {
                this.games.push({
                    date: game.data().date,
                    homeTeam: game.data().homeTeam,
                    homeGoals: game.data().homeGoals,
                    awayGoals: game.data().awayGoals,
                    awayTeam: game.data().awayTeam
                });
            });
        });

        this.fixtureRef.onSnapshot((querySnapshot) => {
            this.fixtures = [];
            querySnapshot.forEach((fixture) => {
                this.fixtures.push({
                    homeTeam: fixture.data().homeTeam,
                    awayTeam: fixture.data().awayTeam
                });
            });
        });
    },
}
</script>

<style lang="scss" scoped>

</style>
