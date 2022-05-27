showNotes();
const addNote = document.querySelector(".addNote");

addNote.addEventListener("click", () => {
    const noteTxt = document.querySelector(".noteInput");
    const addTitle = document.getElementById("title");
    let notes = localStorage.getItem("notes");//Getting Previous if there in local Storage
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: noteTxt.value
    }
    if (noteTxt.value == "") {
        alert("Entry some Text");
        return;
    }
    noteObj.push(myObj); //Pushed the Object into the noteObj Array
    localStorage.setItem("notes", JSON.stringify(noteObj)); //Storing noteObj as string in the local Storage notes : noteObj key: value pair 
    console.log(addTitle.value);
    noteTxt.value = "";
    addTitle.value = "";
    showNotes();

})

function showNotes() {
    let notes = localStorage.getItem("notes");//Getting notes from local storage
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    let html = "";

    noteObj.forEach(function (element, index) {
        if (element.title == "") {
            html += `
                <div class="notesCard" >
                    <h3 class="notesCardHead" >Note ${index + 1}</h3 >
                    <p class="notesPara">${element.text}</p>   
                    <button class="deleteNote" id="${index}" onclick="deleteNote(this.id)">Delete Note</button>
                </div >
                `;
        }
        else {
            html += `
                <div class="notesCard" >
                    <h3 class="notesCardHead" >${element.title}</h3 >
                    <p class="notesPara">${element.text}</p>
                    <button class="deleteNote" id="${index}" onclick="deleteNote(this.id)">Delete Note</button>
                </div >
                `;
        }
    });

    let yourNotes = document.querySelector(".yourNotesCollection");
    if (noteObj.lenght != 0)
        yourNotes.innerHTML = html;
    else {
        yourNotes.innerHTML = "Add Your Notes";
    }
}

function deleteNote(index) {
    // console.log(`Deleting note ${index} `);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    // console.log(noteObj);
    noteObj.splice(index, 1);
    // console.log(noteObj);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    showNotes();
}

const search = document.querySelector(".searchInputenter");

search.addEventListener("input", () => {
    let inputVal = search.value;
    // console.log("input event fired", inputVal);

    const notesCard = document.querySelectorAll(".notesCard");
    Array.from(notesCard).forEach(function (element) {
        let para = element.getElementsByTagName("p")[0].innerText;
        if ((para.includes(inputVal))) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})
