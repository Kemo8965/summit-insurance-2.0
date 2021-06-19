import {
    SET_LOADING,
    CREATE_POLICY,
    SET_ALL_POLICIES,
    GET_ALL_POLICIES,
    SET_CLIENT_NAMES
} from '@/helpers/mutation-types'
// import { DateTime } from 'luxon'
// import currency from 'currency.js'
import { getField, updateField } from 'vuex-map-fields'
import cloneDeep from 'lodash/cloneDeep'

import { api } from '~/helpers/axios-instance'

export const state = () => ({
    all: [],
    allPolicies:[],
    clientNames: [],
    loading: false,
    form: {
        clientID: null,
        coverType: null,
        currency: null,
        numOfQuarters: null,
        startDate: null,
        endDate: null, 
        sumInsured: null,
        rate:null,
        proRata:null,
        premium: null,
        totalPremium:null
        
    },

    coverType:[
        'Motor',
        'Non-motor'
    ],

    motorCoverType:[
        'Comprehensive',
        'Third Party'
    ],

    
})

export const getters = {
    getField,

    

    motorCoverType(state) {
        return state.motorCoverType
            .sort()
            .map((motorCoverType) => ({ label: motorCoverType, value: motorCoverType }))
    },
    
    coverType(state) {
        return state.coverType
            .sort()
            .map((coverType) => ({ label: coverType, value: coverType }))
    },

    allPolicies(state) {
        return state.all
    },

    allNewPolicies(state) {
        return state.allPolicies
    },


    loading(state) {
        return state.loading
    },
}

export const mutations = {
    updateField,

    [SET_LOADING](state, loading) {
        state.loading = loading
    },

    [CREATE_POLICY](state, policy) {
        state.all.push(policy)
    },

     // NEW MUTATION TO SET CLIENT NAME
     [SET_CLIENT_NAMES](state, payload) {
        state.clientNames = payload
    },

    [GET_ALL_POLICIES](state,payload){
        state.all= payload
    },

    [SET_ALL_POLICIES](state,payload){
        state.allPolicies= payload
    }
}

export const actions = {
    async load({ commit }) {
        try {
           const newLoad= await api.get(`policies/AllPolicies`)
           // await dispatch('getInactivePolicies')
        console.log(newLoad.data)
             commit(SET_ALL_POLICIES, newLoad.data
            //   ...getters.allPolicies,
            //   ...getters.inactivePolicies,
            )
        } catch (error) {
            this.$log.error(error.message)
        }
    },

    async getAllPolicies({ commit }) {
        try {
            commit(SET_LOADING, true)
            const { data: allPolicies } = await api.get(`/policies/allPolicies`)

           
                commit(GET_ALL_POLICIES, allPolicies.data);
             

            commit(SET_LOADING, false)
        } catch (error) {
            commit(SET_LOADING, false)
            this.$log.error(error.message)
        }
    },



    async createPolicy({ state, commit, rootGetters }) {
        try {
            commit(SET_LOADING, true)
            const policy = cloneDeep(state.form)
            policy.createdBy = this.$auth.user.toString()
            policy.authorisedBy = this.$auth.user.toString()

           
        /*
                const premiumResponse = await this.$axios.$post(`policies/getPremium`, {
                    sumInsured: policy.sumInsured,
                    rate:policy.rate,
                    proRata:policy.proRata

                })
                    policy.premium= premiumResponse;

                console.log(premiumResponse.data.premium)
                

                const totalPremiumResponse = await this.$axios.$post(`policies/getTotalPremium`,{
                    premium:premiumResponse,
                
                })

                policy.totalPremium= totalPremiumResponse;

                console.log(totalPremiumResponse.data.totalPremium)

               

                */


                    const response = await api.post(`/policies/createPolicy`, policy)

                    commit(CREATE_POLICY, response.data)
                    commit(SET_LOADING, false)

                    console.log(response.data)
                




            


        } catch (error) {
            commit(SET_LOADING, false)
            throw error
        }
    },

}