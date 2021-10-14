	最前面 = function(){
		var tmp = document.createElement('div')
		tmp[iH] = (''+function(){/*
			<div style="display:none;position:absolute;top:0px;left:0px;" class=max>
				<div style="position:absolute;background-color:#000;opacity:0.5" class=max></div>
				<table class=max style="position:absolute"><td class=ta-c><table style="margin:0px auto;"><td style="background-color:#fff;padding:20px;">表示領域</td></table></td></table>
			</div>
		*/}).split('/*')[1].split('*/')[0]
		
		var main = function(fun初期化){
			var objElem = function(){
				var topElem    = document.body[iB](tmp[FI].cloneNode(true), null)
				var td表示領域 = for0L(getsBTN(topElem,'td'),function(i,elem){
					if(elem[FI] && elem[FI].tagName){return}
					return elem[iT]=='表示領域' ? elem : 0
				})
				return {
					top : topElem,
					td  : td表示領域
				}
			}()
			objElem.top.onclick = function(){
				cancelBubble()
				main.非表示()
			}
			objElem.top.onkeyup = function(){
				if(event.keyCode != 27){return} // Escキーが押された場合のみ実行
				cancelBubble()
				main.非表示()
			}
			var main = function(str){
				objElem.top.style.display = 'block'
				objElem.td[iH] = str || ''
				return objElem.td
			}
			main.objElem = objElem
			
			var funClose時
			main.非表示にする時に実行 = function(fun){ funClose時 = fun }
			main.非表示 = function(){
				funClose時 && funClose時()
				objElem.top.remove(true)
				階層--
				if(階層==0 && 最前面表示を解除する時に実行する){ 最前面表示を解除する時に実行する() }
			}
			fun初期化 && fun初期化(main)
			階層++
			if(階層==1 && 最前面表示する時に実行する){ 最前面表示する時に実行する() }
			return main
		}
		
		var 階層 = 0
		var 最前面表示する時に実行する
		var 最前面表示を解除する時に実行する
		main.一枚目の表示前後に行う処理を設定 = function(func最前面表示する時に実行する, func最前面表示を解除する時に実行する){
			// iframeやselectエレメントは、他のエレメントをその上に重ねることができない。
			// 最前面表示するためのエレメントもiframeやselectエレメントで隠れてしまうので
			// 最前面表示する直前にiframeなどを何らかの方法で非表示にする必要がある。
			// 最前面表示を実行する度に、コールする箇所で表示・非表示の切り替えを行うのは冗長なので
			// 最前面表示用関数の方で対応する。
			
			最前面表示する時に実行する       = func最前面表示する時に実行する
			最前面表示を解除する時に実行する = func最前面表示を解除する時に実行する
		}
		
		main.msg = function(msg, btns, focusするボタンの名前){
			var obj = main()
			var elem = obj('<div>'+msg+'</div><div class=ta-c style="padding-top:30px"><button>OK</button></div>')
			var btn = getsBTN(elem, 'button')[0]
			var btnエリア = btn[PA]
			elem.onclick = cancelBubble
			btn.onclick = obj.非表示
			
			if(!btns){
				遅延実行(function(){ btn.focus() })
				return obj
			}
			btn = btn.remove()
			var objBtns = {}
			forIn(btns, function(表示文字列, func){
				var btnNew = objBtns[表示文字列] = btn.cloneNode(true)
				btnエリア[iB](btnNew)
				btnNew[iT]     = 表示文字列
				btnNew.onclick = function(){ func && func(obj) }
			})
			focusするボタンの名前 && objBtns[focusするボタンの名前] && 遅延実行(function(){ objBtns[focusするボタンの名前].focus() })
			return obj
		}
		
		return main
	}()
