<template>
  <div class="column">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          DEBIT BINDER
        </p>
      </header>
      <div class="card-content">
        <div class="content has-text-centered">
                <!-- Policy Details -->
            <div class="block card">
              <div class="card-header">
                <h4 class="card-header-title is-4">Personal Details</h4>
                <span class="card-header-icon">
                  <b-icon icon="note-text-outline"></b-icon>
                </span>
              </div>
            </div>
           <FormulateForm
      id="policy"
      v-model="form"
      name="policy"
      :class="['block box']"
      @submit="onSubmit"
    >
      <!-- Client Type Row -->
      <div class="columns">
        <!-- First Row -->

        <!-- Client -->
        <div class="column">
          <FormulateInput
            v-model="clientID"
            name="clientID"
            type="text"
            label="Client"
            field="label"
            icon="account"
            placeholder="e.g. John"
            validation="required"
           
            
          />
        </div>

        <!-- Cover Type   -->
        <div class="column">
          <FormulateInput
            v-model="coverType"
            type="text"
            label="Cover Type"
            name="cover-type"
            placeholder="-- Please select a cover type --"
            validation="required"
            data-is-expanded
           
            
          />
        </div>

      

        <!-- Currency -->
        <div class="column">
          <FormulateInput
            v-model="currency"
            type="text"
            label="Currency"
            name="currency"
            placeholder="-- Please select a currency --"
            validation="required"
            data-is-expanded
           
            
          />
        </div>

       
      </div>

      <!-- Second Row -->
      <div class="columns">

         <!-- Quarters -->
        <div class="column is-one-third">
          <FormulateInput
            v-model="numOfQuarters"
            type="text"
            label="Quarters"
            name="numOfQuarters"
            placeholder="-- Please select a quarter --"
            validation="required"
            data-is-expanded
            
            
          />
        </div>
        <!-- Start date -->
        <div class="column is-one-third">
          <FormulateInput
            v-model="startDate"
            type="text"
            label="Start Date"
            name="startDate"
            placeholder="-- Please select start date --"
            validation="required"
           
          
          />
        </div>

        <!-- End date -->
        <div class="column is-one-third">
          <FormulateInput
            v-model="endDate"
            type="text"
            label="End Date"
            name="endDate"
            
          />
        </div>
      </div>
   

    <!-- Interest Details -->
    <div v-if="numOfQuarters">
            <div  class="block card">
              <div class="card-header">
                <h4 class="card-header-title is-4">Interest</h4>
                <span class="card-header-icon">
                  <b-icon icon="car"></b-icon>
                </span>
              </div>
            </div>
    
               
             <!-- First Row -->
            <div class="columns">
              <!-- Motor Cover Type-->
              <div class="column">
                <FormulateInput
                  v-model="motorCoverType"
                  type="text"
                  label="Motor Cover Type"
                  name="motorCoverType"
                  placeholder=""
                  
                  validation="bail|required|matches:/^[a-zA-z\s]+/"
                />
              </div>

            <!--Fifth Row-->
           
              <!-- Sum Insured -->
              <div class="column">
                <FormulateInput
                  v-model="sumInsured"
                  type="text"
                  label="Sum Insured"
                  name="sumInsured"
                  placeholder=""
                  validation="required"
                  data-is-expanded
                  
                  
                />
              </div>


              <!-- Rate -->
              <div class="column">
                <FormulateInput
                  v-model="rate"
                  type="text"
                  label="rate"
                  name="rate"
                  placeholder=""
                  validation="required"
                  data-is-expanded
                 
                  
                />
              </div>

            </div>


          <div class="columns">
              <!-- Pro-rata-->
              <div class="column">
                <FormulateInput
                  v-model="proRata"
                  type="text"
                  label="Pro-rata"
                  name="pro-rata"
                  placeholder=""
                  validation="required|number"
                  
                />
              </div>

              
               <!-- Premium-->
              <div class="column">
                <FormulateInput
                  v-model="premium"
                  type="text"
                  label="Premium"
                  name="premium"
                  placeholder=""
                  validation="required|number"
                  
                />
              </div>

               <!-- Total Premium-->
              <div class="column">
                <FormulateInput
                  v-model="totalPremium"
                  type="text"
                  label="Total Premium"
                  name="totalPremium"
                  placeholder=""
                  validation="required|number"
                  
                />
              </div>
            </div>

          </div>


           
            <!-- Computations -->
         
      <br>
      <br>
        
 <div class="card">
      <div v-if="totalPremium" class="block card">
        <div class="card-header">
          <h4 class="card-header-title is-4">Debit Binder Summary</h4>
          <span class="card-header-icon">
            <b-icon icon="car"></b-icon>
          </span>
        </div>
      </div>
      <section v-if="totalPremium">
        <div class="card-content fonts">
          <pre>Name: {{ clientID }}</pre>
          <pre>Cover Type: {{ coverType }}</pre>
          <pre>Currency: {{ currency }}</pre>
          <pre>Number Of Quarters: {{ numOfQuarters }}</pre>
          <pre>Start Date: {{ startDate }}</pre>
          <pre>End Date: {{ endDate }}</pre>
          <pre>Motor Cover Type: {{ motorCoverType }}</pre>
          <pre>Sum Insured: {{ sumInsured }}</pre>
          <pre>Rate: {{ rate }}</pre>
          <pre>Pro-Rata: {{ proRata }} days</pre>
          <pre>Premium: {{ premium }}</pre>

          <pre>Total Premium: {{ totalPremium }}</pre>
         
        </div>
      </section>

 </div>

      <!-- Submit Policy -->
      <div v-if="totalPremium" class="columns is-centered">
        <div class="column is-half">
          <div class="buttons is-centered has-addons">
            <b-button
              form="form"
              icon-left="upload"
              type="is-primary"
              native-type="submit"
              @click="onSubmit"
              >Submit Policy</b-button
            >
            <b-button icon-left="reload" @click="resetForm"
              >Reset Form</b-button
            >
          </div>
        </div>
      </div>
    </FormulateForm>

          
        </div>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <span>
            <slot />
          </span>
        </div>
      </footer>
      
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions, mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import cloneDeep from 'lodash/cloneDeep'
import SummaryModalForm from '~/components/modals/summary-modal.vue'
export default {
   data: () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(today)

    return {
      minDate,
      clientName: '',
      colorName: '',
      addVehicle: false,
      addFleet: false,
      submitPolicy: false,
      csv: [],
      activeTab: 0,
    }
  },

  computed: {
  
  ...mapFields('policies', [
      'form',
      'form.clientID',
      'form.coverType',
      'form.currency',
      'form.numOfQuarters',
      'form.startDate',
      'form.endDate',  
      'form.motorCoverType',
      'form.sumInsured',
      'form.rate',
      'form.proRata',
      'form.premium',
     'form.totalPremium'
    ]),

   

  },

  
  methods: {
   
    ...mapActions('policies', ['createPolicy']),


 

    clientSelected(option, event) {
      if (option) {
        this.vehicle.insuredNames = option.label
        this.insuredNames = option.label
      }
      if (!event) {
        this.vehicle.insuredNames = null
        this.insuredNames = null
      }
    },

    // Date calculations
    calculateEndDate(quarter, startDate) {
      const endOfStartDateQuarter = startDate.endOf('quarter')
      const endDate =
        quarter > 1
          ? endOfStartDateQuarter.plus({ quarters: quarter - 1 })
          : endOfStartDateQuarter

      this.endDate = endDate.endOf('day').toJSDate()
    },

    

    viewSummary() {
      this.$buefy.modal.open({
        parent: this,
        component: SummaryModalForm,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      })
    },

    
   

    onSubmit() {
      try {
        this.createPolicy()
        this.$buefy.toast.open({
          message: 'Policy added',
          duration: 2000,

          position: 'is-top',
          type: 'is-success',
        })

        this.$buefy.toast.open({
          message: 'Check Pending Payments for new policy approval',
          duration: 5000,

          position: 'is-top',
          type: 'is-info',
        })
      } catch (error) {
        const msg = error.response ? error.response.data.message : error.message
        this.$buefy.toast.open({
          message: `Error: ${msg}`,
          duration: 5000,
          position: 'is-top',
          type: 'is-danger',
        })
      }

      //  this.$parent.close()
    },
    close() {
      this.$buefy.toast.open({
        message: 'Policy addition cancelled...',
        duration: 5000,
        position: 'is-top',
        type: 'is-info',
      })
      // this.$parent.close()
    },

   

    clearForm() {
      this.form = {
        clientID: null,
        clientType: null,
        numOfQuarters: null,
        startDate: null,
        endDate: null,
        currency: null,
        rate: null,
        sumInsured: null,
        motorCoverType:null,
        coverType: null,
        proRata:null,

       
      }
    },

    resetForm() {
      this.$formulate.reset('policy')
      this.clearForm()
    },
  },



    

}
</script>
