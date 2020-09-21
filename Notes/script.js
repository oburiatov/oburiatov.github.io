function appearNote() {
    var element = document.getElementById("addNote"),
        link = document.createElement("div"),
        content = document.createTextNode("Новая заметка");

    //    link.innerHTML = "FFF";
    //    link.href= '';
    link.id = "newNote";

    element.appendChild(link);
    link.appendChild(content);


}
