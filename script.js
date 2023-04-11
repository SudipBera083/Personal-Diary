let email = document.getElementById("exampleInputEmail1");
let pass = document.getElementById("exampleInputPassword1");

let submit = document.getElementById("confirm");



submit.addEventListener('click',()=>
{
    // console.log(email.value);
    // console.log(pass.value)

    if(email.value.length != 0 && pass.value.length != 0)
    {
        alert("You are right")
    }
    else{
        alert("Please fill the details")
    }
})

