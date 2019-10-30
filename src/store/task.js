import firebase from 'firebase/app'

import Task from './task_help'

export default {
  state: {
    tasks: [
      {
        'id': 1,
        'title': 'El Camino',
        'description': 'A Breaking Bad Movie (or simply El Camino) is a 2019 American neo-western crime thriller film that serves as an epilogue to the television series Breaking Bad. Series creator Vince Gilligan wrote, directed, and produced the film, while Aaron Paul reprised his role as Jesse Pinkman.',
        'whatWatch': 'Film',
        'completed': false,
        'editing': false,
        'tags': ['Comedy'],
        'time': '2 Hours 2 Minutes'
      },
      {
        'id': 2,
        'title': 'Better Call Saul',
        'description': 'Set in the early and mid 2000s, Better Call Saul follows the story of con-man turned small-time lawyer, Jimmy McGill (Bob Odenkirk), six years before the events of Breaking Bad, showing his transformation into the persona of criminal-for-hire Saul Goodman.',
        'whatWatch': 'Serial',
        'completed': true,
        'editing': false,
        'tags': ['Adventure'],
        'time': '30 Hours 0 Minutes'
      }
    ]
  },
  mutations: {
    newTask (state, payload) {
      state.tasks.push(payload)
    }
  },
  actions: {
    async newTask ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        // logic
        const newTask = new Task (
          payload.title,
          payload.description,
          payload.whatWatch,
          payload.time,
          payload.tags,
          payload.completed,
          payload.editing,
          getters.user.id
        )

        const task = await firebase.database().ref('tasks').push(newTask)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    // newTask ({commit}, payload) {
    //   commit('newTask', payload)
    // },
    writeTaskData (task) {
      firebase.database().ref('tasks' + task.id).set({
        'title': task.title,
        'description': task.description,
        'whatWatch': task.whatWatch,
        'completed': task.completed,
        'editing': task.editing,
        'tags': task.tags,
        'time': task.time
      })
    },
    updateTaskData (task) {
      return firebase.database.ref().update(task)
    }
  },
  getters: {
    tasks (state) {
      return state.tasks
    },
    tasksCompleted (state) {
      return state.tasks.filter((task) => {
        return task.completed
      })
    },
    tasksActive (state) {
      return state.tasks.filter((task) => {
        return task.completed === false
      })
    }
  }
}
