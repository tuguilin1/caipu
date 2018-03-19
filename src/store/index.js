
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const SET_IS_LOGINED = "SET_IS_LOGINED"
const SET_USERPASS = "SET_USERPASS"
const SET_USERPHONE = "SET_USERPHONE"

export default new Vuex.Store({
	state:{
		isLogined:false,
		pass:"",
		phone:1,
	},
	getters:{
		isLogined:(state)=>{return state.isLogined},
		pass:(state)=>{return state.pass},
		phone:(state)=>{return state.phone}
	},
	mutations:{
		[SET_IS_LOGINED](state,bool){
			state.isLogined=bool
		},
		[SET_USERPASS](state,_pass){
			state.pass=_pass
		},
		[SET_USERPHONE](state,_phone){
			state.phone=_phone
		},
	}


})