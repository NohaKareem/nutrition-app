<template>
  <div id="app">
    <div class="heroCon">
      <img src="/static/hero_image.jpg" alt="Heirloom tomatoes hero image">
      <div class="overlayDiv"></div>
      <div class="heroOverlay">
        <h1 class="heroTitle">Nutrition App</h1>
        <div class="searchCon">
            <input type="text" value="search for food item" placeholder="search for food item" v-model="searchStr" @keyup="foodSearch">
            <i class="fa fa-search" aria-hidden="true"></i>
        </div>
      </div>
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
      foodSearch: function() {
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
  $heroHeight: 25vh;
  $overlayFilter: rgba(110, 44, 11, 0.29);
  //mixins
  @mixin textShadow() {
    text-shadow: 0.5px 0.5px 50px rgb(110, 44, 11);
  }
  .heroCon {
    margin-top: 0px;
    color: white;
    @include textShadow; 
    margin: 0 auto;

    .heroTitle {
      margin-top: 20px;
      margin-left: 10vw;
      text-align: center;
      font-size: 8vh;
    }
    img {
        object-fit: cover;
        width: 100vw;
        height: $heroHeight;
    }
    .heroOverlay {
      position: absolute;
      margin-top: -$heroHeight;
    }
    .overlayDiv {
      background-color: $overlayFilter;
      position: absolute;
      /* z-index: 100; */
      margin-top: -$heroHeight;
      width: 100vw;
      height:  $heroHeight; 
    }
    .searchCon {
      margin-top: 10px;
      text-align: center;
      margin-left: 15vw;
      input {
        background: none;
        border: none;
        font-size: 4vh; 
        // font-size: 30px;
        border-bottom: solid 3px white;
        width: 70vw; //~
        color: white;
        @include textShadow; 
        margin-top: 20px;
      }
      .fa {
        margin-left: -20px;
      }
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
