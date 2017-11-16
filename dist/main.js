"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
    function Model() {
        _classCallCheck(this, Model);
    }

    _createClass(Model, [{
        key: "value",
        set: function set(value) {
            this._value = value;
        },
        get: function get() {
            return this._value;
        }
    }, {
        key: "id",
        set: function set(id) {
            this._id = id;
        },
        get: function get() {
            return this._id;
        }
    }, {
        key: "isEnabled",
        get: function get() {
            return this._isEnabled;
        },
        set: function set(status) {
            this._isEnabled = status;
        }
    }]);

    return Model;
}();

cleanIsHidden = function cleanIsHidden() {
    var results = JSON.parse(localStorage.getItem("values"));
    var newObject = new Array();
    for (var i = 0; i < results.length; i++) {
        if (results[i]._isEnabled === false) {
            newObject.push(results[i]);
        }
    }
    document.getElementById("cleanCompleted").style.display = "none";
    if (newObject.length > 0) {
        document.getElementById("cleanCompleted").style.display = "inherit";
    }
};

viewResult = function viewResult(data, action) {
    var view = "";
    var viewNumberItem = data.length;
    var checked = "";
    var completed = "";
    data.forEach(function (item) {
        if (item._isEnabled == false) {
            checked = "checked";
            completed = "completed";
        }
        view += "<li data-id=\"\" class=\"" + completed + "\" id=\"li" + item._id + "\" >\n                    <div class=\"view\" id=\"div" + item._id + "\" >\n                        <input onmouseup=\"checkOrUncheck(this, " + item._id + ")\" class=\"toggle\" type=\"checkbox\" id=\"checkbox" + item._id + "\" " + checked + ">\n                        <label class=\"" + item._id + "\"  ondblclick=\"changeInputTag(" + item._id + ")\">" + item._value + "</label>\n                        <button onmouseup=\"remove(" + item._id + ")\" class=\"destroy\"></button>\n                    </div>\n                </li>";
        checked = "";
        completed = "";
    }, undefined);
    if (data !== null) {
        document.querySelector('#divFooter').innerHTML = "<footer id=\"innerFooter\" class=\"footer\" style=\"display: block;\"><span class=\"todo-count\"><strong id=\"numberItem\">1</strong> item left</span><ul class=\"filters\"><li><a id=\"allAction\" href=\"#\" onclick=\"viewAll()\">All</a></li<li><a id=\"action\" href=\"#\" onclick=\"viewActive()\">Active</a></li><li><a id=\"completed\" href=\"#\" onclick=\"viewUnActive()\">Completed</a></li></ul><button class=\"clear-completed\" id=\"cleanCompleted\" style=\"border: none; background-color: white\" onclick=\"removeCompleted()\">Clear Completed</button></footer>";
    }

    if (action === 'allAction') {
        document.querySelector('#allAction').innerHTML = "<a id=\"allAction\" href=\"#\" class=\"selected\" onclick=\"viewAll()\">All</a> ";
        document.querySelector('#action').innerHTML = " <a id=\"action\" href=\"#\"  onclick=\"viewActive()\">Active</a> ";
        document.querySelector('#completed').innerHTML = "<a id=\"completed\" href=\"#\"  onclick=\"viewUnActive()\">Completed</a>";
    }

    if (action === 'action') {
        document.querySelector('#action').innerHTML = "<a id=\"action\" href=\"#\" class=\"selected\" onclick=\"viewActive()\">Active</a>";
        document.querySelector('#allAction').innerHTML = "<a id=\"allAction\" href=\"#\"  onclick=\"viewAll()\">All</a> ";
        document.querySelector('#completed').innerHTML = " <a id=\"completed\" href=\"#\"  onclick=\"viewUnActive()\">Completed</a> ";
    }

    if (action === 'completed') {
        document.querySelector('#completed').innerHTML = "<a id=\"completed\" href=\"#\" class='selected' onclick=\"viewUnActive()\">Completed</a>";
        document.querySelector('#action').innerHTML = "<a  id=\"action\" href=\"#\"  onclick=\"viewActive()\">Active</a>";
        document.querySelector('#allAction').innerHTML = "<a id=\"allAction\" href=\"#\"  onclick=\"viewAll()\">All</a> ";
    }
    document.querySelector('#viewList').innerHTML = view;
    document.querySelector('#numberItem').innerHTML = viewNumberItem;
    cleanIsHidden();
};

save = function save(e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
        var value = document.querySelector('#inputText').value;
        model = new Model();
        model.value = value;

        var results = JSON.parse(localStorage.getItem("values"));
        model._isEnabled = true;
        if (results) {
            var maxId = 0;
            results.forEach(function (item) {
                if (item._id > maxId) {
                    maxId = item._id;
                }
            }, undefined);
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
};
check = function check(results) {
    var check = false;
    if (results.length == 0) {
        return true;
    } else {
        return false;
    }
    r;
};

remove = function remove(id) {
    if (id != null || id != undefined) {

        var results = JSON.parse(localStorage.getItem("values"));
        var target = null;
        if (results !== undefined || results !== null || results !== []) {
            var size = results.length;
            for (var i = 0; i < size; i++) {
                if (results[i]._id == id) {
                    target = results[i];
                    results.splice(i, 1);
                    localStorage.setItem("values", JSON.stringify(results));
                    document.getElementById("li" + id).remove();
                    if (check(results)) {
                        document.getElementById("innerFooter").remove();
                    }
                    document.querySelector('#numberItem').innerHTML = results.length;
                    break;
                }
            }
        }
    }
};

checkOrUncheck = function checkOrUncheck(e, id) {

    var results = JSON.parse(localStorage.getItem("values"));
    var target = null;
    if (id !== undefined || id !== null) {
        for (var i = 0; i < results.length; i++) {
            if (results[i]._id === id) {
                results[i]._isEnabled = !results[i]._isEnabled;
                target = results[i];
            }
        }
        localStorage.setItem("values", JSON.stringify(results));
    }

    document.getElementById("checkbox" + id).checked = target._isEnabled;
    if (target._isEnabled == false) {
        document.getElementById("li" + id).classList.toggle('completed');
    } else {
        document.getElementById("li" + id).classList.remove('completed');
    }
    cleanIsHidden();
};

viewActive = function viewActive() {
    var results = JSON.parse(localStorage.getItem("values"));
    var newObject = new Array();
    for (var i = 0; i < results.length; i++) {
        if (results[i]._isEnabled === true) {
            newObject.push(results[i]);
        }
    }
    var action = "action";
    viewResult(newObject, action);
};

viewUnActive = function viewUnActive() {
    var results = JSON.parse(localStorage.getItem("values"));
    var newObject = new Array();
    for (var i = 0; i < results.length; i++) {
        if (results[i]._isEnabled === false) {
            newObject.push(results[i]);
        }
    }
    var action = "completed";
    viewResult(newObject, action);
};

viewAll = function viewAll() {
    var results = JSON.parse(localStorage.getItem("values"));
    var action = "allAction";
    viewResult(results, action);
};

editmouse = function editmouse(id) {
    var results = JSON.parse(localStorage.getItem("values"));
    var newObject = void 0;
    if (id !== undefined || id !== null) {
        for (var i = 0; i < results.length; i++) {
            if (results[i]._id === id) {
                newObject = results[i];
            }
        }
    }
    var value = document.querySelector("#inputText" + id).value;
    newObject._value = value;

    var target = null;
    if (results !== undefined || results !== null || results !== []) {
        for (var _i = 0; _i < results.length; _i++) {
            if (results[_i] === id) {
                results[_i]._value = newObject._value;
                target = results[_i];
            }
        }
    }
    localStorage.setItem("values", JSON.stringify(results));

    var checked = "";
    if (newObject._isEnabled == false) {
        checked = "checked";
    }
    document.querySelector("#div" + id).innerHTML = "<input onmouseup=\"checkOrUncheck(this, " + id + ")\" class=\"toggle\" type=\"checkbox\" id=\"checkbox" + id + "\" " + checked + ">\n            <label class=\"" + id + "\"  ondblclick=\"changeInputTag(" + id + ")\">" + newObject._value + "</label>\n            <button onmouseup=\"remove(" + id + ")\" class=\"destroy\"></button>";
};

changeInputTag = function changeInputTag(id) {
    var results = JSON.parse(localStorage.getItem("values"));
    var newObject = void 0;
    if (id !== undefined || id !== null) {
        for (var i = 0; i < results.length; i++) {
            if (results[i]._id === id) {
                newObject = results[i];
            }
        }
    }
    var view = "<input type=\"text\" value=\"" + newObject._value + "\" id=\"inputText" + id + "\" style=\"display: block; width: 506px; padding: 13px 17px 12px 17px; margin: 0 0 0 43px;\" onkeypress=\"edit(this, " + id + ")\"  onmouseout=\"editmouse(" + id + ")\"/>";
    document.querySelector("#div" + id).innerHTML = view;
};

removeCompleted = function removeCompleted() {
    var results = JSON.parse(localStorage.getItem("values"));
    var objects = [];
    if (results !== undefined || results !== null || results !== []) {
        for (var i = 0; i < results.length; i++) {
            if (results[i]._isEnabled === true) {
                objects.push(results[i]);
            }
        }
    }
    localStorage.setItem("values", JSON.stringify(objects));
    viewResult(objects);
    if (check(objects)) {
        document.getElementById("innerFooter").remove();
    }
};

changeAll = function changeAll() {
    var results = JSON.parse(localStorage.getItem("values"));
    var check = false;
    for (var i = 0; i < results.length; i++) {
        if (results[i]._isEnabled === true) {
            check = true;
        }
    }
    if (check) {
        for (var _i2 = 0; _i2 < results.length; _i2++) {
            results[_i2]._isEnabled = false;
        }
    } else {
        for (var _i3 = 0; _i3 < results.length; _i3++) {
            results[_i3]._isEnabled = true;
        }
    }
    localStorage.setItem("values", JSON.stringify(results));
    viewResult(results);
    cleanIsHidden();
};

edit = function edit(e, id) {
    if (!e) e = window.event;
    var keyCode = window.event.keyCode || e.which;
    if (keyCode == '13') {
        var results = JSON.parse(localStorage.getItem("values"));
        var newObject = void 0;
        if (id !== undefined || id !== null) {
            for (var i = 0; i < results.length; i++) {
                if (results[i]._id === id) {
                    newObject = results[i];
                }
            }
        }

        var value = document.querySelector("#inputText" + id).value;
        newObject._value = value;

        var target = null;
        if (results !== undefined || results !== null || results !== []) {
            for (var _i4 = 0; _i4 < results.length; _i4++) {
                if (results[_i4] === id) {
                    results[_i4]._value = newObject._value;
                    target = results[_i4];
                }
            }
        }
        localStorage.setItem("values", JSON.stringify(results));

        var checked = "";
        if (newObject._isEnabled == false) {
            checked = "checked";
        }
        document.querySelector("#div" + id).innerHTML = "<input onmouseup=\"checkOrUncheck(this, " + id + ")\" class=\"toggle\" type=\"checkbox\" id=\"checkbox" + id + "\" " + checked + ">\n            <label class=\"" + id + "\"  ondblclick=\"changeInputTag(" + id + ")\">" + newObject._value + "</label>\n            <button onmouseup=\"remove(" + id + ")\" class=\"destroy\"></button>";
    }
};