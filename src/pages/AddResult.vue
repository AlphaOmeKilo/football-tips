<template>
    <div>
        <div class="uk-section">
            <div class="uk-container">
                <h1>Add Results</h1>
                <div class="uk-flex uk-flex-center uk-grid-collapse" uk-grid>
                    <div class="uk-width-1-1">
                        <input id="date" type="date" value="2018-01-01" v-model="game.date">
                    </div>
                    <multiselect v-model="game.homeTeam" :options="options" class="uk-width-1-3"></multiselect>
                    <input class="uk-input uk-width-1-6" v-model="game.homeGoals" name="home-goals" type="text">
                    <input class="uk-input uk-width-1-6" v-model="game.awayGoals" name="away-goals" type="text">
                    <multiselect v-model="game.awayTeam" :options="options" class="uk-width-1-3"></multiselect>

                    <div class="uk-width-1-1">
                        <button class="uk-button uk-button-primary uk-align-center uk-margin-top" v-on:click="addResult">Add</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import firebase from '../firebase'

export default {
    name: "AddResult",
    components: { Multiselect },
    computed: {
        teams() {
            return this.$store.state.teams
        }
    },
    data() {
        return {
            ref: firebase.firestore().collection('games'),
            options: this.$store.state.teams,
            game: {}
        }
    },
    methods: {
        addResult: function() {
            this.ref.add(this.game).then(() => {
                this.game.homeTeam = '';
                this.game.homeGoals = '';
                this.game.awayGoals = '';
                this.game.awayTeam = '';
            })
            .catch((error) => {
                alert("Error adding match result: ", error);
            });
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="less" scoped>

</style>
