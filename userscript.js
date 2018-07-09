window.onload=function(){
// 	function GetUser(){
// 		var xhr = new XMLHttpRequest();
// 		xhr.open("GET","GetUser", true);
// 		xhr.send();
// 		xhr.onreadystatechange = function() {
// 			if (xhr.readyState != 4) 
// 				return;
// 			if (xhr.status != 200) {
// 				console.log(xhr.status + ': ' + xhr.statusText);
// 			}
// 			else  {
// 				var mas = JSON.parse(xhr.responseText);

// 			function createTable(mas,id){
// 				 var parent=document.getElementById(id);

// 				 	if (parent==null){
// 		                 alert("Відсутнє ID контейнера"); ///перевірка на присутність ID
// 		            return;
//    }
//                 var table=document.createElement("table");
//                     parent.appendChild(table);
//                        for(var i=0;i<mas.length;i++){

//    	            var tr=document.createElement("tr");
//    	                   table.appendChild(tr);
//    	                   for (var key in mas[i]){
//    		        var td=document.createElement("td");
//    		               tr.appendChild(td);
//    		               td.classList.add("td");
//    		               td.innerHTML=mas[i][key];


//    	  }
//    }
// }	//xhr.responseText пропарсити і з обєктів через ДОМ побудувати таблицю і віддати на сайт

// 					console.log(mas);
// 					createTable(mas,'mytable');

// 				}	
// 			}
// 		}
// 		GetUser();





var table = document.getElementById("table");
var name = document.getElementById("name");
var age = document.getElementById("age");
var salary = document.getElementById("salary");
var add = document.getElementById("add");
var update = document.getElementById("update");
var index = null;




function GetUser(){
	table.innerHTML='';
	var xhr = new XMLHttpRequest();
	xhr.open("GET","GetUser", true);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) 
			return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		}
		else  {
			var mas = JSON.parse(xhr.responseText);
			var table = document.getElementById("table");
			for(var i = 0;i < mas.length; i++){
				var tr = document.createElement("tr");
				table.appendChild(tr);
				for (var key in mas[i]){
					var td = document.createElement("td");
					tr.appendChild(td);
					td.innerHTML = mas[i][key];

				}
				var td = document.createElement("td");
				tr.appendChild(td);
				var btn = document.createElement("button");
				td.appendChild(btn);
				btn.classList.add('delete'); btn.innerHTML = "Delete";
				btn.onclick = DeleteUser;


				var td = document.createElement("td");
				tr.appendChild(td);
				var up = document.createElement("button");
				td.appendChild(up);
				up.classList.add('up'); up.innerHTML = "Up";

				up.onclick = updateUser;


				

				

			}	
		}
	}
}
GetUser();

function DeleteUser(){
	var index = this.parentNode.parentNode.rowIndex
	//alert(index);
	var xhr = new XMLHttpRequest();
	var obj = {index:index};
	var objson = JSON.stringify(obj);
	xhr.open("post","/delete", true);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) 
			return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		}
		else  {
			console.log(xhr.responseText);
			GetUser();
		}

		
	}

xhr.send(objson);
}






function addUser(user){
	
	var xhr = new XMLHttpRequest();
	xhr.open("post","/addUser", true);
	var obj = JSON.stringify(user);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(obj);
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) 
			return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		}
		else  {
			console.log(xhr.responseText);
			GetUser();
			clearInput();
		}

		
	}
	
}




add.onclick = function(){
		var user = {

		name: name.value,
		age: age.value,
		salary: salary.value
		}
		addUser(user);
		

	}






function updateUser(){
		var tr = this.parentNode.parentNode
		    index = tr.rowIndex;
		var tds = tr.querySelectorAll("td");
			name.value = tds[0].innerHTML;
			age.value = tds[1].innerHTML;
			salary.value = tds[2].innerHTML;
					
				
				}


function clearInput(){
	name.value='',
	age.value='',
	salary.value=''
		

}



update.onclick = function(){
	var user = {

		name: name.value,
		age: age.value,
		salary: salary.value
		}
		user.trIndex = index;
	var xhr = new XMLHttpRequest();
	xhr.open("post","/update", true);
	var obj = JSON.stringify(user);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(obj);
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) 
			return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		}
		else  {
			console.log(xhr.responseText);
			GetUser();
			clearInput();
		}

		
	}

}




}



