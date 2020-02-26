<template>
  <div class="container">
    <p class="totalSearchResults" v-if="searchResultCount > 0">{{ searchResultCount }} matches found</p>
    <!-- <div class="arrowKeys">
      <i class="fa fa-arrow-left" aria-hidden="true" @click="goToNextPage"></i> 
      <i class="fa fa-arrow-right" aria-hidden="true" @click="goToPrevPage"></i>
    </div> -->
    <ul>
      <search-result :searchResult="result"
      v-for="result in searchResults.foods" 
      :key="result.fdcId"/>
    </ul>
  </div>
</template>

<script>
import SearchResult from "@/components/SearchResult.vue";
export default {
  name: "Index",
  props: [ 'searchResults' ], 
  components: {
    'search-result' : SearchResult
  }, 
  computed: {
    searchResultCount: function() {
      return this.searchResults.totalHits;
    }
  }, 
  methods: {
    setEvent: function() {
        console.log('in here')
        this.eventData = !this.eventData;
      },
  }
};
</script>

<style scoped lang="scss">
  $black: #271D1D;
  .totalSearchResults {
    margin: 20px 0px;
    text-align: center;
  }
  ul {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 75vw;
  }
  .arrowKeys {
    text-align: center;
    .fa {
      margin-right: 10px;
    }
    .fa:hover {
      cursor: pointer;
      background-color: $black;
      color: white;
    }
  }
</style>
