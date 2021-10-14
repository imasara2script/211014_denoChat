import { IPv4 } from './IPv4.ts'

export async function webSocket接続(req: Request, requestEvent: any){
	console.log('webSocket')
	const {socket, response} = Deno.upgradeWebSocket(req)
	socket.onopen = () => {
		console.log('socket opened')
		
		const id = ++clientId
		const client = {socket, ニックネーム:''}
		clients.set(id, client)
		socket.onmessage = async (e) => {
			const msg = e.data
			if(typeof msg === 'string'){
				msg解釈(id, msg, req)
			}else{
				退室(id)
				socket.close()
			}
			console.log('socket message:', e.data)
		}
		socket.onclose = () => {
			退室(id)
			console.log('socket closed:')
		}
	}
	socket.onerror = (e) => console.log('socket errored:', e)
	requestEvent.respondWith(response)
}

class obj通い{
	mode:string
	[key:string]:string
	
	constructor(mode:string){
		this.mode = mode
	}
}

function msg解釈(id:number, msg:string, req:Request){
	const obj:obj通い = JSON.parse(msg)
	const client = clients.get(id)
	if(client==undefined){return}
	switch(obj.mode){
		case 'in':
			client.ニックネーム = obj.ニックネーム
			dispatch(`[${obj.ニックネーム}]さんが入室しました`)
			return
		case 'msg':
			dispatch(`[${client.ニックネーム}] > ${obj.msg}`)
			return
		case 'log':
			obj.log = JSON.stringify(log)
			console.log('log:'+JSON.stringify(obj))
			client.socket.send(JSON.stringify(obj))
			return
		case 'URL':
			別PCから開くためのアドレスを通知する(obj, req, client.socket)
			return
		default:return
	}
	
}

async function 別PCから開くためのアドレスを通知する(obj:obj通い, req: Request, socket:WebSocket){
	const URL  = req.url
	const port = URL.match(/http:\/\/[^:]+(:\d+\/)/)![1]
	const arr  = await IPv4()
	for(let i=0; i<arr.length ;i++){ arr[i] = 'http://' + arr[i] + port }
	obj.URL = JSON.stringify(arr)
	socket.send(JSON.stringify(obj))
}

function 退室(id:number){
	const client = clients.get(id)
	if(!client){return}
	dispatch(`[${client.ニックネーム}]さんが退室しました`)
	clients.delete(id)
	誰も居なくなったらサーバを終了させる()
}

function 誰も居なくなったらサーバを終了させる(){
	if(clients.size==0){
		// リロードの場合でもwebSocketが切断してしまうので、数秒後にも0のままなら終了する。
		setTimeout(()=>{
			if(0 < clients.size){return}
			Deno.exit()
		},5000)
	}
}

const clients  = new Map<number, {socket:WebSocket, ニックネーム:string}>()
let   clientId = 0

function dispatch(msg: string): void{
	log.push(msg)
	for(const key of clients.keys()){
		let client = clients.get(key)
		if(client==undefined){
			clients.delete(key)
			continue
		}

		try{ client.socket.send(JSON.stringify({mode:'msg', msg})) }
		catch(e){ clients.delete(key) } // メッセージの送信に失敗した相手は切断済みと判断する。
	}
}

const log: string[] = []
