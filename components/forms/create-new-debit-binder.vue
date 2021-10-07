<template>
    <section class="card block">

         <!-- Policy Details -->
        <div class="block card">
        <div class="card-header">
            <h4 class="card-header-title is-4">Debit Binder Details</h4>
            <span class="card-header-icon">
            <b-icon icon="note-text-outline"></b-icon>
            </span>
        </div>
        </div>

        <div
         :class="['block box']"
         >

        <div class="columns">
            <div class="column is-one-third">
                <b-field label="Client">
                    <b-input v-model="name"></b-input>
                </b-field>
            </div>

            <div class="column is-one-third">

        <b-field label="Cover"
            type="is-danger"
            message="This email is invalid">
            <b-input type="email"
                value="john@"
                maxlength="30">
            </b-input>
        </b-field>
            </div>

            <div class="column is-one-third">
                <b-field label="Currency">
                    <b-input v-model="name"></b-input>
                </b-field>
            </div>

           
        </div>
        
        <div class="columns">

             <div class="column is-one-third">

            <b-field label="Quarters"
                type="is-danger"
                message="This email is invalid">
                <b-input type="email"
                    value="john@"
                    maxlength="30">
                </b-input>
            </b-field>
                </div>


            <div class="column is-third">
                <b-field label="Start Date"
                    type="is-success"
                    message="This username is available">
                    <b-input value="johnsilver" maxlength="30"></b-input>
                </b-field>
            </div>

            <div class="column is-third">
                <b-field label="End Date">
                    <b-input type="password"
                        value="iwantmytreasure"
                        password-reveal>
                    </b-input>
                </b-field>

                
            </div>
        </div>

        </div>
        
        
    </section>
</template>

<script>
    export default {
        data() {
            return {
                name: 'John Silver'
            }
        }
    }
</script>