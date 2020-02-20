<template>
    <span>
        {{ tag-title }}
    </span>
</template>

<script>
    export default {
    name: "Tag",
    props: ['tag-title']
    };
</script>

<style scoped lang="scss">
    span {
        background-color: goldenrod;
        color: white;
        border-radius: 5px;
        padding: 2px 5px;
        margin-right: 3px;
    }
</style>
