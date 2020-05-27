import NIM from '../SDK/NIM_Web_NIM_v7.6.0.js'
import {MD5} from '../utils/Utils.js'

const mutations = {
    initNIM(state){
        console.log("initNIM has been execute")
        state.NIM = NIM
        console.log(state.NIM)
    },
    initMD5(state){
        console.log("initMD5 has been execute")
        state.MD5 = MD5
    },
    setDate(state,params){
        state.data[params.key] = params.val
    },
    getDate(state,key){
        return state.data[key]
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
export default mutations;