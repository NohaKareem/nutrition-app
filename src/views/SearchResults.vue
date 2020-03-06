<template>
  <div class="container" v-if="searchResultCount > 0">
    <p class="totalSearchResults">{{ searchResultCount }} matches found</p>
    <!-- <div class="arrowKeys">
      <i class="fa fa-arrow-left" aria-hidden="true" @click="goToPrevPage()"></i> 
      <i class="fa fa-arrow-right" aria-hidden="true" @click="goToNextsPage()"></i>
    </div> -->
    <ul>
      <search-result
        :searchResult="result"
        v-for="result in searchResults.foods"
        :key="result.fdcId"
      />
    </ul>
  </div>
</template>

<script>
import SearchResult from "@/components/SearchResult.vue";
export default {
  name: "Index",
  props: ["searchResults"],
  components: {
    "search-result": SearchResult
  },
  computed: {
    searchResultCount: function() {
      return this.searchResults.totalHits;
    }
  },
  methods: {
    goToNextPage: function() {
      this.$emit("gotoNextPage");
    },
    goToPrevPage: function() {
      this.$emit("gotoPrevPage");
    }
  }
};
</script>

<style scoped lang="scss">
$black: #271d1d;
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
