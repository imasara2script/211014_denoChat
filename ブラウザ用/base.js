function for0L(arr, fun){
	for(let i=0, L=arr.length; i<L ;i++){
		const v = fun(i, arr[i])
		if(v){return v}
	}
}
function forIn(obj, fun){
	for(const name in obj){
		const v = fun(name, obj[name])
		if(v){return v}
	}
}
function get日時(dt) {
	if(!dt){dt = new Date()}
	const f = (num, 桁数) => { return ('000' + num).slice(-桁数) }
	const obj = {
		FullYear : 4,
		Month    : 2,
		Date     : 2,
		Hours    : 2,
		Minutes  : 2,
		Seconds  : 2,
		Milliseconds : 3
	}
	const 間 = '// ::: '.split('')
	let str出力 = ''
	forIn(obj, (name, 桁数)=>{
		str出力 += f(dt['get'+name]() + (name=='Month'?1:0), 桁数) + 間.shift()
	})
	return str出力.slice(0, str出力.length-1)
}

// A parameter initializer is only allowed in a function or constructor implementation.
// パラメーター初期化子は、関数またはコンストラクターの実装でのみ許可されます。
