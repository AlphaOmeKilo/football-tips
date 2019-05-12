<template>
    <div>
        <div class="uk-section">
            <div class="uk-container">
                <h1>Add Fixture</h1>
                <div class="uk-flex uk-flex-center uk-grid-collapse" uk-grid>
                    <multiselect v-model="fixture.homeTeam" :options="options" class="uk-width-1-2"></multiselect>
                    <multiselect v-model="fixture.awayTeam" :options="options" class="uk-width-1-2"></multiselect>

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
    name: "AddFixture",
    components: { Multiselect },
    computed: {
        teams() {
            return this.$store.state.teams
        }
    },
    data() {
        return {
            ref: firebase.firestore().collection('fixtures'),
            options: this.$store.state.teams,
            fixture: {}
        }
    },
    methods: {
        addResult: function() {
            this.ref.add(this.fixture).then(() => {
                this.fixture.homeTeam = '';
                this.fixture.homeGoals = '';
                this.fixture.awayGoals = '';
                this.fixture.awayTeam = '';
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
