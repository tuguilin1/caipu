import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/components/index"
import Login from "@/components/login"
import Register from "@/components/register"
import Dish from "@/components/dish"
import allFood from "@/components/all_food"
import Person from "@/components/person"
Vue.use(Router)

export default new Router({
  routes: [
	  {
	  	path:"/",
	  	component:Index
	  },
	  {
	  	path:"/login",
	  	component:Login
	  },
	  {
	  	path:"/register",
	  	component:Register
	  },
	  {
	  	path:"/dish/:name",
	  	component:Dish
	  },
	  {
	  	path:"/allfood",
	  	component:allFood
	  },
	  {
	  	path:"/person",
	  	component:Person
	  }
  ]
})
