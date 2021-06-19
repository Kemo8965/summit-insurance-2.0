<template>
  <div class="grid is-full-height pt-5">
    <div class="card-1 form-card-1">
      <FormulateForm
        #default="{ isLoading }"
        v-model="form"
        :class="['card-content']"
        @submit="loginUser"
      >
        <h1 class="header center my-4">
          <span class="is-blue">S</span>ummit <br>
          <span class="is-blue">I</span>nsurance <br>
          <span class="is-blue">B</span>rokers .
        </h1>
        <div >
             <FormulateInput
          type="email"
          name="email"
          class="email "
          label="Email"
          validation="bail|required|email"
          data-has-icons-left
          
        >
          <template #suffix>
            <span class="icon is-left">
              <i class="mdi mdi-account"></i>
            </span>
          </template>
        </FormulateInput>
        </div>
       

      
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

        <b-button
          class="mt-4"
          expanded
          type="is-info"
          tag="input"
          native-type="submit"
          value="Login"
        />
        <b-loading :active="isLoading" is-full-page></b-loading>
      <!--
        <p>
          Not Registered? Sign up
          <nuxt-link to="/auth/register">here</nuxt-link>
        </p>

        -->
      </FormulateForm>
    </div>

    <div class="card form-card-2"></div>

    <div></div>
  </div>
</template>

<script>
export default {

   auth: 'guest',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      hasError: true,
      isLoading: false,
      isFullPage: true,
    }
  },
  methods: {
    async loginUser() {
      try {
        const { data: response } = await this.$auth
          .loginWith('local', {
            data: this.form 
          })
          .then(() => this.$buefy.toast.open({
            message:'Logged In!' ,
            position:'is-bottom',
            type:'is-success'}));

        
            
        this.$buefy.toast.open({
          duration: 5000,
          message: 'Welcome back!',
          position: 'is-top',
          type: 'is-success',
        })

        this.$router.push({ path: '/' })
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

<style scoped>

.formulate-input::v-deep .email {
  background-color: red;
}

.header{
  font-size: 4rem;
  color: gray;
}

.center {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-weight: 600;
}
.is-blue {
  color: rgb(71, 113, 190);
}
.register {
  padding-left: 5rem;
}

.email {
  width: 100%;
  border-radius: 30%;
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

.form-card-1 {
  grid-row: 2/3;
  grid-column: 1/3;
  width: 100%;
  background-color: rgb(238, 239, 245);
}

.card-content {
  padding-top: 1rem;
  width: auto;
}

.form-card-2 {
  height: 92vh;
  grid-row: 2/3;
  grid-column: 3/3;
  background: url('../../assets/images/office2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
