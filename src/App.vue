<template>
  <div id="app">
    <input type="text" value="search for food item" v-model="searchStr" @keyup="foodSearch">
    <div id="nav">
      <router-view :searchResults="searchResults" />
    </div>
    <router-view />
  </div>
</template>

<script>
  import axios from 'axios';
  import db_config from './db_config.js';
  export default {
    name: "App",
    data() {
      return {
        searchResults: [], 
        searchStr: ""
      }
    }, 
    created: function() {
      this.searchStr = "oats";
      this.foodSearch();
    }, 
    methods: {
      foodSearch: function(){
        var self = this;
        axios.get(`https://api.nal.usda.gov/fdc/v1/search?${db_config.API_KEY}&generalSearchInput=${this.searchStr}`)
          .then((response) => {
            self.searchResults = response.data.foods;
            this.current
        })
          .catch((err) => {
            console.error(err);
        });
      }
    }
  }
</script>  

<style lang="scss">
  body {
    font-family: 'Raleway', sans-serif;
  }
</style>
