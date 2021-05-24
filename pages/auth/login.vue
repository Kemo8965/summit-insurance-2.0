<template>
   <div class="grid is-full-height ">
       <div class="card form-card">
       <h1 class="is-center"> Summit Insurance</h1>
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
.sign-in{
    left:4rem;
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
     top: 10rem;
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
