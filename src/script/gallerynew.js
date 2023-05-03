const url = "http://personaldiary-backernd-env.eba-ngkpwptm.eu-north-1.elasticbeanstalk.com"



const addAlbum = `
<div class="card" >
    <h5 class="card-header">Create New Album</h5>
    <div class="card-body">


        <div  id="galleryForm">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Caption</label>
              <input type="text" class="form-control" id="title" aria-describedby="emailHelp">
              <p class="card-text" style="color:grey">Please add your caption to make you better understand about your memories! Powered by <b> Personal Diary</b></p>

            </div>

            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Description</label>
              <textarea type="text" class="form-control" id="description"  rows="5"></textarea>
            </div>

            
            <div class="mb-3">
            <label for="files">Images:</label>
            <input type="file" id="files" name="files" accept="image/*" multiple required><br><br>
            <div>
            
            <button type="submit" class="btn btn-primary" onclick="addAl()">Add</button>
        </div>


    </div>
  </div>


`

let slicerForDate = (data) => {
    if(String(data) =="null")
    {
        return "Not yet Updated"
    }
    else{
  
   
    let obj = String(data).split("T")
    let date = String(obj[0]).split("-")
    let year = String(date[0])
    let month_ind = Number(date[1])
    let day = String(date[2])
  
    let month = ["January","February","March","April","May","June",
                "July","August","September","Octobar",
                 "November","December"]
    let getMonth = month[month_ind-1]
    // console.log(date)
  
    return `${day} ${getMonth} ${year}`
  
  }
  
  }


// Adding new Album

document.getElementById("addAlbum").addEventListener("click", () => {

    document.getElementById("UpdateCard").innerHTML = ""
    document.getElementById("UpdateCard").innerHTML = addAlbum;
})



// let addnewAlbum = async (obj) => {
//     await fetch(`${url}/api/user/${localStorage.getItem("UserId")}/createGallery`,obj)
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error(`Error: ${response.status} ${response.statusText}`);
//             }
//             return response.json();
//         })
//         .then((data) => {
//             alert(data.message)

//         })
//         .catch((error) => {
//             // return error
//             alert(error);
//         });

// }

// let addAlbuminAPI =()=>
// {

//     let caption = document.getElementById("getCaption").value
//     let desc= document.getElementById("getDesc").value
//     if(caption.length >0 && desc.length >0)
//     {

//         let create_obj = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },

//             body: JSON.stringify({
//                 caption : String(caption),
//                 description :String(desc)

//             })
//         };

//         addnewAlbum(create_obj)

//     }
//     else
//     {
//         alert("Please Fill the mandetory fields!")
//     }
// }


// ---------------------------------------

// const form = document.getElementById('galleryForm');

// form.addEventListener('submit', (e) => {

let createAlbumTroughAPI =async(obj)=>{
    
    await fetch(`${url}/api/user/${localStorage.getItem("UserId")}/createGallery`,obj)
        .then(response => response.json())
        .then(data => {
           alert("Created Successfully!")
           location.reload()
        })
        .catch(error => {
           alert("error")
        });
}

let addAl = async() => {
    

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const files = document.getElementById('files').files;


    const formData = new FormData();


    for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
    }

    formData.append('caption', title);
    formData.append('description', description);

    let obj =  {
        method: 'POST',  
        crossorigin: true,    
        mode: 'no-cors', 

        header: {
            "Content-Type" :"multipart/form-data; boundary=<calculated when request is sent>"
        },
        body: formData
    }

    createAlbumTroughAPI(obj)

    
};


// ----------------------------------------------------------


// /Fetching new <Album></Album>


let fetchAlbum = async () => {
    await fetch(`${url}/api/user/${localStorage.getItem("UserId")}/galleries?pageNumber=${localStorage.getItem("pageCount")}&pageSize=10&sortBy=createdAt&sortMode=1`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            // console.log(data.galleryModels.length
            //     )
            localStorage.setItem("isLastPAge",String(data.isLastPage))
            const change =
            ` <div class="container" style="float: right;">
            <button type="button" class="btn btn-outline-primary" onclick="previousPage()">Previous</button>
            <button type="button" class="btn btn-outline-secondary" onclick="nextPage()">Next</button>
           </div>`
           
            document.getElementById("changeData").innerHTML=change

            for (let i = 0; i < data.galleryModels.length; i++) {
                const cards = ` <div class="card1">
            <div class="lines"></div>
            <div class="imgBox">
                 <img src="${data.galleryModels[i].galleryImages[0].imageURL}" alt="">
            </div>
            <div class="content">
                <div class="details">

                    <h2>${data.galleryModels[i].caption}</h2>
                    <p>${data.galleryModels[i].description}</p>
                    <p>${slicerForDate(data.galleryModels[i].createdAt)}</p>
                    <p>${slicerForDate(data.galleryModels[i].updatedAt)}</p>
                    <a id="${data.galleryModels[i].galleryId}" onclick="viewPage(this)">View</a>

                </div>
            </div>
            </div> 
`

                
                document.getElementById("UpdateCard").innerHTML+=cards

                
            }

            
          
          

        //   document.getElementsByClassName("logo")[0].innerHTML = `Welcome ${data.userModel.fullName}!`
            
        })
        .catch((error) => {
            // return error
            
        });

}

fetchAlbum()





let viewPage=(elem)=>
{
    let id = elem.id;
   localStorage.setItem("CurrentAlbumId",String(id));
   window.location ="../templates/albumview.html"

}


// Searching Using Caption

let search_api = async (caption) => {
    document.getElementById("UpdateCard").innerHTML=""
    await fetch(`${url}/api/user/${localStorage.getItem("UserId")}/galleries/searchByCaption?searchKey=${caption}&pageNumber=${localStorage.getItem("pageCount")}&pageSize=10&sortBy=createdAt&sortMode=1`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data)

            for(let i=0;i<data.galleryModels.length;i++)
            {
                const cards1 = ` <div class="card1">
                <div class="lines"></div>
                <div class="imgBox">
                     <img src="${data.galleryModels[i].galleryImages[0].imageURL}" alt="">
                </div>
                <div class="content">
                    <div class="details">
    
                        <h2>${data.galleryModels[i].caption}</h2>
                        <p>${data.galleryModels[i].description}</p>
                        <p>${slicerForDate(data.galleryModels[i].createdAt)}</p>
                        <p>${slicerForDate(data.galleryModels[i].updatedAt)}</p>
                        <a id="${data.galleryModels[i].galleryId}" onclick="viewPage(this)">View</a>
    
                    </div>
                </div>
                </div> 
                    `
                    document.getElementById("UpdateCard").innerHTML+=cards1
                    document.getElementById("changeData").innerHTML=""
                    

            }
            
         

        })
        .catch((error) => {
            // return error
            // alert(error);
            console.log(error)
        });
    }



    // /Previous Next Page

    let previousPage =()=>
    {
        let pageNo = localStorage.getItem("pageCount");
        if(Number(pageNo)==0)
        {
            alert("Already in the First Page")
        }
        else
        {
            localStorage.setItem("pageCount",String(Number(pageNo)-1));
            location.reload()
        }
    }


    let nextPage =()=>
    {
        let status = localStorage.getItem("isLastPAge");
        let pageNo = localStorage.getItem("pageCount");

        if(status=="true")
        {
            alert("Already in the last Page")
        }
        else
        {
            localStorage.setItem("pageCount",String(Number(pageNo)+1));
            location.reload()
        }
    }