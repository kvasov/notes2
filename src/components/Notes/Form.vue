<template>
  <div class="note-form__wrapper">
    <form class="note-form" @submit.prevent="onSubmit">
      <textarea required v-model="value" placeholder="Type ur note" />
      <TagsList @onChangeSelectedTag="changeSelectedTag" :items="tags" />
      <button class="btn btnPrimary" type="submit">Add new note</button>
    </form>
  </div>
</template>

<script>
import TagsList from '@/components/UI/TagsList.vue'
export default {
  components: { TagsList },
  data() {
    return {
      value: '',
      tags: [
        {
          title: 'home',
          selected: false
        },
        {
          title: 'work',
          selected: false
        },
        {
          title: 'travel',
          selected: false
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      let tags = []
      this.tags
        .filter(tag => tag.selected)
        .forEach(item => {
          tags.push({ title: item.title })
        })
      this.$emit('onSubmit', { title: this.value, tags: tags })
      this.value = ''
      this.tags.forEach(item => {
        item.selected = false
      })
    },
    changeSelectedTag(tagTitle) {
      let targetTag = this.tags.find(item => item.title == tagTitle)
      targetTag.selected = !targetTag.selected
    }
  }
}
</script>

<style lang="scss">
.note-form__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.note-form {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  textarea {
    margin-bottom: 0;
  }
}
</style>
