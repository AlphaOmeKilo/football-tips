import Vue from "vue";
import Router from "vue-router";

import Home from "@/pages/Home";
import AddResult from "@/pages/AddResult";
import AddFixture from "@/pages/AddFixture";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/add-result",
      component: AddResult
    },
    {
      path: "/add-fixture",
      component: AddFixture
    },
  ]
});
