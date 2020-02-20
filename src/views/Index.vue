<template>
  <div class="container">
    <p>{{ searchResults.length }} matches found</p>
    <ul>
      <search-result :searchResult="result"
      v-for="result in searchResults" 
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
  }
};
</script>

<style scoped lang="scss">
</style>
