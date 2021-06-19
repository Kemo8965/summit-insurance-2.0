import { api } from '@/helpers/axios-instance'
import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'
import { DateTime } from 'luxon'

import {SET_INDIVIDUAL_CLIENTS,
        ADD_INDIVIDUAL_CLIENT,
        SET_CORPORATE_CLIENTS,
        ADD_CORPORATE_CLIENT,
        SET_ALL_CLIENTS,
        SET_LOADING,
        SET_SELECTED_CLIENT} 
        from '@/helpers/mutation-types'

const clientType = {
    IND: 'IND',
    CORP: 'CORP',
}

export const state = () => ({
    all:[],
    individualClientForm: {
        firstName: null,
        lastName: null,
        title: null,
        dateOfBirth: null,
        gender: null,
        maritalStatus: null,
        idNumber: null,
        idType: null,
        phoneNumber: null,
        email: null,
        residentialAddress: null
       
        
    },
    individualOptions: {
        title: ['Mr', 'Mrs', 'Miss', 'Dr', 'Prof', 'Sir'],
        gender: ['Male', 'Female', 'Other'],
        maritalStatus: ['Single', 'Married', 'Widow', 'Widower'],
        idType: ['NRC', 'Passport'],
    },
})

export const getters = {
    getField,

    loading(state) {
        return state.loading
    },

    allClients(state) {
        return state.all
    },

    clientList(_, getters) {
        return getters.allClients.map((client) => ({
            label: getClientName(client),
            value: client.id,
        }))

    },

    clientListOfNames(_, getters, rootGetters) {

        return getters.allClients.map((client) => ({
            id: client.id,
            name: getClientName(client),
            // type: client.clientID,

        }))



    },

    individualClients(state) {
        return state.individual
    },

    

    individualOptions(state) {
        return state.individualOptions
    },
}

export const mutations = {
    updateField,

    [SET_INDIVIDUAL_CLIENTS](state, payload) {
        state.individual = payload
    },

    [ADD_INDIVIDUAL_CLIENT](state, payload) {
        state.individual.push(payload)
    },
    [SET_CORPORATE_CLIENTS](state, payload) {
        state.corporate = payload
    },

    [ADD_CORPORATE_CLIENT](state, payload) {
        state.corporate.push(payload)
    },

    [SET_ALL_CLIENTS](state, payload) {
        state.all = payload
    },

    [SET_LOADING](state, payload) {
        state.loading = payload
    },

    [SET_SELECTED_CLIENT](state, payload) {
        state.selectedClient = payload
    },

}

export const actions = {

    
    async load({ commit }) {
        try {
            commit(SET_LOADING, true)
            const { data: individuals } = await api.get(`/clients/allClients`)
          //  const { data: corporates } = await api.get('/client/corporateClients')
            commit(SET_INDIVIDUAL_CLIENTS, individuals.data)
           // commit(SET_CORPORATE_CLIENTS, corporates.data)

            commit(SET_ALL_CLIENTS, [...individuals.data])
            commit(SET_LOADING, false)
        } catch (error) {
            commit(SET_LOADING, false)
            this.$log.error(error.message)
        }
    },

    async createIndividualClient({ state, commit }) {
        try {
            commit(SET_LOADING, true)
            const client = state.individualClientForm
            client.clientType = clientType.IND
            client.residentialAddress = _.startCase(client.residentialAddress)
            client.firstName = _.startCase(client.firstName)
            client.lastName = _.startCase(client.lastName)
            const { data: response } = await api.post(
                `/clients/individualClient`, {
                    ...client
                }
            ).then(function (response) {
                console.log(response.data);
            })



            commit(ADD_INDIVIDUAL_CLIENT, response.data)
            commit(SET_LOADING, false)
        } catch (error) {
            commit(SET_LOADING, false)
            throw error
        }
    },
/*
    async createCorporateClient({ state, commit }) {
        try {
            commit(SET_LOADING, true)
            const corpClient = state.corporateClientForm
            corpClient.clientType = clientType.CORP
            corpClient.companyAddress = _.startCase(corpClient.companyAddress)
            corpClient.companyName = _.startCase(corpClient.companyName)
            corpClient.companySector = _.startCase(corpClient.companySector)
            const { data: response } = await api.post(
                `clients/corporateClient`,
                corpClient
            )

            console.log(response.data)
            console.log(corpClient.clientType)

            commit(ADD_CORPORATE_CLIENT, response.data)
            commit(SET_LOADING, false)
        } catch (error) {
            commit(SET_LOADING, false)
            throw error
        }
    },
*/
}

