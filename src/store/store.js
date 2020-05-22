import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import NIM from '../SDK/NIM_Web_NIM_v7.6.0.js'
import {MD5} from '../utils/Utils.js'

const store = new Vuex.Store({
    state: {
        NIM:null,
        MD5:null,
        count: 12
    },
    mutations: {
        initNIM(state){
            console.log("initNIM has been execute")
            state.NIM = NIM
        },
        initMD5(state){
            console.log("initMD5 has been execute")
            state.MD5 = MD5
        },
        increment(state) {
            state.count++
        }
    }
})
export default store;