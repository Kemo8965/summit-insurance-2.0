/* eslint-disable prettier/prettier */
import { api } from '@/helpers/axios-instance'
import { getField, updateField } from 'vuex-map-fields'
import { SET_LOADING, SET_USERS, ADD_NEW_USER, SET_CURRENT_USER } from '@/helpers/mutation-types'
// import { _ } from 'lodash'
export const state = () => ({
    all: [],
    users: [],
    user:[]

    
})

export const getters = {
    getField,

    allUsers(state) {
        return state.users
    },

     currentUser(state) {
        return state.user
    },
}

export const mutations = {
    updateField,

    [SET_USERS](state, payload) {
        state.users = payload
    },
    [SET_CURRENT_USER](state, payload) {
        state.user = payload
    },

    [SET_LOADING](state, payload) {
        state.loading = payload
    },

    [ADD_NEW_USER](state, payload) {
        state.users.push(payload)
    },

}

export const actions = {

    async getAllUsers({ commit }) {
        try {
            commit(SET_LOADING, true)
            const fetchUsers = await api.get(`/auth/allUsers`)
            console.log(fetchUsers.data)

            commit(SET_USERS, fetchUsers.data)
            commit(SET_LOADING, false)

        } catch (error) {
            commit(SET_LOADING, false)
            throw error
        }
    },

    async getUser({ commit }) {
        try {
            commit(SET_LOADING, true)
            const fetchUser = await api.get(`/auth/User/:id`)
            console.log(fetchUser.name)

            commit(SET_CURRENT_USER, fetchUser.data)
            commit(SET_LOADING, false)

        } catch (error) {
            commit(SET_LOADING, false)
            throw error
        }
    }
    
}