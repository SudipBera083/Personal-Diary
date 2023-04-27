

const url = "http://personaldiary-env.eba-pfsxhh9p.eu-north-1.elasticbeanstalk.com"

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

    const leftSize =
    `
    <div class="container">
    <div class="list-group " id="list-tab" role="tablist">
    <a class="list-group-item list-group-item-action" id="list-home-list" data-toggle="list"
        href="#list-home" role="tab" aria-controls="home">
    
        <div class="card"">
            <img src="https://scontent.fccu16-1.fna.fbcdn.net/v/t39.30808-6/343122632_1482574252549813_7686241642331408312_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=730e14&_nc_ohc=lkaEnFt-PxQAX9PR1Sz&_nc_ht=scontent.fccu16-1.fna&oh=00_AfAwl1FEvkXKoir1U5mzMxF1G92nDWqUMN-L3ah715rSjw&oe=644E892C" class="card-img-top"
                alt="...">
            <div class="card-body">
                <p class="card-text text-center">
                    Name : ${data.userModel.fullName}
                    <br>
                    Bio: ${data.userModel.about}
            
    
                </p>
            </div>
    
        </div>
    </a>
    
    </div>
    </div>`




    const rightProf = `
    <!-- /Addimg Form -->
    <div class="container" style="margin-top: 5%">
        <form>
            

            <div class="form-group">
                <label for="exampleFormControlInput1">Name</label>
                <input type="text" class="form-control" id="Name" value ="${data.userModel.fullName}"></input>
            </div>




            <div class="form-group">
                <label for="exampleFormControlTextarea1">Bio</label>
                <textarea class="form-control" id="Bio" rows="3" > ${data.userModel.about}</textarea>
            </div>

            <div class="form-group">
                <label for="exampleFormControlFile1">Upload Image</label>
                <input type="file" class="form-control-file" id="imageUp">
            </div>
        
            <button type="submit" class="btn btn-outline-primary" style="float: right;" onclick="submit()">Save</button>


        </form>
    </div>
    <!-- ----------------------- -->`
    
    const range = document.createRange();
    const fragment = range.createContextualFragment(leftSize);
   document.getElementsByClassName("col-4")[0].append(fragment)


   const range1 = document.createRange();
    const fragment1 = range1.createContextualFragment(rightProf);
   document.getElementsByClassName("tab-pane")[0].append(fragment1)
})
.catch((error) => {
    console.log(error)
});

    

}

profile()


let update =async (obj)=>
{
   await fetch(`${url}/api/users/`,obj)
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
    console.log(error)
});

    

}


let submit = ()=>{


    let name = document.getElementById("Name").value
    let bio = document.getElementById("Bio").value
    let image = document.getElementById("imageUp")
    console.log(image.value)
    console.log(name.value)
    console.log(bio.value)

  
        let obj = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                id : Number(localStorage.getItem("UserId")),
                fullName  :String(name),
                about : String(bio)
            })
        };

    update(obj)
   

}

