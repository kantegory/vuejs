<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 Home
        input(
          type="text"
          placeholder="What we will watch?"
          v-model="taskTitle"
          @keyup.enter="newTask"
        )
        textarea(
          type="text"
          placeholder="Write a few words about..."
          v-model="taskDescription"
          @keyup.enter="newTask"
        )
        .option-list
          input.what-watch--radio(
            type="radio"
            id="radioFilm"
            value="Film"
            v-model="whatWatch"
          )
          label(
            for="radioFilm"
          ) Film
          input.what-watch--radio(
            type="radio"
            id="radioSerial"
            value="Serial"
            v-model="whatWatch"
          )
          label(
            for="radioSerial"
          ) Serial
        .total-time

          // film time
          .total-time__film(
            v-if="whatWatch === 'Film'"
          )
            span.time-title Hours:
            input.time-input(
              type="number"
              v-model="filmHours"
            )
            span.time-title Minutes:
            input.time-input(
              type="number"
              v-model="filmMinutes"
            )

            p.total-time__duration Total time: {{ filmTime }}

          // serial time
          .total-time__serial(
            v-if="whatWatch === 'Serial'"
          )
            span.time-title How many seasons?
            input.time-input(
              type="number"
              v-model="serialSeasons"
            )
            span.time-title How many average series per season?
            input.time-input(
              type="number"
              v-model="serialSeries"
            )
            span.time-title Average duration of series (minutes)?
            input.time-input(
              type="number"
              v-model="serialSeriesDuration"
            )

            p.total-time__duration Total time: {{ serialTime }}

          .tag-list
            .ui-tag__wrapper(
              v-for="tag in tags"
              :key="tag.title"
            )
              .ui-tag(
                @click="addTagUsed(tag)"
                :class="{active: tag.use}"
              )
                span.tag-title {{ tag.title }}
                span.button-close
        button(
          type="submit"
          class="button--round button button-primary"
          @click="newTask"
        ) Send
</template>

<script>
export default {
  data () {
    return {
      taskTitle: '',
      taskDescription: '',
      whatWatch: '',
      taskId: 3,

      // Total time
      // Film
      filmHours: 0,
      filmMinutes: 0,

      // Serial
      serialSeasons: 0,
      serialSeries: 0,
      serialSeriesDuration: 0,

      // Tags
      tagsUsed: [],
      tags: [
        {
          title: 'Comedy',
          use: false
        },
        {
          title: 'Western',
          use: false
        },
        {
          title: 'Adventure',
          use: false
        }
      ]
    }
  },
  methods: {
    newTask () {
      if (this.taskTitle === '') {
        return
      }
      let time = this.whatWatch === 'Film' ? this.filmTime : this.serialTime
      const tasks = {
        id: this.taskId,
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        time: time,
        completed: false,
        editing: false
      }

      console.log(tasks)
      // Reset
      this.taskId += 1
      this.taskTitle = ''
      this.taskDescription = ''
    },
    getDuration (minutes) {
      if (minutes >= 0) {
        console.log('it works')
        let hours = ~~(minutes / 60)
        let min = minutes % 60
        return hours + ' Hours ' + min + ' Minutes'
      }
    },
    addTagUsed (tag) {
      tag.use = !tag.use

      if (tag.use) {
        this.tagsUsed.push(tag.title)
      } else {
        this.tagsUsed.splice(tag.title)
      }
    }
  },
  computed: {
    filmTime () {
      let hours = this.filmHours !== '' ? parseInt(this.filmHours, 10) : 0
      let minutes = this.filmMinutes !== '' ? parseInt(this.filmMinutes, 10) : 0
      let min = hours * 60 + minutes

      return this.getDuration(min)
    },
    serialTime () {
      let serialSeasons = this.serialSeasons !== '' ? parseInt(this.serialSeasons, 10) : 0
      let serialSeries = this.serialSeries !== '' ? parseInt(this.serialSeries, 10) : 0
      let serialSeriesDuration = this.serialSeriesDuration !== '' ? parseInt(this.serialSeriesDuration, 10) : 0
      let min = serialSeasons * serialSeries * serialSeriesDuration
      return this.getDuration(min)
    }
  }
}
</script>

<style lang="stylus" scoped>
.option-list
  display flex
  .what-watch--radio
    margin-right 12px
    &:last-child
      margin-right 0
  label
    margin-right 20px
    &:last-child
      margin-right 0
button
  margin-top 18px
// total time
.total-time
  margin-bottom 20px
.time-title
  display block
  margin-bottom 6px
.time-input
  max-width 80px
  margin-right 10px
.total-time__duration
  margin-bottom 20px
// tags
.ui-tag
  cursor pointer
  margin-right 6px
.ui-tag.active
  background #444ce0
  color #fff
  span.button-close
    color #fff
</style>
