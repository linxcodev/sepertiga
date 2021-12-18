import $axios from '../services/api.js'

const state = () => ({
    uang: [],
    total: 0
})

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.uang = payload
    },
    SET_TOTAL(state, payload) {
        state.total = payload
    }
}

const actions = {
    getUang({ commit }) {
        commit('SET_LOADING', true, { root: true })

        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.get(`uang`)
                const data = network.data.data

                commit('ASSIGN_DATA', data.uang)
                commit('SET_TOTAL', data.total)
                commit('SET_LOADING', false, { root: true })

                resolve(network.data)
            } catch (error) {
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    },
    addUang({ commit }, payload) {
        commit('SET_LOADING', true, { root: true })

        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.post(`uang-masuk`, payload)

                commit('SET_LOADING', false, { root: true })
                resolve(network.data)
            } catch (error) {
                commit('SET_LOADING', false, { root: true })

                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }

                reject(error.response.data)
            }
        })
    },
    pengeluaranUang({ commit }, payload) {
        commit('SET_LOADING', true, { root: true })

        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.post(`uang-keluar`, payload)

                commit('SET_LOADING', false, { root: true })
                resolve(network.data)
            } catch (error) {
                commit('SET_LOADING', false, { root: true })

                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }

                reject(error.response.data)
            }
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}