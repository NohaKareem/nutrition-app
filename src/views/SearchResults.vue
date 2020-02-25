<template>
  <div class="container">
    <p class="totalSearchResults">{{ searchResultCount }} matches found</p>
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
      console.log('cake')
      console.log(this.searchResults.totalHits)
      return this.searchResults.totalHits;
    }
  }
};
</script>

<style scoped lang="scss">
  .totalSearchResults {
    text-align: center;
  }
  ul {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 75vw;
    // flex-basis: 5px;
    // grid-template-columns: repeat(3, minmax(0, 1fr));
  }
</style>
