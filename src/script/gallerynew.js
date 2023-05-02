const url = "http://personaldiary-backernd-env.eba-ngkpwptm.eu-north-1.elasticbeanstalk.com"



const addAlbum = `
<div class="card" >
    <h5 class="card-header">Create New Album</h5>
    <div class="card-body">


        <form  id="galleryForm">
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
        </form>


    </div>
  </div>


`

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

let addAl = () => {

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const files = document.getElementById('files').files;

    const formData = new FormData();


    for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
    }

    formData.append('caption', title);
    formData.append('description', description);

    fetch(`${url}/api/user/${localStorage.getItem("UserId")}/createGallery`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // show success message or redirect to the gallery page
        })
        .catch(error => {
            console.error(error);
            // show error message
        });
};


// ----------------------------------------------------------


// /Fetching new <Album></Album>


let fetchAlbum = async () => {
    await fetch(`${url}/api/user/${localStorage.getItem("UserId")}/galleries?pageNumber=0&pageSize=10&sortBy=createdAt&sortMode=1`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            // console.log(data.galleryModels.length
            //     )

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
                    <p>${data.galleryModels[i].createdAt}</p>
                    <p>${data.galleryModels[i].updatedAt}</p>
                    <a id="${data.galleryModels[i].galleryId}" onclick="viewPage(this)">View</a>

                </div>
            </div>
            </div> 
`

                
                document.getElementById("UpdateCard").innerHTML+=cards
                
            }
        })
        .catch((error) => {
            // return error
            alert(error);
        });

}

fetchAlbum()





// View All Images




// let fetchImagesFromAlbumById= async (id) => {
//     await fetch(`${url}/api/gallery/${id}`)
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error(`Error: ${response.status} ${response.statusText}`);
//             }
//             return response.json();
//         })
//         .then((data) => {
            
//             document.getElementById("UpdateCard").innerHTML =
//             `<img src="${data.galleryModel.galleryImages[0].imageURL}" class="img-fluid" alt="...">`
//             console.log(data.galleryModel.galleryImages[0].imageURL)
//         })
//         .catch((error) => {
//             // return error
//             alert(error);
//         });

// }

let viewPage=(elem)=>
{
    let id = elem.id;
   localStorage.setItem("CurrentAlbumId",String(id));
   window.location ="../templates/albumview.html"

}