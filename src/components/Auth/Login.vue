<template lang="pug">
  .content-wrapper
    section
      .container
        .auth
          .auth__banner
            h1.ui-title-2 Hello banner
          .auth__form
            span.ui-title-2 Logn form
            form(@submit.prevent="onSubmit")
              .form-item(
                :class="{'form-group--error': $v.email.$error}"
              )
                input(
                  type="email"
                  placeholder="Email..."
                  v-model="email"
                  :class="{'input--error': $v.email.$error}"
                  @change="$v.email.$touch"
                )
                .error(
                  v-if="!$v.email.required"
                ) Field is required
                .error(
                  v-if="!$v.email.email"
                ) Email is incorrect

              .form-item(
                :class="{'form-group--error': $v.password.$error}"
              )
                input(
                  type="password"
                  placeholder="Password..."
                  v-model="password"
                  :class="{'input--error': $v.password.$error}"
                  @change="$v.password.$touch"
                )
                .error(
                  v-if="!$v.password.required"
                ) Field is required
                .error(
                  v-if="!$v.password.minLength"
                ) Password must have at least {{ $v.password.$params.minLength.min }} symbols

              .buttons-list
                button.button.button-primary(
                  type="submit"
                  :disabled="submitStatus === 'PENDING'"
                  :class="{'button--disable': submitStatus === 'PENDING'}"
                ) Login

              .login--status
                p.typo__p(v-if="submitStatus === 'OK'") Thanks for login!
                p.typo__p(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
                p.typo__p(v-if="submitStatus === 'PENDING'") Sending...

              .auth__form--footer
                span Need registration?
                  router-link(to="/registration")  Enter here
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      password: '',
      submitStatus: null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        const user = {
          email: this.email,
          password: this.password
        }
        console.log(user)
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.auth
  display flex
.auth__banner,
.auth__form
  width 50%
.auth__form
  border 2px solid #f7f7f7
  padding 20px
  box-shadow 1px 1px 10px 0 #f7f7f7
button.button.button-default
  margin-top 20px
.input--error
  border-color #B22222
  box-shadow 1px 1px 2px 0 #B22222
.form-item
  .error
    display none
    margin-bottom 16px
    font-size 10pt
    color #B22222
  &.form-group--error
    .error
      display block
.buttons-list
  text-align right
.auth__form--footer,
.login--status
  text-align center
  font-size 12pt
  margin-top 20px
  margin-bottom 20px
  a
    color #444ce0
</style>
