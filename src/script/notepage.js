const note_card =   ` <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
<div class="card-header">Header</div>
<div class="card-body">
    <h5 class="card-title">Secondary card title</h5>
    <a href="#" class="card-link">Edit</a>
    <a href="#" class="card-link" style="color: red;">Delete</a>
</div>
</div>`

const url ="http://personaldiary-env.eba-pfsxhh9p.eu-north-1.elasticbeanstalk.com";

// Fetch all notes of the users

let fetchNote = async (pageNo) => {
    await fetch(
      `${url}/api/user/${localStorage.getItem(
        "UserId"
      )}/notes?pageNumber=${pageNo}&pageSize=10&sortBy=${localStorage.getItem("sort")}&sortMode=1`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("isLastPAge",String(data.isLastPage))
        for(let i=0;i<10;i++)
        {
                 
            document.getElementById("products").innerHTML =

            document.getElementById("products").innerHTML+

            ` <div class="col-lg-4 col-md-6 pt-md-0 pt-3" style="float: left;">
            <div class="card d-flex flex-column align-items-center">
                <div class="product-name" style="color: #2C2424">${data.noteModels[i].title}</div>
                <div class="card-body pt-0" style="margin-top:15%">
                <p> <b>Created At:</b>${data.noteModels[i].createdAt}</p>
                <p><b>Update Status:</b>${data.noteModels[i].updatedAt}</p>
                <a href="#" class="card-link" id="${data.noteModels[i].noteId}*"  onclick="getIdEdit(this)">Edit</a>
                    <a href="#" class="card-link" style="color: red;" id="${data.noteModels[i].noteId}+" onclick="getIdDelete(this)">Delete</a>
                    <button type="button" class="btn btn-outline-dark" style="color:black" id="${data.noteModels[i].noteId}" onclick="getId(this)">Read</button>
                </div>
            </div>
        </div>
`


        }
    

        
       
    
      })
      .catch((error) => {
        // return error
        // alert(error);
      });
  };


  



  let goToNote =()=>
  {
    window.location ="../templates/notes.html"

  }




let getNoteById = async (id,pageNo) => {
    await fetch(`${url}/api/user/${localStorage.getItem(
      "UserId"
    )}/notes?pageNumber=${pageNo}&pageSize=10&sortBy=${localStorage.getItem("sort")}&sortMode=1`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
          console.log(data.noteModels.length)
            for(let i=0;i<data.noteModels.length; i++)
                {
                    if(data.noteModels[i].noteId ==id)
                    {
                        // console.log(data.noteModels[i].title)
                        //  console.log(data.noteModels[i].description)

                        document.getElementById("mainPAge").innerHTML=`
                        <div class="container">
                        <div class="card mb-3">
                            <div class="card-body">
                               
                                <h5 class="card-title">${data.noteModels[i].title}</h5>
                                <p class="card-text">${data.noteModels[i].description}</p>
                            </div>
                        </div>
                        
                        <button type="button" class="btn float" onclick="location.reload();">
    <a class="float">
        <i class="fas fa-arrow-alt-circle-left my-float"></i>
    </a>
</button> 
                    </div>`
                     

                        
                    }
                }
         

        })
        .catch((error) => {
            // return error
            alert(error);
        });

}










fetchNote(Number(localStorage.getItem("pageCount")))
  
  function getId(ele)
  {
       let idNo = Number(ele.id)
       getNoteById(idNo, Number(localStorage.getItem("pageCount")))
  }





  


  // Next Page Loading 


  document.getElementById("next").addEventListener("click",()=>{
    
    if(localStorage.getItem("isLastPAge")=="true")
    {

    }
    else
    {
      let num = Number(localStorage.getItem("pageCount"))+1
    
      localStorage.setItem("pageCount",String(num));
      location.reload()
    }
  


  })


  document.getElementById("previous").addEventListener("click",()=>{
    
    if(Number(localStorage.getItem("pageCount"))>0)
    {
      let num = Number(localStorage.getItem("pageCount"))-1
    
      localStorage.setItem("pageCount",String(num));
      location.reload()
    }
    
    


  })



  // Delete the note




  
let DeleteNotes = async (deleteId) => {
  await fetch(
    `${url}/api/note/${deleteId}`,{method: "DELETE"}
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
     
      alert(data.message)
     
  
    })
    .catch((error) => {
      
    });
};


  function getIdDelete(ele)
  {
    let deleteId =String(ele.id).replace("+","")
    DeleteNotes(deleteId)
    setTimeout(()=>
    {
      location.reload()
    },1000)
   

    

  }


  // Edit the Notes



  

let EditNoteById = async (id,pageNo) => {
  await fetch(`${url}/api/user/${localStorage.getItem(
    "UserId"
  )}/notes?pageNumber=${pageNo}&pageSize=10&sortBy=noteId&sortMode=0`)
      .then((response) => {
          if (!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          return response.json();
      })
      .then((data) => {
      
          for(let i=0;i<data.noteModels.length; i++)
              {
                  if(data.noteModels[i].noteId ==id)
                  {

                document.getElementById("mainPAge").innerHTML=
                `  <link rel="stylesheet" href="../src/style/note.css" />

                


                <div class="container">
      <div class="options">
        <!-- Text Format -->
        <button id="bold" class="option-button format">
          <i class="fa-solid fa-bold"></i>
        </button>
        <button id="italic" class="option-button format">
          <i class="fa-solid fa-italic"></i>
        </button>
        <button id="underline" class="option-button format">
          <i class="fa-solid fa-underline"></i>
        </button>
        <button id="strikethrough" class="option-button format">
          <i class="fa-solid fa-strikethrough"></i>
        </button>
        <button id="superscript" class="option-button script">
          <i class="fa-solid fa-superscript"></i>
        </button>
        <button id="subscript" class="option-button script">
          <i class="fa-solid fa-subscript"></i>
        </button>

        <!-- List -->
        <button id="insertOrderedList" class="option-button">
          <div class="fa-solid fa-list-ol"></div>
        </button>
        <button id="insertUnorderedList" class="option-button">
          <i class="fa-solid fa-list"></i>
        </button>

        <!-- Undo/Redo -->
        <button id="undo" class="option-button">
          <i class="fa-solid fa-rotate-left"></i>
        </button>
        <button id="redo" class="option-button">
          <i class="fa-solid fa-rotate-right"></i>
        </button>

        <!-- Link -->
        <button id="createLink" class="adv-option-button">
          <i class="fa fa-link"></i>
        </button>
        <button id="unlink" class="option-button">
          <i class="fa fa-unlink"></i>
        </button>

        <!-- Alignment -->
        <button id="justifyLeft" class="option-button align">
          <i class="fa-solid fa-align-left"></i>
        </button>
        <button id="justifyCenter" class="option-button align">
          <i class="fa-solid fa-align-center"></i>
        </button>
        <button id="justifyRight" class="option-button align">
          <i class="fa-solid fa-align-right"></i>
        </button>
        <button id="justifyFull" class="option-button align">
          <i class="fa-solid fa-align-justify"></i>
        </button>
        <button id="indent" class="option-button spacing">
          <i class="fa-solid fa-indent"></i>
        </button>
        <button id="outdent" class="option-button spacing">
          <i class="fa-solid fa-outdent"></i>
        </button>

        <!-- Headings -->
        <select id="formatBlock" class="adv-option-button">
          <option value="H1">H1</option>
          <option value="H2">H2</option>
          <option value="H3">H3</option>
          <option value="H4">H4</option>
          <option value="H5">H5</option>
          <option value="H6">H6</option>
        </select>

        <!-- Font -->
        <select id="fontName" class="adv-option-button"></select>
        <select id="fontSize" class="adv-option-button"></select>

        <!-- Color -->
        <div class="input-wrapper">
          <input type="color" id="foreColor" class="adv-option-button" />
          <label for="foreColor">Font Color</label>
        </div>
        <div class="input-wrapper">
          <input type="color" id="backColor" class="adv-option-button" />
          <label for="backColor">Highlight Color</label>
        </div>

        <div class="input-wrapper">
            <input type="submit" id="${data.noteModels[i].noteId}+" class="adv-option-button btn btn-light" value="Save" onclick="updateNote(this)">
            
          </div>

      </div>
      <label id="label1" >Your Title</label>
      <div id="text-input1" contenteditable="true">${data.noteModels[i].title}</div>
      <div id="text-input" contenteditable="true">${data.noteModels[i].description}</div>

      <div>
                <button type="button" class="btn float" onclick="location.reload();">
                <a class="float">
                    <i class="fas fa-arrow-alt-circle-left my-float"></i>
                </a>
            </button> 
                </div>
    </div>
     
    

    <script src="../src/script/note.js"></script>

   
                `




                   

                      
                  }
              }
       

      })
      .catch((error) => {
          // return error
          alert(error);
      });

}





  function getIdEdit(element)
  {
    let editId =String(element.id).replace("*","")

    EditNoteById(editId,Number(localStorage.getItem("pageCount")))
  }




  let update = async(update_obj)=>{

    fetch(`${url}/api/note`,update_obj)
    .then((response) => {
      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
  })
  .then((data)=>{
    console.log(data)

  })
  .catch((error) => {
    // return error
    alert("Nothind specual");
});
  }




  function updateNote(elem)
  {
    let newTitle= document.getElementById("text-input1").value
    let newDesc = document.getElementById("text-input").value
    let id = String(elem.id).replace("+","")
    
    let update_obj={
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        noteId : id,
        title : String(newTitle),
        description : String(newDesc)
      }),

    }
      update(update_obj)

   

  }


  // Sort By Terminologies
//  console.log( document.getElementById("sort").value)
 let getVAlue = ()=>
{


  if(document.getElementById("gridRadios1").checked)
  {
    localStorage.setItem("sort","createdAt")
  }
  else if(document.getElementById("gridRadios2").checked)
  {
    localStorage.setItem("sort","title")
  }

  else if(document.getElementById("gridRadios3").checked)
  {
    localStorage.setItem("sort","updatedAt")
  }
  setTimeout(()=>
  {
    location.reload()
  }, 1000)
 

}


  // -------------------------------------------------------------------

  // /Searching Terminologies


  let searchByTitleValue = async(val)=>{

    fetch(`${url}/api/user/${localStorage.getItem("UserId")}/notes/searchByTitle?searchKey=${val}&pageNumber=${localStorage.getItem("pageCount")}&pageSize=10&sortBy=${localStorage.getItem("sort")}&sortMode=1`)
    .then((response) => {
      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
  })
  .then((data)=>{
    document.getElementById("products").innerHTML=""
    console.log(document.getElementById("products").innerHTML)
    for(let i=0;i<10;i++)
    {
           
      
        document.getElementById("products").innerHTML =
        
   
        document.getElementById("products").innerHTML+

        ` <div class="col-lg-4 col-md-6 pt-md-0 pt-3" style="float: left;">
        <div class="card d-flex flex-column align-items-center">
            <div class="product-name" style="color: #2C2424">${data.noteModels[i].title}</div>
            <div class="card-body pt-0" style="margin-top:15%">
            <p> <b>Created At:</b>${data.noteModels[i].createdAt}</p>
            <p><b>Update Status:</b>${data.noteModels[i].updatedAt}</p>
            <a href="#" class="card-link" id="${data.noteModels[i].noteId}*"  onclick="getIdEdit(this)">Edit</a>
                <a href="#" class="card-link" style="color: red;" id="${data.noteModels[i].noteId}+" onclick="getIdDelete(this)">Delete</a>
                <button type="button" class="btn btn-outline-dark" style="color:black" id="${data.noteModels[i].noteId}" onclick="getId(this)">Read</button>
            </div>
        </div>
    </div>
`


    }



  })
  .catch((error) => {
  
});
  }



  let searchBy=()=>
  {
   let searchdata = document.getElementById("ser1").value
   if (searchdata.length>0)
   {
    searchByTitleValue(searchdata)

   }
   else
   {
    alert("Please enter something!")
   }

  }