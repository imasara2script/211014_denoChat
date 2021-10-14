function Read(path){
	return new Promise(function (resolve) {
		webSocket通信({readTextFile:true, path}).then(resolve)
	})
}
