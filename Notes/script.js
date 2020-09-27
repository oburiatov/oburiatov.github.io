var notes_id = [];
var notes_number = 0;
var data_storage = window.localStorage;
var links_to_Note_objects = [];
var url = window.location;

function seconds_with_leading_zeros(dt) {
    return (dt.getSeconds() < 10 ? '0' : '') + dt.getSeconds();
}

function minutes_with_leading_zeros(dt) {
    return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function AddNote() {

    var element = document.getElementById("mainNote"),
        link = document.createElement("div"),
        br = document.createElement("br"),
        content = document.createTextNode("Новая заметка"),
        now = new Date(),
        time = now.toDateString() + ', ' + now.getHours() + ':' + minutes_with_leading_zeros(now) + ':' + seconds_with_leading_zeros(now);


    notes_id.push(makeid());
    link.id = notes_id[notes_number++];
    link.classList.add("Notes");

    let another_one_note = new Note(link.id, "Новая заметка", "", false, link, time);
    links_to_Note_objects.push(another_one_note);


    element.appendChild(link);
    add_note_descriptions(link, content, document.createTextNode(time));
}

function HighlightNote(divID) {
    var link = document.getElementById(divID);
    dissapearing_active_Note();
    check_all_active_Notes();
    link.classList.remove("Notes");
    link.classList.add("active_Note");
    url.hash = divID;
    links_to_Note_objects.forEach(element => {
        element.__proto__ = Note.prototype;
        if (element.id === divID) {
            element.isHold = true;
            appearNoteField(element, link);
        }
    })



}

function DeleteNote() {

    links_to_Note_objects.forEach(Element => {
        Element.__proto__ = Note.prototype;
        if (Element.isHold) {
            var elem = document.getElementById("noteField");
            elem.value = "";
            var elem = document.getElementById(Element.id);
            elem.parentNode.removeChild(elem);
            var index = notes_id.indexOf(Element.id);
            if (index >= 0) {
                notes_id.splice(index, 1);
                links_to_Note_objects.splice(index, 1);
                notes_number--;
            }
        }
    })

}

function add_note_descriptions(element, content, time) {

    //    var p = document.createElement("p"),
    //        p1 = document.createElement("p");
    //
    //    element.appendChild(p);
    //    p.appendChild(content);
    //
    //    element.appendChild(p1);
    //    p1.appendChild(time);

    element.appendChild(content);
    element.appendChild(document.createElement("br"));
    element.appendChild(document.createElement("br"));
    element.appendChild(time);


}

function appearNoteField(note, link) {
    var element = document.getElementById("noteDIV");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    var textarea = document.createElement("textarea");
    textarea.type = 'text';
    textarea.name = 'valuer';
    textarea.id = "noteField";
    textarea.innerHTML = note.text;

    element.appendChild(textarea);
    textarea.focus();
    textarea.onchange = function () {
        var now = new Date();
        note.time = now.toDateString() + ', ' + now.getHours() + ':' + now.getMinutes() + ':' + seconds_with_leading_zeros(now);
        note.text = textarea.value;
        note.name = insert_title(textarea.value);
        change_title(note);

    }


}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function insert_title(text) {
    if (text.split("\n")[0].length < 25) {
        return text.split("\n")[0];
    } else if (text.split("\n")[0].length > 25) {
        return text.substr(0, 25).split("\n")[0] + '...';
    }
}

function change_title(class_note) {
    var object = document.getElementById(class_note.id);
    while (object.firstChild) {
        object.removeChild(object.firstChild);
    }
    add_note_descriptions(object, document.createTextNode(class_note.name), document.createTextNode(class_note.time));

    //    object.appendChild(document.createTextNode(class_note.name);
}

function check_all_active_Notes() {
    links_to_Note_objects.forEach(Element => {
        Element.__proto__ = Note.prototype;
        if (Element.isHold) {
            Element.isHold = false;
        }
    })
}

function dissapearing_active_Note() {
    links_to_Note_objects.forEach(Element => {
        Element.__proto__ = Note.prototype;
        if (Element.element.className == "active_Note") {
            Element.element.classList.remove("active_Note");
            Element.element.classList.add("Notes");
        }
        var element = document.getElementById("noteDIV");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    })
}

window.onbeforeunload = function () {

    data_storage.setItem("notesID", JSON.stringify(notes_id));

    data_storage.setItem("links_to_note_objects", JSON.stringify(links_to_Note_objects));
}

window.addEventListener('load', () => {
    data_storage.clear();
    let set_id = data_storage.getItem("notesID");
    let set_note_data = data_storage.getItem("links_to_note_objects");
    if (set_id != null && set_note_data != null) {
        notes_id = JSON.parse(set_id);
        notes_id.forEach(element => {
            notes_number++;
        });

        links_to_Note_objects = JSON.parse(set_note_data);
        links_to_Note_objects.forEach(element => {
            if (element.isHold == true) element.isHold = false;
            element.__proto__ = Note.prototype;
            var elem = document.getElementById("mainNote"),
                link = document.createElement("div"),
                br = document.createElement("br"),
                content = document.createTextNode(element.name),
                time = document.createTextNode(element.time);

            element.element = link;
            link.id = element.id;
            link.classList.add("Notes");
            elem.appendChild(link);
            add_note_descriptions(link, content, time);

        })


    }
})

window.onhashchange = function () {
    var current_hash = url.hash.split("#")[1];

    if (url.hash.length > 0) {
        if (current_hash === "/") {
            dissapearing_active_Note();
            url.hash = "/";
        } else {
            notes_id.forEach(Element => {
                if (Element === current_hash)
                    HighlightNote(current_hash);
            })
        }
    } else if (url.hash.length === 0) {
        dissapearing_active_Note();
        url.hash = "/";

    }



}

window.onclick = function (event) {
    if (notes_id.indexOf(event.target.id) != -1) {
        HighlightNote(event.target.id);
    }
}
