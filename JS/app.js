const addBtn = document.querySelector(".btn");
const main = document.querySelector("#main")



//Logic To run addNote Function
addBtn.addEventListener(
    "click",
    function () {
        addNote()
    }
)




//Logic of savenotes function
const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea")
    const data = [];
    
    pushInData = (singleNote) => {
        data.push(singleNote.value)
    }
    notes.forEach(pushInData)
    //console.log(data)
    const jsonString = JSON.stringify(data)
    //console.log(jsonString)
    if(data.length === 0){
        localStorage.removeItem("notes")
    }
    else{
        localStorage.setItem("notes", jsonString)
    }
}




//Logic To add new note and delete note
const addNote = (text = "") => {


    //Function To add Note
    const newNote = document.createElement("div")
    newNote.classList.add("note")
    newNote.innerHTML = `
    <div class="toolbar">
                <i class="save fas fa-save"></i>
                <i class="trash fa fa-trash"></i>
            </div>
            <textarea>${text}</textarea>
    `
    main.appendChild(newNote)
    saveNotes();


    //Function To Delete Note
    const trash = newNote.querySelector(".trash");
    trash.addEventListener(
        "click",
        function () {
            newNote.remove()
            saveNotes()
        }
    )

    //When to run saveNotes function
    const save = newNote.querySelector(".save");
    save.addEventListener(
        "click",
        function () {
            saveNotes()
        }
    )
    //logic for auto-save
    newNote.querySelector("textarea").addEventListener(
        "focusout",
        function(){
            saveNotes()
        }
    )
}

//self-calling function to load a note when someone refresh the website
(
    function(){
        const lsNotes = JSON.parse(localStorage.getItem("notes"))
        //console.log(lsNotes)
       if(lsNotes === null){
        addNote()
       }
       else{
        lsNotes.forEach(
            (lsNote) =>{
                addNote(lsNote)
            }
        )
       }
    }
)()