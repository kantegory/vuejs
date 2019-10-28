<template lang="pug">
  .content-wrapper
    section
      .container
        .auth
          .auth__banner
            h1.ui-title-2 Hello banner
          .auth__form
            span.ui-title-2 Registration
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

              //- .form-item(
              //-   :class="{'form-group--error': $v.nickname.$error}"
              //- )
              //-   input(
              //-     type="text"
              //-     placeholder="Nickname..."
              //-     v-model="nickname"
              //-     :class="{'input--error': $v.nickname.$error}"
              //-     @change="$v.nickname.$touch"
              //-   )
              //-   .error(
              //-     v-if="!$v.nickname.required"
              //-   ) Field is required

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

              .form-item(
                :class="{'form-group--error': $v.repeatPassword.$error}"
              )
                input(
                  type="password"
                  placeholder="Repeat password..."
                  v-model="repeatPassword"
                  :class="{'input--error': $v.repeatPassword.$error}"
                  @change="$v.repeatPassword.$touch"
                )
                .error(
                  v-if="!$v.repeatPassword.sameAs"
                ) Passwords do not match

              .buttons-list
                button.button.button-primary(
                  type="submit"
                  :disabled="submitStatus === 'PENDING'"
                  :class="{'button--disable': submitStatus === 'PENDING'}"
                )
                  span(v-if="loading") Loading...
                  span(v-else) Registration

              .registration--status
                p.typo__p(v-if="submitStatus === 'OK'") Thanks for registration!
                p.typo__p(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
                p.typo__p(v-if="submitStatus === 'PENDING'") Sending...
                p.typo__p(v-else) {{ submitStatus }}

              .auth__form--footer
                span Do you have an account?
                  router-link(to="/login")  Enter here
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      // nickname: '',
      submitStatus: null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    nickname: {
      required
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
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
          // nickname: this.nickname
        }
        console.log(user)
        this.submitStatus = 'PENDING'
        this.$store.dispatch('registerUser', user)
          .then(() => {
            console.log('REGISTER!')
            this.submitStatus = 'OK'
            this.$router.push('/')
          })
          .catch(err => {
            this.submitStatus = err.message
          })
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="stylus" scoped>
.auth
  display flex
  flex-wrap wrap
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
.registration--status
  text-align center
  font-size 12pt
  margin-top 20px
  margin-bottom 20px
  a
    color #444ce0
</style>
