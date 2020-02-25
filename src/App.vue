<template>
  <div id="app">
    <div class="searchCon">
      <input type="text" value="search for food item" placeholder="search for food item" v-model="searchStr" @keyup="foodSearch">
    </div>
    <div id="nav">
      <router-view :searchResults="searchResults" />
    </div>
    <footer>Data by U.S. Department of Agriculture, Agricultural Research Service. FoodData Central, 2019. fdc.nal.usda.gov.</footer>
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
            self.searchResults = response.data;
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
  .searchCon {
    text-align: center;
    input {
      border: none;
      border-bottom: solid 3px black;
      width: 71vw; //~
    }
  }
  body {
    font-family: 'Raleway', sans-serif;
  }
  footer {
    margin-top: 30px;
    margin-bottom: 10px;
    text-align: center;
    font-size: 10px;
    color: lightslategray;
  }
</style>
