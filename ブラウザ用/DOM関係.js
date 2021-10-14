dom短縮 = function(){
	var f = function(){
		forIn(obj, function(word, v){
			if(v == f){ return }
			eval(word + ' = v')
		})
	}
	var obj = {
		グローバル領域に展開:f,
		
		iB:'insertBefore',
		
		iT:'innerText',
		iH:'innerHTML',
		OP:'options',
		sI:'selectedIndex',
		
		PA:'parentNode',
		PR:'previousSibling',
		NE:'nextSibling',
		FI:'firstElementChild',
		CN:'childNodes'
	}
	
	return obj
}()
with(dom短縮){
	getsBTN=function(elem,name){return elem.getElementsByTagName(name)}
	ops更新=function(sel,arr,si){
		var ops=sel[OP]
		while(ops[0]){ops[0]=null}
		for0L(arr,function(i,str){ops[i]=new Option(str)})
		if(isFinite(si)){ sel[sI] = si }
	}
	selOps = function(sel){return sel[OP][sel[sI]]}
	cancelBubble = function(){ event.cancelBubble = true }
	ウィンドウサイズ位置記憶復元=function(path, objDef){
		objDef = objDef || {}
		var w=window, d=document, cW='clientWidth', cH='clientHeight', obj初期={L:objDef.L||400, T:objDef.T||400, W:objDef.W||400, H:objDef.H||400}
		var gets=function(){
			return {
				L : w.screenLeft  || w.screenX  || 0,
				T : w.screenTop   || w.screenY  || 0,
				W : w.innerWidth  || d.body[cW] || d.documentElement[cW] || 0,
				H : w.innerHeight || d.body[cH] || d.documentElement[cH] || 0
			}
		}
		with(obj初期){moveTo(L,T), resizeTo(W,H)}
		var obj差=gets(), obj今, 現在値を更新=function(){obj今=gets()}
		w.attachEvent('onresize', 現在値を更新)
		現在値を更新()
		
		AXO.fs.isExists(path) && eval(AXO.fs.Read(path))
		w.attachEvent('onbeforeunload', function(){
			現在値を更新()
			var f=function(chr){return obj今[chr]+obj初期[chr]-obj差[chr]}
			AXO.fs.Write(path, 'var s=screen,r=function(n,max){return n<max ? n : 0}; moveTo(r('+f('L')+',s.width),r('+f('T')+',s.height)); resizeTo('+f('W')+','+f('H')+')')
		})
	}
}
