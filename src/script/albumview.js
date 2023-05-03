const url ="http://personaldiary-backernd-env.eba-ngkpwptm.eu-north-1.elasticbeanstalk.com";


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


let fetchImagesFromAlbumById= async () => {
    await fetch(`${url}/api/gallery/${localStorage.getItem("CurrentAlbumId")}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            
            document.getElementsByClassName("intro")[0].innerHTML =
         
            `<h2 class="text-center">${data.galleryModel.caption}</h2>
            <p class="text-center">${data.galleryModel.description} </p>
            <p class="text-center"><b>Created: </b>${slicerForDate(data.galleryModel.createdAt)} </p>
            <p class="text-center"><b>Updated: </b>${slicerForDate(data.galleryModel.updatedAt)} </p>
       `


       for(let i=0 ;i<data.galleryModel.galleryImages.length ;i++)
       {
        document.getElementById("mainPhotos").innerHTML+=

        `<div class="col-sm-6 col-md-4 col-lg-3 item" >
            <a href="${data.galleryModel.galleryImages[i].imageURL}" data-lightbox="photos">
                <img class="img-fluid" src="${data.galleryModel.galleryImages[i].imageURL}">
            </a>
            <div class="text-center" style="margin-top:10px">
                <button type="button" class="btn btn-outline-success" id="${data.galleryModel.galleryImages[i].galleryImageId}" 
                onclick="update(this)">Update</button>
                <button type="button" class="btn btn-outline-danger" id="${data.galleryModel.galleryImages[i].galleryImageId}*" onclick="deleteImage(this)">Delete</button>
            </div>
            <input type="file" id="files" name="files" accept="image/*"  hidden>
    
        </div>
        `
       }

            
        })
        .catch((error) => {
            // return error
            alert(error);
        });

}

fetchImagesFromAlbumById()


// Update Album Image



let update_api = async (obj) => {
    await fetch(`${url}/api/gallery`,obj)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data)

        })
        .catch((error) => {
            // return error
            console.log(error);
        });

}


let update=  (elem)=>
{
    let fileInput = document.getElementById("files");
   

    let imageid =Number(elem.id);
    let galleryId = Number(localStorage.getItem("CurrentAlbumId"));
    const formData = new FormData();
    formData.append("galleryId",galleryId)
    formData.append("galleryImageId",imageid)

    let files = document.getElementById("files")
    files.click();

    
    formData.append("image",files.files[0])

    setTimeout(()=>{
        let obj = {
            method: "PUT",
            
            headers: {
                "Content-Type": "application/json",
            },
    
        
            body: formData
        }
    
        update_api(obj)
        
    },3000)
    
}


let uploadImage =(elem)=>
{
    document.getElementById("up").innerHTML= "";

    document.getElementById("up").innerHTML =

    ` <style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        border: 2px solid white;
        border-radius: 10px;
        max-width: 500px;
        margin: 0 auto;
    }

    .image-preview {
        display: none;
        max-width: 100%;
        margin-bottom: 10px;
    }

    .upload-input {
        display: none;
    }

    .upload-button {
        padding: 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .upload-button:hover {
        background-color: #3e8e41;
    }

    .upload-label {
        display: block;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    @media (max-width: 500px) {
        .container {
            max-width: 100%;
        }
    }
</style>
</head>

<body>
<div class="alert alert-success" role="alert" id="message" style="display:none">
</div>
<div class="container">
    <img class="image-preview" src="#" alt="Image Preview">
    <label class="upload-label" for="upload-input" style="color:white">Select an image to upload:</label>
    <input class="upload-input" type="file" id="upload-input" accept="image/*">
    <button class="upload-button" type="button" id="upload-button">Upload</button>
</div>`


const imagePreview = document.querySelector('.image-preview');
        const uploadInput1 = document.getElementById('upload-input');
        const uploadButton1 = document.getElementById('upload-button');

        uploadInput1.addEventListener('change', () => {
            const file = uploadInput1.files[0];
            if (file) {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    imagePreview.setAttribute('src', reader.result);
                    imagePreview.style.display = 'block';
                });
                reader.readAsDataURL(file);
            } else {
                imagePreview.setAttribute('src', '#');
                imagePreview.style.display = 'none';
            }
        });

        uploadButton1.addEventListener('click', () => {
            if (uploadInput1.files.length > 0) {


                const imageInput = document.getElementById('upload-input');
                // const uploadButton = document.getElementById('upload-button');
                const message = document.getElementById('message');
            
                uploadButton1.addEventListener('click', (event) => {
                    event.preventDefault();
                    const file = imageInput.files[0];
                    if (file) {
            
            
                        
                let imageid =Number(elem.id);
                let galleryId = Number(localStorage.getItem("CurrentAlbumId"));
                const formData = new FormData();
                formData.append("galleryId",galleryId)
                formData.append("galleryImageId",imageid)
                
                formData.append("image",file)
            
                
                    let obj = {
                        method: "PUT",
                        
                        headers: {
                            "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
                        },
                
                    
                        body:formData
                    }
                
                    update_api(obj)




                // Code to upload the file goes here
                // console.log('File uploaded successfully');
            } else {
                console.log('No file selected');
            }
        });
   


   
        
    
            // const formData = new FormData();
            // formData.append('userId', localStorage.getItem("UserId"));
            // formData.append('image', file);
            

            // fetch(`${url}/api/users/profileImage/upload`, {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => {
            //     if (!response.ok) {
            //         throw new Error(`Error: ${response.status} ${response.statusText}`);
            //     }
            //     return response.json();
            // })
            // .then((data )=> {
            //     message.textContent = 'Image uploaded successfully';
            //     message.style.display ="inline"
            //     setTimeout(()=>{
            //         location.reload()
            //     },2000)
            // })
            // .catch(error => {
            //     message.textContent = `Error: ${error.message}`;
            // });
        }
    });



}
    




// Delete Galley Image BY Id

let deleteGallerImageById_api = async (id) => {
    await fetch(`${url}/api/gallery/${localStorage.getItem("CurrentAlbumId")}/galleryImage/${id}`,{method: "DELETE"})
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            alert(data.message)
            location.reload()

        })
        .catch((error) => {
            // return error
            // alert(error);
        });
    }


    let deleteImage =(elem)=>{

        let getId = String(elem.id).replace("*","")
        deleteGallerImageById_api(getId)

    }