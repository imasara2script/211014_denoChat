import { httpリクエスト処理 } from './httpリクエスト処理.ts'
import { getParentDirectory } from './getParentDirectory.ts'

const denoVer = '1.14.1'

console.log(Deno.version)
if(Deno.version.deno!=denoVer && confirm('このプログラムはdeno '+denoVer+'で動作確認されています。\n現在使用中のdenoのバージョンは'+Deno.version.deno+'です。\n異なるバージョンでは正しく動作しない恐れがありますが、続行しますか？')==false){ Deno.exit() }

// index.htmlなどを使用するので、相対Pathでアクセスできるようにしておきたい。だからカレントディレクトリを変更する。
// …というつもりだったけど、以下の1行を有効にするとcompile後もcompile時のpathをカレントディレクトリにしてしまう。（compile後のexeファイルをD:\に置いてもカレントディレクトリがD:\にならなくなってしまう）
// Deno.chdir(decodeURI(getParentDirectory(import.meta.url)).replace(/^file:/,''))
// 上記1行を無効にしてcompile前、後の動作確認してみたら、問題なく使用できた。カレントディレクトリの指定は不要だった…。

const portNo = await 空いてるport番号を返す()
ブラウザ起動(portNo)

const listner = Deno.listen({port: portNo})
for await(const conn of listner){
	console.log('con')
	
	// https://deno.land/manual/runtime/http_server_apis#http-server-apis v1.14.2
	;(async () => {
		const httpConn = Deno.serveHttp(conn)
		for await (const requestEvent of httpConn){
			const url = new URL(requestEvent.request.url)
			httpリクエスト処理(requestEvent.request, requestEvent)
		}
	})()
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

function ブラウザ起動(port: number){
	Deno.run({cmd:['cmd', '/C start http://localhost:'+port]})
}
