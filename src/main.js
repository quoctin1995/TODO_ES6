 
class Model {
    constructor() {}

    set value(value) {
        this._value = value;
    }

    get value() {
        return this._value;
    }

    set id(id) {
        this._id = id;
    }

    get id() {
        return this._id;
    }

    get isEnabled() {
        return this._isEnabled;
    }

    set isEnabled(status) {
        this._isEnabled = status;
    }
}

cleanIsHidden = () => {
    let results = JSON.parse(localStorage.getItem("values"));
    let newObject = new Array();
    for (let i = 0; i < results.length; i++) {
        if (results[i]._isEnabled === false) {
            newObject.push(results[i]);
        }
    }
    document.getElementById("cleanCompleted").style.display = "none";
    if (newObject.length > 0) {
        document.getElementById("cleanCompleted").style.display = "inherit";
    }
}



viewResult = (data, action) => {
    let view = "";
    let viewNumberItem = data.length;
    let checked = "";
    let completed = ""
    data.forEach(item => {
        if (item._isEnabled == false) {
            checked = "checked";
            completed = "completed";
        }
        view += `<li data-id="" class="${completed}" id="li${item._id}" >
                    <div class=\"view\" id="div${item._id}" >
                        <input onmouseup="checkOrUncheck(this, ${item._id})" class=\"toggle\" type=\"checkbox\" id="checkbox${item._id}" ${checked}>
                        <label class="${item._id}"  ondblclick="changeInputTag(${item._id})">${item._value}</label>
                        <button onmouseup="remove(${item._id})" class=\"destroy\"></button>
                    </div>
                </li>`;
        checked = "";
        completed = "";
    }, this);
    if (data !== null) {
        document.querySelector('#divFooter').innerHTML = `<footer id="innerFooter" class="footer" style="display: block;"><span class="todo-count"><strong id="numberItem">1</strong> item left</span><ul class="filters"><li><a id="allAction" href="#" onclick="viewAll()">All</a></li<li><a id="action" href="#" onclick="viewActive()">Active</a></li><li><a id="completed" href="#" onclick="viewUnActive()">Completed</a></li></ul><button class="clear-completed" id="cleanCompleted" onclick="removeCompleted()">Clear Completed</button></footer>`
    }

    if (action === 'allAction') {
        document.querySelector('#allAction').innerHTML = `<a id="allAction" href="#" class="selected" onclick="viewAll()">All</a> `
        document.querySelector('#action').innerHTML = ` <a id="action" href="#"  onclick="viewActive()">Active</a> `
        document.querySelector('#completed').innerHTML = `<a id="completed" href="#"  onclick="viewUnActive()">Completed</a>`
    }

    if (action === 'action') {
        document.querySelector('#allAction').innerHTML = `<a id="allAction" href="#" onclick="viewAll()">All</a> `
        document.querySelector('#action').innerHTML = ` <a id="action" href="#" class="selected" onclick="viewActive()">Active</a> `
        document.querySelector('#completed').innerHTML = `<a id="completed" href="#"  onclick="viewUnActive()">Completed</a>`
    }

    if (action === 'completed') {
        document.querySelector('#allAction').innerHTML = `<a id="allAction" href="#" onclick="viewAll()">All</a> `
        document.querySelector('#action').innerHTML = ` <a id="action" href="#"  onclick="viewActive()">Active</a> `
        document.querySelector('#completed').innerHTML = `<a id="completed" href="#" class="selected" onclick="viewUnActive()">Completed</a>`
    }
    document.querySelector('#viewList').innerHTML = view
    document.querySelector('#numberItem').innerHTML = viewNumberItem
    cleanIsHidden();
}


newItem = (e) => {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
        let value = document.querySelector('#inputText').value;

        if (value === '') {
		    alert("You must write something to be done!");
		} else{
	        model = new Model();
	        model.value = value;

	        let results = JSON.parse(localStorage.getItem("values"));
	        model._isEnabled = true;
	        if (results) {
	            let maxId = 0;
	            results.forEach(item => {
	                if (item._id > maxId) {
	                    maxId = item._id;
	                }
	            }, this);
	            maxId = maxId + 1;
	            model._id = maxId;
	            results.push(model);
	            localStorage.setItem("values", JSON.stringify(results));
	        } else {
	            results = new Array();
	            model._id = 1;
	            results.push(model);
	            localStorage.setItem("values", JSON.stringify(results));
	        }

	        viewResult(results);
	        document.querySelector('#inputText').value = "";
    	}
    }

}

check = (results) => {
    let check = false;
    if (results.length == 0) {
        return true;
    } else {
        return false;
    }
}

remove = (id) => {
    if (id != null || id != undefined) {

        let results = JSON.parse(localStorage.getItem("values"));
        let target = null;
        if (results !== undefined || results !== null || results !== []) {
            let size = results.length;
            for (let i = 0; i < size; i++) {
                if (results[i]._id == id) {
                    target = results[i];
                    results.splice(i, 1);
                    localStorage.setItem("values", JSON.stringify(results));
                    document.getElementById(`li${id}`).remove();
                    if (check(results)) {
                        document.getElementById(`innerFooter`).remove();
                    }
                    document.querySelector('#numberItem').innerHTML = results.length;
                    break;
                }

            }
        }

    }
}

checkOrUncheck = (e, id) => {

    let results = JSON.parse(localStorage.getItem("values"));
    let target = null;
    if (id !== undefined || id !== null) {
        for (let i = 0; i < results.length; i++) {
            if (results[i]._id === id) {
                results[i]._isEnabled = !results[i]._isEnabled;
                target = results[i];
            }
        }
        localStorage.setItem("values", JSON.stringify(results));
    }

    document.getElementById(`checkbox${id}`).checked = target._isEnabled;
    if (target._isEnabled == false) {
        document.getElementById(`li${id}`).classList.toggle('completed');
    } else {
        document.getElementById(`li${id}`).classList.remove('completed');
    }
    cleanIsHidden();
}

viewActive = () => {
    let results = JSON.parse(localStorage.getItem("values"));
    let newObject = new Array();
    for (let i = 0; i < results.length; i++) {
        if (results[i]._isEnabled === true) {
            newObject.push(results[i]);
        }
    }
    let action = "action"
    viewResult(newObject, action);
}

viewUnActive = () => {
    let results = JSON.parse(localStorage.getItem("values"));
    let newObject = new Array();
    for (let i = 0; i < results.length; i++) {
        if (results[i]._isEnabled === false) {
            newObject.push(results[i]);
        }
    }
    let action = "completed"
    viewResult(newObject, action);
}

viewAll = () => {
    let results = JSON.parse(localStorage.getItem("values"));
    let action = "allAction";
    viewResult(results, action);
}

editmouse = (id) => {
    let results = JSON.parse(localStorage.getItem("values"));
    let newObject;
    if (id !== undefined || id !== null) {
        for (let i = 0; i < results.length; i++) {
            if (results[i]._id === id) {
                newObject = results[i];
            }
        }
    }
    let value = document.querySelector(`#inputText${id}`).value;
    newObject._value = value;

    let target = null;
    if (results !== undefined || results !== null || results !== []) {
        for (let i = 0; i < results.length; i++) {
            if (results[i] === id) {
                results[i]._value = newObject._value;
                target = results[i];
            }
        }
    }
    localStorage.setItem("values", JSON.stringify(results));

    let checked = "";
    if (newObject._isEnabled == false) {
        checked = "checked";
    }
    document.querySelector(`#div${id}`).innerHTML = `<input onmouseup="checkOrUncheck(this, ${id})" class=\"toggle\" type=\"checkbox\" id="checkbox${id}" ${checked}>
            <label class="${id}"  ondblclick="changeInputTag(${id})">${newObject._value}</label>
            <button onmouseup="remove(${id})" class=\"destroy\"></button>`;
}

changeInputTag = (id) => {
    let results = JSON.parse(localStorage.getItem("values"));
    let newObject;
    if (id !== undefined || id !== null) {
        for (let i = 0; i < results.length; i++) {
            if (results[i]._id === id) {
                newObject = results[i]
            }
        }
    }
    let view = `<input type=\"text\" value="${newObject._value}" id="inputText${id}" style="display: block; width: 506px; padding: 13px 17px 12px 17px; margin: 0 0 0 43px;" onkeypress="edit(this, ${id})"  onmouseout="editmouse(${id})"/>`;
    document.querySelector(`#div${id}`).innerHTML = view
}

removeCompleted = () => {
    let results = JSON.parse(localStorage.getItem("values"));
    let objects = [];
    if (results !== undefined || results !== null || results !== []) {
        for (let i = 0; i < results.length; i++) {
            if (results[i]._isEnabled === true) {
                objects.push(results[i]);
            }
        }
    }
    localStorage.setItem("values", JSON.stringify(objects));
    viewResult(objects);
    if (check(objects)) {
        document.getElementById(`innerFooter`).remove();
    }
}

changeAll = () => {
    let results = JSON.parse(localStorage.getItem("values"));
    let check = false;
    for (let i = 0; i < results.length; i++) {
        if (results[i]._isEnabled === true) {
            check = true;
        }
    }
    if (check) {
        for (let i = 0; i < results.length; i++) {
            results[i]._isEnabled = false;
        }
    } else {
        for (let i = 0; i < results.length; i++) {
            results[i]._isEnabled = true;
        }
    }
    localStorage.setItem("values", JSON.stringify(results));
    viewResult(results);
    cleanIsHidden();
}

edit = (e, id) => {
    if (!e) e = window.event;
    var keyCode = window.event.keyCode || e.which;
    if (keyCode == '13') {
        let results = JSON.parse(localStorage.getItem("values"));
        let newObject;
        if (id !== undefined || id !== null) {
            for (let i = 0; i < results.length; i++) {
                if (results[i]._id === id) {
                    newObject = results[i];
                }
            }
        }

        let value = document.querySelector(`#inputText${id}`).value;
        newObject._value = value;

        let target = null;
        if (results !== undefined || results !== null || results !== []) {
            for (let i = 0; i < results.length; i++) {
                if (results[i] === id) {
                    results[i]._value = newObject._value;
                    target = results[i];
                }
            }
        }
        localStorage.setItem("values", JSON.stringify(results));

        let checked = "";
        if (newObject._isEnabled == false) {
            checked = "checked";
        }
        document.querySelector(`#div${id}`).innerHTML = `<input onmouseup="checkOrUncheck(this, ${id})" class=\"toggle\" type=\"checkbox\" id="checkbox${id}" ${checked}>
            <label class="${id}"  ondblclick="changeInputTag(${id})">${newObject._value}</label>
            <button onmouseup="remove(${id})" class=\"destroy\"></button>`;
    }
}