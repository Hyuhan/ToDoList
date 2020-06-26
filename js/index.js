
window.onload = function() {
	//localStorage.clear();
	loadList();
	
	document.getElementById("color-variations").classList.add("sleep");
	document.getElementById("setting").addEventListener("touchend", function() {
		let colorVariation = document.getElementById("color-variations");
		if(colorVariation.classList.contains("sleep"))
		{
			colorVariation.classList.remove("sleep");
		}
		else
		{
			colorVariation.classList.add("sleep");
		}
	});
	
	let selection = document.getElementsByClassName("selection");
	for(let i = 0; i < selection.length; i++)
	{
		selection[i].addEventListener("touchend",  function() {
			let color = window.getComputedStyle(this).backgroundColor;
			localStorage.setItem("theme", color);
			setTheme();
			event.stopPropagation();
		});
	}
	
	document.getElementsByClassName("input-field")[0].onblur = addToDo;
}

function addToDo() {
	if(this.value != "")
	{
		let data = getData();
		let add = {"con": this.value, "ty": true};
		data.push(add);
		localStorage.setItem("MYtodoList",JSON.stringify(data));
		loadList();
	}
	this.value = "";
}

function loadList() {
	let list = localStorage.getItem("MYtodoList");
	if(list != null)
	{
		let data = JSON.parse(list);
		let todoList = document.getElementById("todo");
		let donelist = document.getElementById("done");
		let todo = "";
		let done = "";
		let showTodo = false;
		let showDone = false;
		if(document.getElementById("show-todo").classList.contains("display"))
		{
			showTodo = true;
		}
		if(document.getElementById("show-done").classList.contains("display"))
		{
			showDone = true;
		}
		for(let i = data.length - 1; i >= 0; i--)
		{
			if(data[i].ty && showTodo)
			{
				todo += "<li class='color-change-li'>"
				+ "<p id='p-" + i + "' ontouchend='javascript:edit(" + i + ")'>"
				+ data[i].con + "</p><a class='check color-change-a' href='javascript:changeState("
				+ i + ", false)'><img src='image/icon-test.svg' /></a>"
				+ "<a class='cancel color-change-a' href='javascript:deleteOne("
				+ i + ")'><img src='image/close.svg' /></a></li>";					
			}
			else if((!data[i].ty) && showDone)
			{
				done += "<li class='color-change-li'>"
				+ "<p id='p-" + i + "' ontouchend='javascript:edit(" + i + ")'>"
				+ data[i].con + "</p><a class='check color-change-a' href='javascript:changeState("
				+ i + ", true)'><img src='image/upward.svg' /></a>"
				+ "<a class='cancel color-change-a' href='javascript:deleteOne("
				+ i + ")'><img src='image/close.svg' /></a></li>";
			}
		}
		todoList.innerHTML = todo;
		donelist.innerHTML = done;
		setTheme();
	}
}

function setTheme()
{
	let color = localStorage.getItem("theme");
	if(color != null)
	{
		let changeLi = document.getElementsByClassName("color-change-li");
		for(let i = 0; i < changeLi.length; i++)
		{
			changeLi[i].style.borderLeftColor = color;
		}
		let changeA = document.getElementsByClassName("color-change-a");
		for(let i = 0; i < changeA.length; i++)
		{
			changeA[i].style.backgroundColor = color;
		}
	}
}

function getData() {
	var todoList = localStorage.getItem("MYtodoList");
	if(todoList != null)
	{
		return JSON.parse(todoList);
	}
	else
	{
		return [];
	}
}

function changeState(i, ty)
{
	let data = getData();
    data[i]["ty"] = ty;
	localStorage.setItem("MYtodoList",JSON.stringify(data));
	loadList();
}

function deleteOne(i)
{
	let data = getData();
	data.splice(i, 1);
	localStorage.setItem("MYtodoList",JSON.stringify(data));
	loadList();
}

function edit(i)
{
	let item = document.getElementById("p-" + i);
	if(document.getElementById("edit") != null)
	{
		return;
	}
	let con = item.innerHTML;
	item.innerHTML = "<input id='edit' value='" + con + "' />";
	let input = document.getElementById("edit");
	input.focus();
	input.onblur = function() {
		if(input.value == "" || input.value == con)
		{
			item.innerHTML = con;
		}
		else
		{
			let data = getData();
			data[i]["con"] = input.value;
			localStorage.setItem("MYtodoList",JSON.stringify(data));
			loadList();
		}
	}
}

function allDo(ty) {
	let data = getData();
	for(let i = 0; i < data.length; i++)
	{
		data[i]["ty"] = ty;
	}
	localStorage.setItem("MYtodoList",JSON.stringify(data));
	loadList();
}

function deleteAll(ty) {
	let data = getData();
	for(let i = 0; i < data.length; i++)
	{
		if(data[i]["ty"] == ty)
		{
			data.splice(i, 1);
			i--;
		}
	}
	localStorage.setItem("MYtodoList",JSON.stringify(data));
	loadList();
}

function folder(ty) {
	let a;
	if(ty)
	{
		a = document.getElementById("show-todo");
	}
	else
	{
		a = document.getElementById("show-done");
	}
	
	if(a.classList.contains("display"))
	{
		a.classList.remove("display");
		a.firstChild.src = "image/upward.svg";
	}
	else
	{
		a.classList.add("display");
		a.firstChild.src = "image/down.svg";
	}
	loadList();
}
