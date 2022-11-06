import { createStore } from 'vuex'
import { saveLS, readLS } from '@/components/utils/storage'

export const store = createStore({
  state: {
    newNote: {
      title: '',
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
    },
    notes: [
      {
        title: 'Learn Vue 3',
        tags: [{ title: 'work' }]
      },
      {
        title: 'Finish course',
        tags: [{ title: 'work' }, { title: 'home' }]
      },
      {
        title: 'QWEqw eqw qwe qwe',
        tags: [{ title: 'asd' }, { title: 'zxzxczxc' }]
      }
    ]
  },
  getters: {
    getNotes(state) {
      return state.notes
    },
    getNewNoteTitile(state) {
      return state.newNote.title
    },
    getNewNoteTags(state) {
      return state.newNote.tags
    },
    getNewNoteTagVal(state, index) {
      return state.newNote.tags[index].selected
    }
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes
    },
    setNewNoteTitle(state, title) {
      state.newNote.title = title
    },
    setNewNoteTags(state, tags) {
      state.newNote.tags = tags
    }
  },
  actions: {
    setNotes({ commit }, notes) {
      commit('setNotes', notes)
      saveLS(notes)
    },
    getActualNotes({ commit }) {
      const localNotes = readLS()
      if (localNotes) {
        commit('setNotes', JSON.parse(localNotes))
      }
    },
    removeNote({ dispatch, getters }, index) {
      let notes = getters.getNotes
      notes.splice(index, 1)
      dispatch('setNotes', notes)
    },
    setNewNoteTags({ commit }, tags) {
      commit('setNewNoteTags', tags)
    },
    changeSelectedTag({ commit, getters }, tagTitle) {
      let tags = getters.getNewNoteTags
      let targetTagId = tags.findIndex(item => item.title == tagTitle)
      tags[targetTagId].selected = !tags[targetTagId].selected
      commit('setNewNoteTags', tags)
    },
    addNewNote({ dispatch, getters }) {
      let newNoteTags = []
      let tags = getters.getNewNoteTags
      tags
        .filter(item => item.selected)
        .forEach(item => {
          newNoteTags.push({ title: item.title })
        })
      let notes = getters.getNotes
      notes.push({ title: getters.getNewNoteTitile, tags: newNoteTags })
      dispatch('setNotes', notes)
      dispatch('resetNewNote')
    },
    resetNewNote({ getters, commit }) {
      let newNoteTags = []
      let tags = getters.getNewNoteTags
      tags.forEach(item => {
        newNoteTags.push({ title: item.title, selected: false })
      })
      commit('setNewNoteTags', newNoteTags)
      commit('setNewNoteTitle', '')
    }
  }
})
