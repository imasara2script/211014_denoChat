import { webSocket接続 } from './webSocket接続.ts'
import { get絶対Path, isExists } from './絶対Path.ts'

export async function httpリクエスト処理(request:any, requestEvent: any){
//	const request = requestEvent.request
	console.log(`request.method:${request.method}`)
	
	if(request.method != 'GET'){return}
	
	console.log(`url:[${request.url}]`)
	
	let url = decodeURI(request.url).replace(/^http:\/\/[^\/]+/,'')
	console.log(`url:[${url}]`)
	
	if(url=='/ws'){return webSocket接続(request, requestEvent)}
	
	// if(url=='/'){ url = './index.html' }
	if(url=='/'){ url = '/index.html' }
	if(url.indexOf('/')==0){ url = './ブラウザ用' + url }
	url = await get絶対Path(url)
	console.log(`local path : ${url}`)
	
	// 「http://localhost/http://localhost」のような文字列を誤って入力された場合にisExistsの所でエラーになってしまうのでtry catchを使用している。
	/*
	let ファイルの有無
	try{ ファイルの有無 = await isExists(url) }
	catch(e){ ファイルの有無 = false }
	if(!ファイルの有無){
	*/
	if(!await isExists(url)){
		return requestEvent.respondWith(new Response(null, { status: 404 }))
	}
	
//	const file = await Deno.open(url)
	const file = await Deno.readFile(url)
	requestEvent.respondWith(
		new Response(
		//	`hello\n\n${url}`, {status:200}
			file, {status:200}
		)
	)
	/*
	requestEvent.respond({
		status: 200,
		headers: new Headers({"content-type": 拡張子2contentType(url)}),
		body: file
	});
	*/
}

function 拡張子2contentType(url: string):string{
	if(url.match(/\.htm(l?)$/)){return 'text/html'}
	if(url.match(/\.css$/)){return 'text/css'}
	if(url.match(/\.js$/)){return 'text/javascript'}
	return ''
}
