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
  computed: {
    value: {
      get() {
        return this.$store.getters.getNewNoteTitile
      },
      set(value) {
        this.$store.commit('setNewNoteTitle', value)
      }
    },
    tags() {
      return this.$store.getters.getNewNoteTags
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('addNewNote')
    },
    changeSelectedTag(tagTitle) {
      this.$store.dispatch('changeSelectedTag', tagTitle)
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
