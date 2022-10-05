import { createStore } from "vuex";

const store =createStore({
    state(){
        return{
            titleFlag:true
        }
    },
    getters:{
        getFlag(state){
            return state.titleFlag
        }
    },
    mutations:{
        changeFlag(state){
            state.titleFlag=!state.titleFlag
        }
    }
})
export default store