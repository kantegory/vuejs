// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App'
import router from './router'
import Uimini from 'uimini/dist/css/uimini.css'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

Vue.use(Uimini)
Vue.use(Vuelidate)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

  created () {
    var firebaseConfig =
    {
      apiKey: 'AIzaSyB5hrnjPsUFghZkDU190QvXyIACgFOdY5E',
      authDomain: 'vue-film-library.firebaseapp.com',
      databaseURL: 'https://vue-film-library.firebaseio.com',
      projectId: 'vue-film-library',
      storageBucket: 'vue-film-library.appspot.com',
      messagingSenderId: '951065681986',
      appId: '1:951065681986:web:7e46358b0df16075914ddb',
      measurementId: 'G-2ZR2L6EDYK'
    }

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)

    // Get a reference to the database service
    // var database = firebase.database()

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('loggedUser', user)
      }
    })
  }
})
