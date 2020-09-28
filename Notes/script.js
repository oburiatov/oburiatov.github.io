var notes_id = [],
    notes_number = 0,
    data_storage = window.localStorage,
    links_to_Note_objects = [],
    url = window.location;

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
        if (element.id === divID) {
            element.OnHold = true;
            appearNoteField(element, link);
        }
    })



}

function DeleteNote() {

    links_to_Note_objects.forEach(Element => {
        if (Element.OnHold) {
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
        note.time = now.toDateString() + ', ' + now.getHours() + ':' + minutes_with_leading_zeros(now) + ':' + seconds_with_leading_zeros(now);
        note.text = textarea.value;
        note.name = insert_title(textarea.value);
        change_title(note);
        save_notes();

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

}

function check_all_active_Notes() {
    links_to_Note_objects.forEach(Element => {
        if (Element.OnHold) {
            Element.OnHold = false;
        }
    })
}

function dissapearing_active_Note() {
    links_to_Note_objects.forEach(Element => {
        if (Element.HTMLDIVelem.className == "active_Note") {
            Element.HTMLDIVelem.classList.remove("active_Note");
            Element.HTMLDIVelem.classList.add("Notes");
        }
        var element = document.getElementById("noteDIV");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    })
}


function save_notes() {

    data_storage.setItem("notesID", JSON.stringify(notes_id));
    data_storage.setItem("links_to_note_objects", JSON.stringify(links_to_Note_objects));
}

function check_url() {
    var current_hash = url.hash.split("#")[1];

    var changed = Boolean(false);
    notes_id.forEach(Element => {
        if (Element === current_hash) {
            HighlightNote(current_hash);
            changed = true;
        }
    })

    if (changed === false) {
        dissapearing_active_Note();
        url.hash = "/";
    }
}


window.onbeforeunload = function () {

    save_notes();
}

window.addEventListener('load', () => {
    //data_storage.clear();
    let set_id = data_storage.getItem("notesID");
    let set_note_data = data_storage.getItem("links_to_note_objects");
    if (set_id != null && set_note_data != null) {
        notes_id = JSON.parse(set_id);
        notes_id.forEach(element => {
            notes_number++;
        });

        links_to_Note_objects = JSON.parse(set_note_data);
        links_to_Note_objects.forEach(element => {
            if (element.OnHold == true) element.OnHold = false;
            var elem = document.getElementById("mainNote"),
                link = document.createElement("div"),
                content = document.createTextNode(element.name),
                time = document.createTextNode(element.time);

            element.HTMLDIVelem = link;
            link.id = element.id;
            link.classList.add("Notes");
            elem.appendChild(link);
            add_note_descriptions(link, content, time);

        })
        check_url();
    }
})

window.onhashchange = function () {
    check_url();
}

window.onclick = function (event) {
    if (notes_id.indexOf(event.target.id) != -1) {
        HighlightNote(event.target.id);
    }
}
