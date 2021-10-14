export async function IPv4(): Promise<String[]>{
	const p = Deno.run({
		cmd: ["cmd", "/C", "chcp 65001 & ipconfig"],
		stdout: "piped"
	})
	
	const o    = await p.output()
	const text = new TextDecoder().decode(o)
	const arr  = []
	
	const m = match(text, /IPv4 Address[^:]+:[^\d]+([.\d]+)/g)
	if(!m){return []}
	for(let i=0; i < m.length ;i++){
		arr.push(m[i][1])
	}
	
	return arr
}

function match(str:String, re:RegExp){
	// 例えば/a(bc)/の場合、結果は["abc","bc"]のようになるが
	// /a(bc)/gの場合、結果は「"abc", "abc", "abc"…」となってしまう。
	// gオプションと「()」を併用したい場合、2回に分けてmatchする必要がある。
	// それを1回で出来るようにするための関数。
	
	const m = str.match(re)
	if(!m){return m}
	
	const arr = []
	const re2 = new RegExp(re.source)
	for(let i=0; i<m.length ;i++){
		const m2 = m[i].match(re2)
		if(!m2){continue}
		arr.push(m2)
	}
	return arr
}
