window.onload = function() {
	
	//找对象
	var searchInput = document.getElementById('searchInput');
	var searchTips = document.getElementById('searchTips');
	var tipsItems = searchTips.getElementsByTagName('li');
	
	//下标记数变量
	var keyIndex = -1;
	
	//文本框获得焦点显示提示内容
	searchInput.onfocus = function() {
		
		searchTips.style.display = 'block';
		
	}
	
	//阻止文本框单击事件冒泡
	searchInput.onclick = function(e) {
		e = e || window.event;
		e.stopPropagation ? e.stopPropagation():e.cancelBubble = true;
	}
	
	
	//网页单击隐藏提示内容
	document.onclick = function() {
		
		resetSearchTips();
		
	}
	
	//单击li显示对应的文字内容到文本框
	for (var i = 0;i < tipsItems.length - 1;i ++) {
		
		tipsItems[i].onclick = function() {
			
			//返回li中的提示文字
			var txt = this.getElementsByTagName('span')[0].innerText;
			
			searchInput.value = txt;
		}
		
		
		;(function(index) {
			
			//鼠标悬停li事件
			tipsItems[i].onmouseenter = function() {
				
				keyIndex = index;//当前下标赋给记数变量
				
			}
			
		})(i);
		
		
		//单击a标签删除当前li
		var a = tipsItems[i].getElementsByTagName('a')[0];
		
		a.onclick = function (e) {
			
			//阻止事件冒泡——上传文字
			e = e || window.event;
			e.stopPropagation ? e.stopPropagation():e.cancelBubble = true;
			
			//删除li
			searchTips.removeChild(this.parentNode);
			
		}
		
	}
	
	
	
	
	//键盘上下箭头选择提示文字
	document.onkeydown = function (e) {
		
		//判断提示内容是否是显示的
		if(searchTips.style.display != 'block') 
			return;
		
		
		e = e || window.event;
//		alert(e.keyCode);
		
		//esc键关闭提示内容
		
		if(e.keyCode == 27) {
			
			resetSearchTips();
			
		}
		
		//下箭头
		if(e.keyCode == 40) {
			
			keyIndex ++;//下标递增
			//超过最后一行，回到第一行
			if(keyIndex > tipsItems.length - 2) {
				keyIndex = 0;
			}
			
			lighthigh(keyIndex);//调用高亮函数
			
		}
		
		//上
		if(e.keyCode == 38) {
			
			keyIndex --;//下标递增
			//超过第一行，回到最后一行
			if(keyIndex < 0) {
				keyIndex = tipsItems.length - 2;
			}
			
			lighthigh(keyIndex);//调用高亮函数
			
		}
		//回车选择文字
		if(e.keyCode == 13) {
			//返回li中的提示文字
			var txt = tipsItems[keyIndex].getElementsByTagName('span')[0].innerText;
			
			searchInput.value = txt;
			
			resetSearchTips();
			
		}
		
	}
	
	//提示内容恢复到初始状态
	function resetSearchTips() {
		
		searchTips.style.display = 'none';//关闭提示内容
		searchInput.blur();//失去焦点
		
		lighthigh(-1);//去掉高亮
		keyIndex = -1;//下标初始化-1
	}
	
	//高亮函数
	function lighthigh(index) {
		
		//去掉所有的高亮
		for (var i = 0;i < tipsItems.length;i ++) {
			tipsItems[i].className = '';
			
		}
		
		if(index == -1) 
			return;
		
		//单独指定某一个元素高亮
		tipsItems[index].className = 'active';
		
	}
	
	
}
