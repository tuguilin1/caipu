let ajax = (url,method,datas={})=>{  //ajax获取数据
	var xhr = new XMLHttpRequest();
	xhr.open(method,url);
	xhr.send(datas);
	return new Promise(function(resolve,reject){
		xhr.onload = ()=>{
			resolve(JSON.parse(xhr.responseText))
		}
	})

	
}

export { ajax } 