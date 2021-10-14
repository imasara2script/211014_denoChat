import { listenAndServe } from "https://deno.land/std/http/server.ts";

export async function httpサーバを起動(httpリクエスト処理: any){
	const port = await 空いてるport番号を返す()
	const server = listenAndServe({ port: port }, async (req)=> { httpリクエスト処理(req) });
	console.log(`HTTP webserver running.  Access it at:  http://localhost:` + port + `/`)
	ブラウザ起動(port)
}

function ブラウザ起動(port: number){
	Deno.run({cmd:['cmd', '/C start http://localhost:'+port]})
}

async function 空いてるport番号を返す(): Promise<number>{
	let pathBat = await 一時ファイルを作成('netstat -na | find "%~1"')
	if(pathBat.match(/[ 　]/)){
		throw new Error('一時ファイルのPathにスペースが含まれています。\n'+pathBat+'\nDeno.runでは「"」の記号の前に「\\」が挿入されてしまうため、使用できません。')
	}
	
	for(let port=49152; port<=65535 ;port++){
		const p = Deno.run({cmd:['cmd', '/C', 'chcp 65001 & '+pathBat+' ' + port], stdout:'piped'})
		const o = await p.output()
		const text = new TextDecoder().decode(o)
		if(text.indexOf(':'+port)==-1){
			Deno.remove(pathBat)
			return port
		}
	}
	throw new Error('throw from port num search')
}

async function 一時ファイルを作成(value:string){
	const path = await Deno.makeTempFile({prefix: 'deno_tmp', suffix:'.bat'})
	await Deno.writeTextFile(path, value)
	return path
}
