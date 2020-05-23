import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import NIM from '../SDK/NIM_Web_NIM_v7.6.0.js'
import {MD5} from '../utils/Utils.js'

const store = new Vuex.Store({
    state: {
        NIM:null,
        MD5:null,
        count: 12,
        nim:null
    },
    mutations: {
        initNIM(state){
            console.log("initNIM has been execute")
            state.NIM = NIM
            console.log(state.NIM)
        },
        setNim(state,nim){
            state.nim = nim;
            console.log("setNim successful ==>"+state.nim)
            return state.nim
        },
        removeNim(state){
            state.nim = null
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