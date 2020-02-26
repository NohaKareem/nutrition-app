import Vue from "vue";
import VueRouter from "vue-router";
import SearchResults from "../views/SearchResults.vue";
import FoodItem from "../views/FoodItem.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: '/'
  }, 
  {
    path: '/', 
    component: SearchResults
  }, 
  { 
    path: '/foodItem/:id',
    component: FoodItem
  }
];

const router = new VueRouter({
  routes
});

export default router;