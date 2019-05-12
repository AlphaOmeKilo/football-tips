<template>
    <header>
        <ul class="uk-flex">
            <router-link tag="li" to="/">
                <a>Home</a>
            </router-link>
            <router-link tag="li" to="/add-result">
                <a>Add Results</a>
            </router-link>
            <router-link tag="li" to="/add-fixture">
                <a>Add Fixtures</a>
            </router-link>
        </ul>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style lang="scss" scoped>

header {
    height: 60px;
    width: 100%;
    background-color: #000;

    ul {
        list-style: none;
        height: 100%;
        align-items: center;

        li {
            margin-right: 20px;

            a {
                color: #FFF;
            }
        }
    }
}

</style>

