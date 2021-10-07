<template>
  <div>
    <!-- Policy Details -->
    <div class="block card">
      <div class="card-header">
        <h4 class="card-header-title is-4">Policy Details</h4>
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
            type="autocomplete"
            label="Client"
            field="label"
            icon="account"
            data-isexpanded
            placeholder="e.g. John"
            validation="required"
            :options="clients"
            @selected="clientSelected"
          />
        </div>

        <!-- Currency -->
        <div class="column">
          <FormulateInput
            v-model="currency"
            type="select"
            label="Currency"
            name="currency"
            placeholder="-- Please select a currency --"
            validation="required"
            data-is-expanded
            :options="currencies"
            :disabled="!clientID"
          />
        </div>

        <!-- Quarters -->
        <div class="column">
          <FormulateInput
            v-model="numOfQuarters"
            type="select"
            label="Quarters"
            name="numOfQuarters"
            placeholder="-- Please select a quarter --"
            validation="required"
            data-is-expanded
            :options="quarters"
            :disabled="!currency"
          />
        </div>
      </div>

      <!-- Second Row -->
      <div class="columns">
        <!-- Start date -->
        <div class="column is-one-third">
          <FormulateInput
            v-model="startDate"
            type="datepicker"
            label="Start Date"
            name="startDate"
            placeholder="-- Please select start date --"
            validation="required"
            :disabled="!numOfQuarters"
            :min-date="minDate"
          />
        </div>

        <!-- End date -->
        <div class="column is-one-third">
          <FormulateInput
            v-model="endDate"
            type="datepicker"
            label="End Date"
            name="endDate"
            :disabled="true"
          />
        </div>
      </div>
    </FormulateForm>

    
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions, mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import cloneDeep from 'lodash/cloneDeep'

//import AddVehicleFleetModal from '~/components/modals/add-vehicle-fleet-modal.vue'

export default {
  name: 'App',
  // eslint-disable-next-line vue/no-unused-components
  components: {  },

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
      'form.clientType',
      'form.agencyID',
      'form.createdBy',
      'form.numOfQuarters',
      'form.startDate',
      'form.endDate',
      'form.currency',
      'form.clientID',
      'form.vehicles',
    ]),

    

    // ...mapGetters('clients', {
    //   clients: 'clientList',
    //   loadingClients: 'loading',
    // }),

    ...mapGetters('helpers', ['currencies', 'quarters']),

    ...mapGetters('external-services', ['colors']),

    filteredClients() {
      return this.clients.filter(({ text }) =>
        text.toLowerCase().includes(this.clientName.toLowerCase())
      )
    },

    filteredColors() {
      return this.colors.filter((color) => {
        return color.toLowerCase().includes(this.colorName.toLowerCase())
      })
    },
  },

  watch: {
    numOfQuarters(quarter) {
      const startDate = DateTime.fromJSDate(this.startDate)

      this.calculateEndDate(quarter, startDate)
    },

    startDate(newDate) {
      const startDate = DateTime.fromJSDate(newDate)
      const quarter = this.numOfQuarters

      this.calculateEndDate(quarter, startDate)
    },

    vehicleNumOfQuarters(quarter) {
      const startDate = DateTime.fromJSDate(this.startDate)

      this.calculateVehicleEndDate(quarter, startDate)
    },

    vehicleStartDate(newDate) {
      const startDate = DateTime.fromJSDate(newDate)
      const quarter = this.numOfQuarters

      this.calculateVehicleEndDate(quarter, startDate)
    },
  },

  created() {
    if (typeof this.startDate === 'string')
      this.startDate = new Date(this.startDate)
    if (typeof this.endDate === 'string') this.endDate = new Date(this.endDate)
    if (typeof this.vehicleStartDate === 'string')
      this.vehicleStartDate = new Date(this.vehicleStartDate)
    if (typeof this.vehicleEndDate === 'string')
      this.vehicleEndDate = new Date(this.vehicleEndDate)

   // this.loadClients()
    this.loadColors()
    this.clearForm()
    this.clearVehicleForm()
  },

  methods: {
    ...mapActions('helpers', ['setCurrency']),

   // ...mapActions('clients', { loadClients: 'load' }),

    ...mapActions('policies', { loadPolicies: 'load' }),

    ...mapActions('external-services', ['loadColors', 'addColor']),

    ...mapActions('policies', ['createPolicy']),

    toggleVehicleAddition() {
      this.addVehicle = !this.addVehicle
    },

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

    // Validation rules
    validRegNumber({ value }) {
      return !this.vehiclesInActivePolicies.some(
        (vehicle) =>
          vehicle.vehicleRegNumber.replace(/\s/g, '').toLowerCase() ===
          value.toLowerCase()
      )
    },

    validEngineNumber({ value }) {
      return !this.vehiclesInActivePolicies.some(
        (vehicle) =>
          vehicle.vehicleEngineNumber.toLowerCase() === value.toLowerCase()
      )
    },

    validChassisNumber({ value }) {
      return !this.vehiclesInActivePolicies.some(
        (vehicle) =>
          vehicle.vehicleChassisNumber.toLowerCase() === value.toLowerCase()
      )
    },

    // Vehicle date calculations
    calculateVehicleEndDate(quarter, startDate) {
      const endOfStartDateQuarter = startDate.endOf('quarter')
      const endDate =
        quarter > 1
          ? endOfStartDateQuarter.plus({ quarters: quarter - 1 })
          : endOfStartDateQuarter

      this.vehicleEndDate = endDate.endOf('day').toJSDate()
    },

    onVehicleSubmit(vehicle) {
      // alert(`Submitted: ${JSON.stringify(vehicle)}`)
      this.vehicles.push(vehicle)
      this.resetVehicleForm()
    },

    onAddFleet(vehicles) {
      vehicles.forEach((vehicle) => this.vehicles.push(vehicle))
    },

    clearVehicleForm() {
      this.storeVehicle = {
        vehicleMake: null,
        vehicleModelName: null,
        yearOfManufacture: null,
        vehicleRegNumber: null,
        vehicleEngineNumber: null,
        vehicleChassisNumber: null,
        vehicleColour: null,
        seatCapacity: null,
        cubicCapacity: null,
        bodyType: null,
        productTypeID: null,
        certificateNumber: null,
        startDate: null,
        endDate: null,
        numOfQuarters: null,
        insuredNames: null,
        premium: null,
      }
      this.vehicle = cloneDeep(this.storeVehicle)
    },

    resetVehicleForm() {
      this.$formulate.reset('vehicle')
      this.clearVehicleForm()
    },

    onSubmit() {
      this.createPolicy()
      /* this.$buefy.toast.open({
        message: 'Policy added',
        duration: 4000,
        position: 'is-top',
        type: 'is-info',
      }) */
      // this.$parent.close()
    },
    close() {
      /* this.$buefy.toast.open({
        message: 'Policy addition cancelled...',
        duration: 5000,
        position: 'is-top',
        type: 'is-info',
      })
      this.$parent.close()
      */
    },

    onVehicleDeleted(index) {
      this.$buefy.toast.open({
        duration: 5000,
        message: `Vehicle removed!`,
        position: 'is-top',
        type: 'is-info',
      })
      this.vehicles.splice(index, 1)
      this.submitPolicy = !(this.vehicles.length === 0)
    },

    clearForm() {
      this.form = {
        clientType: null,
        numOfQuarters: null,
        startDate: null,
        endDate: null,
        currency: null,
        createdBy: null,
        agencyID: null,
        clientID: null,
        productTypeID: null,
        vehicles: [],
      }
    },

    resetForm() {
      this.$formulate.reset('policy')
      this.clearForm()
    },
  },
}
</script>

<style scoped>
.columns{
  color: black;
}
</style>
