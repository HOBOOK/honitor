import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex)

export const strict = false

const store = () => new Vuex.Store({
  state:{

  },
  mutations:{
    SET_TOKEN:function(state, token){
      state.token=token
    }
  },
  actions:{

  },
  getters: {
  }


})

export default store