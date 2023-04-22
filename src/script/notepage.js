const note_card =   ` <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
<div class="card-header">Header</div>
<div class="card-body">
    <h5 class="card-title">Secondary card title</h5>
    <a href="#" class="card-link">Edit</a>
    <a href="#" class="card-link" style="color: red;">Delete</a>
</div>
</div>`



// Fetch all notes of the users

let fetchNote = async (pageNo) => {
    await fetch(
      `http://personaldiary-env.eba-pfsxhh9p.eu-north-1.elasticbeanstalk.com/api/user/${localStorage.getItem(
        "UserId"
      )}/notes?pageNumber=${pageNo}&pageSize=10&sortBy=noteId&sortMode=0`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
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
    await fetch(`http://personaldiary-env.eba-pfsxhh9p.eu-north-1.elasticbeanstalk.com/api/user/${localStorage.getItem(
      "UserId"
    )}/notes?pageNumber=${pageNo}&pageSize=10&sortBy=noteId&sortMode=0`)
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
    
    
    let num = Number(localStorage.getItem("pageCount"))+1
    
    localStorage.setItem("pageCount",String(num));
    location.reload()


  })


  document.getElementById("previous").addEventListener("click",()=>{
    
    
    let num = Number(localStorage.getItem("pageCount"))-1
    
    localStorage.setItem("pageCount",String(num));
    location.reload()


  })



  // Delete the note




  
let DeleteNotes = async (deleteId) => {
  await fetch(
    `http://personaldiary-env.eba-pfsxhh9p.eu-north-1.elasticbeanstalk.com/api/note/${deleteId}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
     
      // alert(data.message)
      console.log(data)
  
    })
    .catch((error) => {
      
    });
};


  function getIdDelete(ele)
  {
    let deleteId =String(ele.id).replace("+","")
    DeleteNotes(deleteId)
    

  }


  // Edit the Notes



  

let EditNoteById = async (id,pageNo) => {
  await fetch(`http://personaldiary-env.eba-pfsxhh9p.eu-north-1.elasticbeanstalk.com/api/user/${localStorage.getItem(
    "UserId"
  )}/notes?pageNumber=${pageNo}&pageSize=10&sortBy=noteId&sortMode=0`)
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
                              <input class="card-title" value = ${data.noteModels[i].title} style="    margin-bottom: .75rem;
                              width: 90%;
                              height: 15%;
                              border: 2px solid skyblue;
                              box-shadow: 5px 5px 5px grey;
                              float:left"
                              id="titleNew">
                              </input>


                              <button type="button" class="btn btn-outline-secondary" style="float:left;
                              color: #fff;
                              background-color: #6c757d;
                              border-color: #6c757d;
                              margin-left: 3%;
                              margin-top: 0.5%;
                              box-shadow: 2px 2px 2px 2px grey;" onclick="updateNote(this)" id="${data.noteModels[i].noteId}+">Save</button>
                              <br>


                              <textarea class="card-text" 
                              style="    overflow: auto;
                              resize: vertical;
                              width: 100%;
                              height: 60%;
                              border: 2px solid black;
                              box-shadow: 2px 2px 2px 2px grey;"
                              id="descNew">${data.noteModels[i].description} </textarea>
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





  function getIdEdit(element)
  {
    let editId =String(element.id).replace("*","")

    EditNoteById(editId,Number(localStorage.getItem("pageCount")))
  }




  let update = async(update_obj)=>{

    fetch("http://personaldiary-env.eba-pfsxhh9p.eu-north-1.elasticbeanstalk.com/api/note",update_obj)
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
    let newTitle= document.getElementById("titleNew").value
    let newDesc = document.getElementById("descNew").value
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