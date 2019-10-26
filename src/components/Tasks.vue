<template lang="pug">
  .content-wrapper
    .container
      .task-list__header
        h1.ui-title-1 Tasks
        .buttons-list
          button.button--round.button-default(
            @click="filter = 'active'"
          ) Active
          button.button--round.button-default(
            @click="filter = 'completed'"
          ) Completed
          button.button--round.button-default(
            @click="filter = 'all'"
           ) All

      .task-list
        .task-item(
          v-for="task in tasks"
          :key="task.id"
          :class="{ completed: task.completed }"
        )
          .ui-card.ui-card--shadow
            .task-item__info
              .task-item__main-info
                span.ui-label.ui-label--light {{ task.whatWatch }}
                span Total Time: {{ task.time }}
              span.button-close
            .task-item__content
              .task-item__header
                .ui-checkbox-wrapper
                  input.ui-checkbox(
                    type='checkbox'
                    v-model="task.completed"
                  )
                span.ui-title-3 {{ task.title }}
              .task-item__body
                p.ui-text-regular {{ task.description }}
              .task-item__footer
                .tag-list
                  .ui-tag__wrapper(
                    v-for="tag in task.tags"
                    :key="tag"
                  )
                    .ui-tag
                      span.tag-title {{ tag }}
</template>

<script>
export default {
  data () {
    return {
      filter: 'active'
    }
  },
  computed: {
    tasks () {
      if (this.filter === 'all') {
        return this.$store.getters.tasks
      } else if (this.filter === 'active') {
        return this.$store.getters.tasksActive
      } else if (this.filter === 'completed') {
        return this.$store.getters.tasksCompleted
      }
      return this.filter === 'active'
    }
  }
}
</script>

<style lang="stylus" scoped>
.task-list__header
  display flex
  justify-content space-between
  align-items center
  margin-top 30px
  margin-bottom 30px
  button
    margin-right 6px
    &:last-child
      margin-right 0
  .ui-title-1
    margin-bottom 0

.task-item
  margin-bottom 20px
  &:last-child
    margin-bottom 0
  .ui-checkbox:checked:before
    border-color #909399
  &.completed
    .ui-title-3,
    .ui-text-regular,
    .ui-tag
      text-decoration line-through
      color #909399

.ui-label
  margin-right 8px
.task-item__info
  display flex
  align-items center
  justify-content space-between
  margin-bottom 20px
  .button-close
    width 20px
    height @width
.task-item__header
  display flex
  align-items center
  margin-bottom 18px
  .ui-title-3
    margin-bottom 0
  .ui-checkbox-wrapper
    margin-right 8px
.task-item__footer
  margin-top 20px
</style>
