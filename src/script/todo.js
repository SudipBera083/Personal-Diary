let createToDo = async (obj)=>{

    await fetch(`http://personaldiary-env.eba-pfsxhh9p.eu-north-1.elasticbeanstalk.com/api/user/${localStorage.getItem("UserId")}/createTodo`, obj)
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
        alert(error);
    });


}

let fetchToDo = async ()=>{

    await fetch(`http://personaldiary-env.eba-pfsxhh9p.eu-north-1.elasticbeanstalk.com/api/user/${localStorage.getItem("UserId")}/todos?pageNumber=${localStorage.getItem("todoPage")}&pageSize=10&sortBy=createdAt&sortMode=1`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then((data) => {
        localStorage.setItem("isLastPageToDo",String(data.isLastPage))
       
        for(let i=0;i<data.toDoModels.length ;i++ )
            {
                if(data.toDoModels[i].isCompleted)
                {
                document.querySelector('#tasks').innerHTML += `
                <div class="task">
                  <strike>  <span id="taskname">
                        ${data.toDoModels[i].text}
                    </span></strike>
                
                    <div style="float:right">
                    <button  id="${data.toDoModels[i].toDoId}*" onclick="checkToDo(this)" >
                    <i class="far fa-check-circle"></i>
                    </button>

 
                    <button class="delete" id="${data.toDoModels[i].toDoId}" onclick="deleteToDo(this)">
                        <i class="far fa-trash-alt"></i>
                    </button>
                    </div>

                   
                </div> 
            `;
                }
                else
                {

                    document.querySelector('#tasks').innerHTML += `
                    <div class="task">
                      <span id="taskname">
                            ${data.toDoModels[i].text}
                        </span>
                    
                        <div style="float:right">
                        <button  id="${data.toDoModels[i].toDoId}*" onclick="checkToDo(this)" >
                        <i class="far fa-check-circle"></i>
                        </button>
    
     
                        <button class="delete" id="${data.toDoModels[i].toDoId}" onclick="deleteToDo(this)">
                            <i class="far fa-trash-alt"></i>
                        </button>
                        </div>
    
                       
                    </div> 
                `;

                }
            }

            

    })
    .catch((error) => {
        // return error
        // alert(error);
    });


}


fetchToDo()


document.querySelector('#push').onclick = function(){
    if(document.querySelector('#newtask input').value.length == 0){
        alert("Please Enter a Task")
    }
    else{

        let create_obj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    text: String(document.querySelector('#newtask input').value)
                })
            };
        createToDo(create_obj)
       


        document.querySelector("#newtask input").value = "";
    }
}

// =============================


let deleteToDo_api = async (todo_id) => {
    await fetch(`http://personaldiary-env.eba-pfsxhh9p.eu-north-1.elasticbeanstalk.com/api/todo/${todo_id}`,{method: "DELETE"})
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
            // return error
            // alert(error);
        });

}

function deleteToDo(elem)
{

    let todo_id = String(elem.id)
    deleteToDo_api(todo_id)
    setTimeout(()=>
    {
        location.reload()

    },1000)
    

}


let prev =()=>
{
    if( Number(localStorage.getItem("todoPage"))>0)
    {
        let num =  Number(localStorage.getItem("todoPage"))-1
        localStorage.setItem("todoPage",String(num))
        
        location.reload()
    }
    
    
}

let next =()=>
{
    if(localStorage.getItem("isLastPageToDo")=="false")
    {
        let num =  Number(localStorage.getItem("todoPage"))+1
        localStorage.setItem("todoPage",String(num))
      
        location.reload()
        
    }
    
}

let checkToDo =async (ele)=>
{
    let id = Number(String(ele.id).replace("*",""))
   await fetch(`http://personaldiary-env.eba-pfsxhh9p.eu-north-1.elasticbeanstalk.com/api/todo/${id}/updateStatus`,{method:"PUT"})
   .then((response) => {
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
})
.then((data) => {
    setTimeout(()=>
    {
        location.reload()
    },500)

})
.catch((error) => {
    console.log(error)
});

    

}