<template>
   <div class="grid is-full-height ">
       <div class="card form-card">
       
        <b-field label="Email"
            type=""
            class="email"
           
           >
            <b-input type="email"
                value=""
                maxlength="30"
                placeholder="example123@gmail.com">
            </b-input>
        </b-field>

      

        <b-field label="Password"
            type=""
            
            class="pass"
          >
            <b-input value="" type="password" maxlength="30" placeholder="pA55W0rd1234"></b-input>
        </b-field>

       

        <b-button @click="openLoading" class="is-info sign-in">Sign In</b-button>
        <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true"></b-loading>
        <br>
        <p class="register">Not registered? Sign up <nuxt-link to="/auth/register">here</nuxt-link></p>
        <br>

    </div>
   </div>
</template>
        

<script>
    export default {
        data() {
            return {
                hasError: true,
                isLoading: false,
                isFullPage: true
            }
        },
        methods: {
            openLoading() {
                this.isLoading = true
                setTimeout(() => {
                    this.isLoading = false
                }, 10 * 1000)
                this.$router.push('/')
            
        }
         
    }
    }
</script>

<style scoped>
.register{
    padding-left: 5rem;
}
.sign-in{
    left:5rem;
    bottom: 1rem;
}
.grid {
   
  display: grid;
  grid-template-rows: 1fr minmax(min-content, auto) 1fr;
  grid-template-columns: 1fr minmax(min-content, auto)1fr;
  
}
.email{
    padding:1rem;
    width:400px;
}

.pass{
    padding:1rem;
}

.form-card {
     top: 5rem;
  grid-row: 2/3;
  grid-column: 2/3;
  background-color: blanchedalmond;
  
  
}
.input{
    width: 100%;
}
.is-center{
    padding-left: 4rem;
    font-size: 2rem;
}
</style>
