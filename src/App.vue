<template>
  <div id="app">
    <Header></Header>
    <div id="router-content">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  name: 'app',
  components: {
    Header,
    Footer
  }
}
</script>

<style>


body {
  margin: 0;
}

#router-content {
  min-height: calc(100vh - 120px);
}

h1 {
  font-size: 34px;
}

</style>
