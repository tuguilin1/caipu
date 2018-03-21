
import axios from "axios"

var getFood = (data)=>{
	const url = "/jisuapi/byclass";
	return axios.get(url,{
			params:data
		}).then((data)=>{
			return Promise.resolve(data)
	})
}	

var getDish= (data)=>{
	const url = "/jisuapi/search";
	return axios.get(url,{
			params:data
		}).then((data)=>{
			return Promise.resolve(data)
	})
}
var getAllfood = (data)=>{
	const url = "/jisuapi/recipe_class";
	return axios.get(url,{
			params:data
		}).then((data)=>{
			return Promise.resolve(data)
	})
}

var getCook= (data)=>{
	const url = "/jisuapi/detail";
	return axios.get(url,{
			params:data
		}).then((data)=>{
			return Promise.resolve(data)
	})
}

var getCollection = (data)=>{
	const url = "/users/collection";
	return axios.get(url,{
			params:data
		}).then((data)=>{
			return Promise.resolve(data)
	})
}
export {getFood,getDish,getAllfood,getCook,getCollection }