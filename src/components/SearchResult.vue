<template>
    <li v-if="inSearchResults">
        <p>
            <router-link :to="`/foodItem/${searchResult.fdcId}`">
                {{ foodName }}
            </router-link>
            <tag :tagTitle="tag" v-for="tag in tags" :key="tag" />
        </p>
    </li>
</template>

<script>
    import Tag from "@/components/Tag.vue";

    export default {
    name: "SearchResult",
    components: { 'tag': Tag },
    props: ['searchResult', 'searchStr'], 
    data() {
        return {
            inSearchResults: true,
        }
    },
    computed: { 
        description: function () {
            let descr = this.searchResult.description;
            descr = descr[0] + descr.slice(1).toLowerCase();
            return descr;
        }, 
        tags: function() {
            return this.description.split(', ').slice(1);
        }, 
        foodName: function() {
            return this.description.split(', ')[0];
        }
    }
    };
</script>

<style scoped lang="scss">
    $black: #271D1D;

    li {
        flex: 1 1 150px;
        list-style-type: none;
        margin: 5px 50px;
        // border-left: 1px black solid;
        // max-width: 100px;
        a {
            text-decoration: none;
            color: $black;
            line-height: 25px;
            padding: 3px;
            border-radius: 2px;
        }
        a:hover {
            background-color: $black;
            color: white;
        }
    }
</style>
