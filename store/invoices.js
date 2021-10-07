import { 
    SET_LOADING,
    SET_INVOICES,
    CREATE_INVOICE,
    SET_SELECTED_INVOICE,
    CANCEL_INVOICE,
    REINSTATE_INVOICE
} from '@/helpers/mutation-types'
import startCase from 'lodash/startCase'
import currency from 'currency.js'
import { DateTime } from 'luxon'

import { getField, updateField } from 'vuex-map-fields'
import cloneDeep from 'lodash/cloneDeep'

import { api } from '~/helpers/axios-instance'

export const state = () => ({

    all: [],
    loading: false,

    form:{
    
    },
    types: [
      'Premium Payment',
      'Third Party Recovery',
      'Imprest Retirement Receipt',
      'General Receipt',
      'Warehouse Insurance Payment',
      'Fire Insurance Payment',
      'Home Insurance Payment',
      'Office Space Insurance Payment',
    ],
    paymentMethods: ['Cash', 'EFT', 'Bank Transfer', 'Cheque'],
    selectedInvoice: null,

    
  })


  export const getters = {
    getField,

   

    loading(state) {
      return state.loading
    },
  
    invoices(state, _, __, rootGetters) {
      const policies = rootGetters['policies/policies']
      const debitNotes = []
  
      policies.forEach((policy) => {
        policy.debitNotes.forEach((note) => debitNotes.push(note))
      })
      return state.all.filter(
        (invoice) =>
          debitNotes.some(
            ({ debitNoteNumber }) => invoice.invoice_number === debitNoteNumber
          ) && invoice.invoice_status === 'Receipted'
      )
  
      // return state.all
    },
  
    cancelledInvoices(state, _, __, rootGetters) {
      const policies = rootGetters['policies/policies']
      const debitNotes = []
  
      policies.forEach((policy) => {
        policy.debitNotes.forEach((note) => debitNotes.push(note))
      })
  
      return state.all.filter(
        (invoice) =>
          debitNotes.some(
            ({ debitNoteNumber }) => invoice.invoice_number === debitNoteNumber
          ) && invoice.invoice_status === 'Cancelled'
      )
      // return state.all.filter((invoice) => invoice.invoice_status === 'Cancelled')
    },
  
    invoiceTypes(state) {
      return state.types
    },
  
    paymentMethods(state) {
      return state.paymentMethods
    },
  
    selectedInvoice(state) {
      return state.selectedInvoice
    },
  }

  export const mutations = {
    updateField,

    [SET_INVOICES](state, payload) {
      state.all = payload
    },

  
    [SET_LOADING](state, payload) {
      state.loading = payload
    },
  
    [SET_SELECTED_INVOICE](state, payload) {
      state.selectedInvoice = payload
    },
  
    [CANCEL_INVOICE](state, payload) {
      state.selectedInvoice.Invoice_status = 'Cancelled'
      state.selectedInvoice.remarks = payload
    },
  
    [REINSTATE_INVOICE](state, payload) {
      state.selectedInvoice.Invoice_status = 'Invoiceed'
      state.selectedInvoice.remarks = payload
    },
  }
  


    export const actions = {
        async load({ commit }) {
          try {
            commit(SET_LOADING, true)
            const { data: receiptsInvoice } = await httpPay.get('/invoices/allInvoices')
      
            commit(SET_INVOICES, receiptsInvoice.data)
            commit(SET_LOADING, false)
          } catch ({ message }) {
            commit(SET_LOADING, false)
            this.$log.error(message)
          }
        },
      
        selectedInvoice({ commit }, invoice) {
          commit(SET_SELECTED_invoice, invoice)
        },

        async createInvoice({ state, commit}){

            try {
                commit(SET_LOADING, true)

                const newInvoice = cloneDeep(state.form)
                const {data: invoiceResponse } = await api.post(`/invoices/createInvoice`, newInvoice)
                
                commit(CREATE_INVOICE, invoiceResponse.data)
                commit(SET_LOADING, false)

                console.log(response.data)

            } catch (error) {
                
            }
        },
      
        async cancelInvoice({ commit, state }, { reason }) {
          try {
            const invoice = state.selectedInvoice
      
            commit(SET_LOADING, true)
      
            commit(CANCEL_INVOICE, reason)
            await httpPay.put(`/invoice/${invoice.ID}`, invoice)
      
            commit(SET_LOADING, false)
          } catch (error) {
            commit(SET_LOADING, false)
            throw error
          }
        },
      
}

