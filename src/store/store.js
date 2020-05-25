import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import NIM from '../SDK/NIM_Web_NIM_v7.6.0.js'
import {MD5} from '../utils/Utils.js'

/**
 * NIM  SDK总引入
 * MD5  用于token 生成的工具函数
 * nim 用户登录后记录用户状态的单例标记
 */
const store = new Vuex.Store({
    state: {
        NIM:null,
        MD5:null,
        nim:null,
        data:null
    },
    mutations: {
        initNIM(state){
            console.log("initNIM has been execute")
            state.NIM = NIM
            console.log(state.NIM)
        },
        initMD5(state){
            console.log("initMD5 has been execute")
            state.MD5 = MD5
        },
        setDate(state){
            this.data =  123
        },
        removeDate(state){
            state.data = null
        },
        setNim(state,nim){
            state.nim = nim;
            console.log("setNim successful ==>"+state.nim)
            return state.nim
        },
        removeNim(state){
            state.data = null;
            state.nim = null;
        },
    }
})
export default store;