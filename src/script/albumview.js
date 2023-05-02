const url ="http://personaldiary-backernd-env.eba-ngkpwptm.eu-north-1.elasticbeanstalk.com";


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
            <p class="text-center"><b>Created: </b>${data.galleryModel.createdAt} </p>
            <p class="text-center"><b>Updated: </b>${data.galleryModel.updatedAt} </p>
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
                <button type="button" class="btn btn-outline-danger">Delete</button>
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


let update=  async(elem)=>
{
    let fileInput = document.getElementById("files");
    fileInput.click();

    setTimeout(()=>
    {
    let imageid =Number(elem.id);
    let galleryId = Number(localStorage.getItem("CurrentAlbumId"));
    let files = document.getElementById("files").files

    const formData = new FormData();
    formData.append("galleryId",galleryId)
    formData.append("galleryImageId",imageid)
    formData.append("image",files[0])

    console.log(files[0])
    console.log(imageid)
    console.log(galleryId)
    console.log(formData)


    
        let obj = {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
            },
    
            // body: JSON.stringify({
            //     "galleryId":galleryId,
            //     "galleryImageId":imageid,
            //     "image":files[0]
    
    
            // })
            body:formData
        }
    
        update_api(obj)

    },3000)
    
    

}