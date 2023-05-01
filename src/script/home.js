// document.getElementById("gallery").addEventListener('click',()=>
// {
//     document.getElementsByClassName("container1")[0].innerHTML= gallery
// })

const url ="http://personaldiary-backernd-env.eba-ngkpwptm.eu-north-1.elasticbeanstalk.com";


const initial = `
<div class="container1"> 
    

      <div class="card1">
         <div class="lines"></div>
         <div class="imgBox">
             <img src="https://www.vhv.rs/dpng/d/421-4210045_thumb-image-staff-icon-png-transparent-png.png" alt="">
         </div>
         <div class="content">
             <div class="details">

                 <h2>About Us</h2>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id architecto sunt similique.
                 </p>
                 <a href="#">Read More</a>

             </div>
         </div>
     </div> 


     <div class="card1">
         <div class="lines"></div>
         <div class="imgBox">
             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9NgkWC5nYfaTLYl1fORIEnyYG9W76NY_9Rhs655Jq7owNxMlnTA2kGXpxRL39idWtcqd9eLF3OtA&usqp=CAU&ec=48665701"
                 alt="">
         </div>
         <div class="content">
             <div class="details">
                 <h2>Feedback</h2>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio delectus et tenetur.
                 </p>
                 <a href="#">Read More</a>
             </div>
         </div>
     </div>

 
     
 
     </div>



`;

document.getElementById("mainUpdate").innerHTML = initial;



// Open the upload image options
// const card = ` <div class="card">
// <img src="..." class="card-img-top" alt="..." id="file-ip-1-preview">
// <div class="card-body">
// </div>
// </div>`;
// function showPreview(event) {
//   if (event.target.files.length > 0) {
//     var src = URL.createObjectURL(event.target.files[0]);
//     document.getElementsByClassName("preview")[0].innerHTML = card;
//     var preview = document.getElementById("file-ip-1-preview");
//     preview.src = src;
//     preview.style.display = "block";
//   }
// }


//  ======================================================================================================================




// ==================================================================================================

// /Working on Todo



document.getElementById("to-do").addEventListener("click", () => {
 
  document.getElementById("to-do").classList.add("active");
  localStorage.setItem("todoPage","0")
  window.location="../templates/todo.html"
});


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
// Updating Profile Section

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

    const profileCard =` <div class="card1">
<div class="lines"></div>
<div class="imgBox ">
    <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
        alt="">
</div>
<div class="content">
    <div class="details">
        <h2>${data.userModel.fullName}</h2>
        <p><Span>Email: ${data.userModel.email}</span></p>
        <p><Span>About: ${data.userModel.about}</span></p>
        <a href="../templates/EditProfile.html">Edit</a>
    </div>
    
</div>
</div>`
    const range = document.createRange();
    const fragment = range.createContextualFragment(profileCard);
    document.getElementById("mainUpdate").append(fragment)
   document.getElementsByClassName("logo")[0].innerHTML = `Welcome ${data.userModel.fullName}!`
})
.catch((error) => {
    console.log(error)
});

    

}

profile()