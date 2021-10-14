webSocket通信 = (()=>{
	const send = (obj)=>{ ws.send(JSON.stringify(obj)) }
	const json2arr2str = (str)=>{ return JSON.parse(str).join('<br>\n') }
	
	const ws = new WebSocket(`ws://${location.host}/ws`)
	ws.onopen = ()=>{
		// リロードだったら自動入室しようかと思ったけど
		// ブラウザ上ではPC名もユーザ名も取得できないし
		// webStorageもport番号が変わると別サイトの扱いになりそうなので、やめた。
	}
	ws.onmessage = ({data})=>{
		const obj = JSON.parse(data)
		switch(obj.mode){
			case 'msg':return msgHandler(obj.msg)
			case 'log':最前面.msg(json2arr2str(obj.log))
			case 'URL':最前面.msg(json2arr2str(obj.URL))
			default:return
		}
	}
	let msgHandler
	
	return {
		開始 : (ニックネーム, msgハンドラー) =>{
			msgHandler = msgハンドラー
			const objInterval = setInterval(()=>{
				if(ws.readyState==0){ return }
				clearInterval(objInterval)
				
				if(ws.readyState==1){ send({mode:'in', ニックネーム}) }
			}, 100)
		},
		msg : (msg) => send({mode:'msg',msg}),
		getLog : () => send({mode:'log'}),
		getURL : () => send({mode:'URL'})
	}
})()
