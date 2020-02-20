<template>
    <header>
        <!-- <input type="text" value="search for food item" v-if="search" v-model="searchStr" @keyup="foodSearch"> -->
        <div  @click="search = !search">
            <i class="fa fa-search" aria-hidden="true"></i>
        </div>

    </header>
</template>

<script>
    export default {
        name: "SearchMenu", 
        data() {
            return {
                search: true
            }
        }
    };
</script>

<style scoped lang="scss">
    header {
        text-align: right;
        margin-right: 10px;

        .fa.fa-search:hover {
            cursor: pointer;
        }
    }
</style>
