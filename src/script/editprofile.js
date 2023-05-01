const url ="http://personaldiary-backernd-env.eba-ngkpwptm.eu-north-1.elasticbeanstalk.com";



let profile =async ()=>
{
    
   await fetch(`${url}/api/users/${localStorage.getItem("UserId")}`)
   .then((response) => {
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
})
.then((data) => {


let checkNullImage =(image)=>
    {
        if(String(image)=="null")
        {
            return "https://bootdey.com/img/Content/avatar/avatar7.png"
        }
        else
        {
            return String(image)
        }
    
    }


const profileCard =`<div class="card-body">
<div class="account-settings">
    <div class="user-profile">
        <div class="user-avatar">
            <img src="${checkNullImage(data.userModel.imageURL)}" >
        </div>
        <h5 class="user-name">${data.userModel.fullName}





        <!-- Example single danger button -->
<div class="btn-group" >
  <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-expanded="false" id="pen">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
  fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
  <path
      d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
</svg>
  </button>
  <div class="dropdown-menu" id="change">
    <a class="dropdown-item" id="removeImage" onclick="removeImage()">Remove Image</a>
    <a class="dropdown-item" onclick="uploadImage()">Upload Image</a>
    
  </div>
</div>
<div id ="hid" ></div>

        </h5>
        <h6 class="user-email">${data.userModel.email}</h6>
    </div>
    <div class="about">
        <h5>About</h5>
        <p>${data.userModel.about}</p>
    </div>
</div>
</div>`







    const range = document.createRange();
    const fragment = range.createContextualFragment(profileCard);
    document.getElementById("mainUpdate").append(fragment)






    const updateCard =` <div class="card-body">
    <div class="row gutters">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h6 class="mb-2 text-primary">Personal Details</h6>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div class="form-group">
                <label for="fullName">Full Name</label>
                <input type="text" class="form-control" id="fullName" value="${data.userModel.fullName}">
            </div>
        </div>

        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">

        </div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div class="form-group">
                <label for="website">Bio</label>
                <textarea type="text" class="form-control" id="website"
                    placeholder="Write about Yourself">${data.userModel.about}</textarea>
            </div>
        </div>
    </div>
    <div class="row gutters">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="text-right">
                <button type="button" id="submit" name="submit"
                    class="btn btn-secondary" onclick="location.reload();">Reset</button>
                <button type="button" id="submit" name="submit"
                    class="btn btn-primary" onclick="updateProfile()">Update</button>
            </div>
        </div>
    </div>
</div>`



const range1 = document.createRange();
const fragment1 = range1.createContextualFragment(updateCard);
document.getElementById("updateBody").append(fragment1)
})
.catch((error) => {
    console.log(error)
});

    

}




let updateProfileAPI = async (obj) => {
    await fetch(`${url}/api/users/`, obj)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(() => {
            alert("Updated User Successfully!")
        })
        .catch((error) => {
            // return error
            alert(error);
        });

}


let updateProfile=()=>{

    let name = document.getElementById("fullName").value
    let bio =  document.getElementById("website").value
    if(name.length >0 && bio.length>0)
    {
        let update_obj = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        
            body: JSON.stringify({
                id : Number(localStorage.getItem("UserId")),
                fullName : String(name),
                about : String(bio)
            })
        };
        
        updateProfileAPI(update_obj)

    }
    else{
        alert("Don't make the fields empty!")
    }

   

}





profile()





let uploadImage =()=>
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
                // Code to upload the file goes here
                console.log('File uploaded successfully');
            } else {
                console.log('No file selected');
            }
        });
    // `<div id ="data" class="text-center">
    // <form>
    // <button type="submit" id="upload-button" class ="btn btn-success" style="float:left; margin-top:1rem;margin-left:10%">Upload</button>
   
    // <input type="file" id="upload" accept="image/*" hidden style="float:left"/>
    //  </form>
    // <label for="upload" class ="label1">Choose file</label>
    // <div id="message"></div>
    

    // </div> `
    


    const imageInput = document.getElementById('upload-input');
    const uploadButton = document.getElementById('upload-button');
    const message = document.getElementById('message');

    uploadButton.addEventListener('click', (event) => {
        event.preventDefault();
        const file = imageInput.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('userId', localStorage.getItem("UserId"));
            formData.append('image', file);
            

            fetch(`${url}/api/users/profileImage/upload`, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then((data )=> {
                message.textContent = 'Image uploaded successfully';
                message.style.display ="inline"
                setTimeout(()=>{
                    location.reload()
                },2000)
            })
            .catch(error => {
                message.textContent = `Error: ${error.message}`;
            });
        }
    });



}

let removeImageAPI = async () => {
    await fetch(`${url}/api/users/${localStorage.getItem("UserId")}/profileImage`,{method : "DELETE"})
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(() => {
            alert("Image is removed!")
        })
        .catch((error) => {
            // return error
            alert(error);
        });

}


let removeImage =()=>{
    removeImageAPI()
   
}

