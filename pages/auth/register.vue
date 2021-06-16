<template>
  <div class="grid is-full-height pt-5">
    <div class="card form-card">
      <FormulateForm
        #default="{ isLoading }"
        v-model="form"
        :class="['card-content']"
        @submit="registerUser"
      >
        <h1 class="header center my-4">
          <span class="is-blue">S</span>ummit
          <span class="is-blue">I</span>nsurance
          <span class="is-blue">B</span>rokers .
        </h1>
        <!-- Name-->
        <FormulateInput
          type="text"
          name="name"
          label="Name"
          data-has-icons-left
          class="email is-full-width"
        >
          <template #suffix>
            <span class="icon is-left">
              <i class="mdi mdi-account"></i>
            </span>
          </template>
        </FormulateInput>

        <!--Email-->
        <FormulateInput
          type="email"
          name="email"
          label="Email"
          validation="bail|required|email"
          data-has-icons-left
          class="email is-full-width"
        >
          <template #suffix>
            <span class="icon is-left">
              <i class="mdi mdi-account"></i>
            </span>
          </template>
        </FormulateInput>

        <!-- Paasword-->
        <FormulateInput
          type="password"
          name="password"
          label="Password"
          validation="required"
          data-has-icons-left
          class="password is-full-width"
        >
          <template #suffix>
            <span class="icon is-left">
              <i class="mdi mdi-key"></i>
            </span>
          </template>
        </FormulateInput>

        <!-- Confirm Paasword
        <FormulateInput
          name="password_confirm"
          type="password"
          label="Confirm your password"
          placeholder="Confirm password"
          validation="required|confirm"
          validation-name="Confirmation"
        >
          <template #suffix>
            <span class="icon is-left">
              <i class="mdi mdi-key"></i>
            </span>
          </template>
        </FormulateInput>
    -->
        <b-button
          class="mt-4"
          expanded
          type="is-info"
          tag="input"
          native-type="submit"
          value="Sign Up"
        />

        <b-loading :active="isLoading" is-full-page></b-loading>
        <p>
          Already have an account? Sign in
          <nuxt-link to="/auth/login">here</nuxt-link>
        </p>
      </FormulateForm>
    </div>

    <div class="card form-card-3"></div>

    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
        //password_confirm:'kondwani1234'
      },
      hasError: true,
      isLoading: false,
      isFullPage: true,
    }
  },
  methods: {
   async registerUser() {
      try {
        const user = this.form;

          const { data: response } = await this.$axios.$post(`/auth/register`, user).then(
            console.log('Successfully posted!')
          );

          this.$router.push('/auth/login')

      } catch (error) {
        this.form.password = null
        const message = error.response
          ? error.response.data.message
          : error.message
        this.$buefy.toast.open({
          duration: 5000,
          message: 'Please check your details again!',
          position: 'is-top',
          type: 'is-danger',
        })
      }
    },
  },
}
</script>

<style>
.center {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-weight: 600;
}
.is-blue {
  color: rgb(59, 115, 218);
}
.register {
  padding-left: 5rem;
}

.email {
  width: 90%;
}

.password {
  width: 90%;
}
.grid {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  display: grid;
  grid-template-rows: 1fr minmax(min-content, auto) 1fr;
  grid-template-columns: 1fr minmax(min-content, auto) 1fr;
}

.form-card {
  grid-row: 2/3;
  grid-column: 3/3;
  background-color: rgb(238, 239, 245);
}

.card-content::v-deep .formulate-input .formulate-input-element {
  width: 90%;
  padding-top: 11rem;
}

.form-card-3 {
  height: 92vh;
  grid-row: 2/3;
  grid-column: 1/3;
  background: url('../../assets/images/office3.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
