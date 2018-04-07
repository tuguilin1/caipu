import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/components/index"
import Login from "@/components/login"
import Register from "@/components/register"
import Dish from "@/components/dish"
import allFood from "@/components/all_food"
import Person from "@/components/person"
import Collection from "@/components/collection"
import News from "@/components/news"
import cookVideonav from "@/components/cookvideonav"
import cookVideo from "@/components/cookvideo"
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
	  },
	  {
	  	path:"/collection",
	  	component:Collection
	  },
	  {
	  	path:"/news",
	  	component:News
	  },
	  {
	  	path:"/cookvideonav",
	  	component:cookVideonav,
	  	children:[
	  		{
	  			path:":type",
	  			component:cookVideo
	  		}
	  	]
	  }
  ]
})
