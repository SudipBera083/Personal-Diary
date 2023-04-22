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
        console.log(data.toDoModels)
        for(let i=0;i<data.toDoModels.length ;i++ )
            {
                document.querySelector('#tasks').innerHTML += `
                <div class="task">
                    <span id="taskname">
                        ${data.toDoModels[i].text}
                    </span>
                    <button class="delete" id="${data.toDoModels[i].toDoId}" onclick="deleteToDo(this)">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div> 
            `;
            }

            

    })
    .catch((error) => {
        // return error
        alert(error);
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
    await fetch(`http://personaldiary-env.eba-pfsxhh9p.eu-north-1.elasticbeanstalk.com/api/todo/${todo_id}`)
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
            // alert(error);
        });

}

function deleteToDo(elem)
{

    let todo_id = String(elem.id)
    deleteToDo_api(todo_id)
    location.reload()

}


let prev =()=>
{
    let num =  Number(localStorage.getItem("todoPage"))-1
    localStorage.setItem("todoPage",String(num))
    
    location.reload()
    
}

let next =()=>
{
    let num =  Number(localStorage.getItem("todoPage"))+1
    localStorage.setItem("todoPage",String(num))
  
    location.reload()
    
}