<template>
  <div id="app">
    <header class="heroCon">
      <img src="/static/hero_image.jpg" alt="Heirloom tomatoes hero image">
      <div class="overlayDiv"></div>
      <div class="heroOverlay">
        <h1 class="heroTitle">Nutrition Finder</h1>
        <div class="searchCon">
            <input type="text" placeholder="search for food item" v-model="searchStr" @keyup="foodSearch">
            <i class="fa fa-search" aria-hidden="true"></i>
        </div>
      </div>
    </header>
    
    <div class="results">
      <router-view :searchResults="searchResults"/>
    </div>
    <div class="welcomeDisplay" v-if="showWelcomeMessage">
      <i class="fa fa-arrow-up" aria-hidden="true"></i>
      <p>Search for a food item</p>
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
        searchStr: "",
        RESULTS_PER_PAGE: 50, // 50 search results are provided per page 
        currentPage: 1 // current page in paginated search results
      }
    },
    computed: {
        showWelcomeMessage: function() {
          return this.searchStr == "";
        }
    },
    methods: {
      foodSearch: function() {
        // this.showSearchResults = true;
        var self = this;
        axios.get(`https://api.nal.usda.gov/fdc/v1/search?${db_config.API_KEY}&generalSearchInput=${this.searchStr}&pageNumber=${this.currentPage}`)
          .then((response) => {
            self.searchResults = response.data;
            self.currentPage = response.data.currentPage;
            // self.$route.router.go('/'); //~redirect to search results
        })
          .catch((err) => {
            console.error(err);
        });
      }, 

      // paginated search methods
      // go to next page, if exists
      nextPage: function() {
        if(this.hasNextPage()) {
          this.currentPage++;
        }
      },
      // go to previous page, if exists
      prePage: function() {
        if(this.hasPrevPage()) {
          this.currentPage--;
        }
      },
      // check if there is a next page 
      hasNextPage: function() {
        let totalPages = Math.ceil(this.searchResults.totalHits / this.RESULTS_PER_PAGE); 
        return this.currentPage < totalPages;
      },
       // check if there is a previous page 
      hasPrevPage: function() {
        return this.currentPage > 0;
      }
    }
  }
</script>  

<style lang="scss">
  $desktopWidth: 768px;
  $heroHeight: 25vh;
  $leftMargin: 15vw;
  $heroHeightDesktop: 30vh;
  $overlayFilter: rgba(110, 44, 11, 0.29);
  $black: #271D1D;
  
  //mixins
  @mixin textShadow() {
    text-shadow: 0.5px 0.5px 50px rgb(110, 44, 11);
  }

  body {
    color: $black;
  }
  .hidden {
    display: none;
  }
  .heroCon {
    color: white;
    @include textShadow; 
    margin: 0 auto;

    .heroTitle {
      margin-top: 5vh;
      margin-left: 10vw;
      text-align: center;
      font-size: 5vh;
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
      margin-top: -$heroHeight;
      width: 100vw;
      height:  $heroHeight; 
    }
    .searchCon {
      margin-top: 10px;
      text-align: center;
      margin-left: $leftMargin;
      input {
        background: none;
        border: none;
        font-size: 2.5vh; 
        border-bottom: solid 3px white;
        width: 70vw; 
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
    max-width: 75vw;
    margin-left: $leftMargin - 3vw;
    margin-top: 30px;
    margin-bottom: 10px;
    bottom: 0;
    text-align: center;
    font-size: 9px;
    color: lightslategray;
  }
  .welcomeDisplay {
    margin-top: 20px;
    text-align: center;
    .fa {
      margin-bottom: 20px;
    }
  }
  // desktop 
  @media screen and (min-width: $desktopWidth) {
       .heroCon {
          margin-top: 20px;
          img {
            height: $heroHeightDesktop;
          }
          .heroTitle {
              font-size: 10vh;
            }
          .searchCon {
            input {
              font-size: 4vh;
            }
          }
          .heroOverlay {
            margin-top: -$heroHeightDesktop;
          }
          .overlayDiv {
            margin-top: -$heroHeightDesktop;
            height: $heroHeightDesktop; 
          }
      }
  }
</style>