<template>
    <div class="container">
        <li>
            <p>
                <router-link :to="`/foodItem/${searchResult.fdcId}`">
                    {{ foodName }}
                    <!-- key~ -->
                    {{tags}}
                    <tag :tag-title="currTag" v-for="currTag in tags" :key="currTag" />
                </router-link>
            </p>
        </li>
    </div>
</template>

<script>
    import Tag from "@/components/Tag.vue";

    export default {
    name: "SearchResult",
    components: { 'tag': Tag },
    props: ['searchResult', 'searchStr'], 
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
    li {
        list-style-type: square;
    }
</style>
