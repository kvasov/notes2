<template>
  <div class="tags-list">
    <TagItem
      v-for="item in items"
      :key="item"
      @onItemClick="this.$emit('onChangeSelectedTag', item.title)"
      :isPreview="isPreview"
      :item="item"
    >
    </TagItem>
  </div>
</template>

<script>
import TagItem from '@/components/UI/TagItem'
export default {
  components: { TagItem },
  props: {
    items: {
      type: Array,
      reqired: true
    },
    isPreview: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.tags-list {
  padding: 10px 0;
  display: flex;
  justify-content: center;
}
</style>
