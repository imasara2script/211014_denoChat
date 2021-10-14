const port = '49152'

const ws     = new WebSocket(`ws://172.24.85.19:${port}/ws`)
ws.onopen    = ()=>{ console.log('open'); ws.send('123') }
ws.onmessage = ({data})=>{ console.log(`msg:${data}`) }
ws.onclose   = ()=>{ console.log('close') }

const listner = Deno.listen({port: 49153})
for await(const conn of listner){
	console.log('con')
}
