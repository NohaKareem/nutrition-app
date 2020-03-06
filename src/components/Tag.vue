<template>
  <span>
    {{ tagTitle }}
  </span>
</template>

<script>
export default {
  name: "Tag",
  props: ["tagTitle"]
};
</script>

<style scoped lang="scss">
span {
  background-color: goldenrod;
  color: white;
  border-radius: 5px;
  padding: 2px 5px;
  margin-right: 5px;
  line-height: 25px;
}
</style>
