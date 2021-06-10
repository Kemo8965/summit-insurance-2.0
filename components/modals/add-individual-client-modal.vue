<template>
  <div>
    <div class="modal-card modal-wide">
    <header class="modal-card-head">
      <h3 class="modal-card-title">Add New Client</h3>
      <button type="button" class="delete" @click="close"></button>
    </header>
     <section class="modal-card-body has-background-white">
        <div class="columns">
           <div class="column">
             
              <b-input label="First Name" type="text" name="first_name" id="first_name" placeholder="John "/>
           </div>
             
            <div class="column">
              <b-input label=" Last Name" type="text" name="last_name" id="last_name" placeholder="Smith"/>
           </div>

           

        </div>

        <div class="columns">
           <div class="column">
              <b-input type="email" name="email" id="email" placeholder="johnsmith123@gmail.com"/>
           </div>
        </div>

        <div class="columns">
          

            <div class="column">
              <b-input type="number" name="number" id="number" placeholder="+260..."/>
           </div>

           <div class="column">
            <b-input type="date" name="datetime" id="datetime" placeholder="Date of Birth"/>
           </div>

        </div>

        <div class="columns">
          <div class="column">
            <b-input type="text" placeholder="Gender"/>
          </div>

          <div class="column">
            <b-input type="text" placeholder="Marital Status"/>
          </div>

        </div>

        <div class="columns">
          <div class="column">
            <b-input type="text" placeholder="Residential Address"/>
          </div>

          <div class="column">
            <b-input type="text" placeholder="Postal Address"/>
          </div>

        </div>
        <b-button class="btn is-info" type="is-info">Create </b-button>
    </section>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style >
    .btn{
      width: 10rem;
    }
</style>