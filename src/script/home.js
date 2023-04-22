// document.getElementById("gallery").addEventListener('click',()=>
// {
//     document.getElementsByClassName("container1")[0].innerHTML= gallery
// })

const initial = `
<div class="container1"> 
     <div class="card1">
         <div class="lines"></div>
         <div class="imgBox">
             <img src="https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png"
                 alt="">
         </div>
         <div class="content">
             <div class="details">
                 <h2>Profile</h2>
                 <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem laudantium nemo culpa!\
                 </p>
                 <a href="#">Read More</a>
             </div>
         </div>
     </div>

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

// Working for gallery

const gallery = `<div class="container">
<div class="card-deck">
    <div class="card">
        <img src="../src/images/gallery.png" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>

        </div>
    </div>
    <div class="card">
        <img src="../src/images/book.png" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This card has supporting text below as a natural lead-in to additional
                content.</p>

        </div>
    </div>
    <div class="card">
        <img src="../src/images/bg.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                additional content. This card has even longer content than the first to show that equal
                height action.</p>

                <button type="button" class="btn btn-outline-secondary" onclick="gallery_3d()">All Images <i class="arrow right"></i></button>

        </div>
    </div>


</div>





</div>


<!-- Button trigger modal -->
<abbr title="Add Images">
<button type="button" class="btn float" data-toggle="modal" data-target="#exampleModal">
    <a class="float">
        <i class="fa fa-plus my-float"></i>
    </a>
</button></abbr>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
aria-hidden="true">
<div class="modal-dialog" style="border: 2px solid white;">
    <div class="modal-content" style="background-color: #23242a;;">
        <!-- <div class="modal-header">

    <h5 class="modal-title text-light" id="exampleModalLabel">Personal Diary:: Events</h5>
    <button type="button" class="close text-light" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div> -->
        <div class="modal-body">

            <div class="center">
                <div class="form-input">
                    <label for="file-ip-1">Upload Image</label>
                    <input type="file" id="file-ip-1" accept="image/*" onchange= "showPreview(event);">
                </div>
            </div>
        
            <div class="preview container">
                <!-- <div class="card">
                    <img src="..." class="card-img-top" alt="..." id="file-ip-1-preview">
                    <div class="card-body">
                    
                    </div>
                </div> -->
               
            </div>
            

            
        </div>

    </div>


</div>
</div>
</div>`;

document.getElementById("gallery").addEventListener("click", () => {
  document.getElementById("mainUpdate").innerHTML = gallery;
  document.getElementById("gallery").classList.add("active");
});

const card = ` <div class="card">
<img src="..." class="card-img-top" alt="..." id="file-ip-1-preview">
<div class="card-body">
</div>
</div>`;
function showPreview(event) {
  if (event.target.files.length > 0) {
    var src = URL.createObjectURL(event.target.files[0]);
    document.getElementsByClassName("preview")[0].innerHTML = card;
    var preview = document.getElementById("file-ip-1-preview");
    preview.src = src;
    preview.style.display = "block";
  }
}

let gallery_3d = () => {
  window.location = "../templates/gallery.html";
};

//  ======================================================================================================================




// ==================================================================================================

// /Working on Todo



document.getElementById("to-do").addEventListener("click", () => {
 
  document.getElementById("to-do").classList.add("active");
  localStorage.setItem("todoPage","0")
  window.location="../templates/todo.html"
});
