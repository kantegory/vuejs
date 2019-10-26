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
    newTask (state, payLoad) {
      state.tasks.push(payLoad)
    }
  },
  actions: {
    newTask ({commit}, payLoad) {
      commit('newTask', payLoad)
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
