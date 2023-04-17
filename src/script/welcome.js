const singup2 = `
<div class="card text-dark bg-light mb-3 card-center" style="max-width: 22rem;">
<div class="card-header text-center">
  <h4>Sing Up</h4>
  <p style="font-size: smaller;"> To continue to <b>Personal Diary</b></p>
</div>
<div class="card-body">
   

  <div class="form-group">
    <label for="exampleInputName">Full Name<span style="color: red;">*</span></label>

    <input type="name" class="form-control" id="exampleInputName2" aria-describedby="emailHelp">
   
  </div>

  <div class="form-group">
    <label for="exampleInputEmail1">Email address<span style="color: red;">*</span></label>
    <input type="email" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text" style="  color: green;">We'll never share your email with anyone else.</small>
  </div>

  <div class="form-group">
    <label for="exampleInputPassword1">Password<span style="color: red;">*</span></label>
    <input type="password" class="form-control" id="exampleInputPassword2">
    <small id="emailHelp" class="form-text" style="  color: red;">Password should me more than 8 charachers.</small>
  </div>

  <div class="form-group">
    <label for="exampleInputPassword2">Confirm Password<span style="color: red;">*</span></label>
    <input type="password" class="form-control" id="exampleInputPassword3">
  </div>

  <button type="submit" class="btn btn-primary" id="confirmRegister">Submit</button>
  <p class="text-sm-right" style="font-size: smaller;color: blue;"><a id="swipeToLogIn">Existing User? Log In</a></p>



  </div>
</div>
`;

const singin2 = `<div class="card text-dark bg-light mb-3 card-center" style="max-width: 22rem;">
<div class="card-header text-center">
  <h4>Sing In</h4>
  <p style="font-size: smaller;"> To continue to <b>Personal Diary</b></p>
</div>
<div class="card-body">
    <!--         This is the Login Form -->

  <div class="form-group">
    <label for="exampleInputEmail1">Email address<span style="color: red;">*</span></label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text" style="  color: green;">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password<span style="color: red;">*</span></label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>

  <button type="submit" class="btn btn-primary" id="confirm">Submit</button>
  <p class="text-sm-right" style="font-size: smaller;color: blue;"><a id="swipeToRegister">New User? Register</a></p>


  </div>
</div>
</div>`;

const singup=`
<div class="box1">
    <span class="borderLine"></span>
      <form>
          <h2>Sing In</h2>
          <div class="inputBox">
            <input type="text" required ="required" id="exampleInputEmail2">
            <span>Email</span>
            <i></i>
          </div>

          <div class="inputBox">
            <input type="text" required ="required" id="exampleInputName2">
            <span>Full Name</span>
            <i></i>
          </div>



          <div class="inputBox">
            <input type="password" required ="required" id="exampleInputPassword2">
            <span>password</span>
            <i></i>
          </div>

          <div class="inputBox">
            <input type="password" required ="required" id="exampleInputPassword3">
            <span>Re-confirm password</span>
            <i></i>
          </div>

          <div class="links">
           
            <a id="swipeToLogIn">Sing In</a>
          </div>
          <input type="submit" value="Register" id="confirmRegister">

      </form>
  </div>

`


const singin=`
<div class="box" >
  <span class="borderLine"></span>
    <form>
        <h2>Sing In</h2>
        <div class="inputBox">
          <input type="text" required ="required" id="exampleInputEmail1">
          <span>Email</span>
          <i></i>
        </div>

        <div class="inputBox">
          <input type="password" required ="required"  id="exampleInputPassword1">
          <span>password</span>
          <i></i>
        </div>

        <div class="links">
          <a href="#">Forgot Password</a>
          <a id="swipeToRegister" href="#">Sing Up</a>
        </div>
        <input type="submit" value="login" id="confirm">

    </form>
</div>
`

let fetchUser = async (obj) => {
  await fetch(
    "http://personaldiary-env.eba-pfsxhh9p.eu-north-1.elasticbeanstalk.com/api/users/login",
    obj
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(() => {
      window.location = "../templates/loading.html";
    })
    .catch((error) => {
      // return error
      alert("User Not Found!")
    });
};

let emailValidation = (email) => {
  let count = 0;
  let arr = Array.from(email);
  for (let i of arr) {
    if (i == "@") {
      count += 1;
    } else if (i == ".") {
      count += 1;
    }
  }

  if (count >= 2) {
    return true;
  }
  return false;
};

let target = document.getElementsByClassName("modal-body")[0];

try {
  target.innerHTML = singin;

  document.getElementById("confirm").addEventListener("click", () => {
    let email = document.getElementById("exampleInputEmail1");
    let password = document.getElementById("exampleInputPassword1");
    if (email.value.length > 0 && password.value.length > 0) {
      // A normal login credential

      const obj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: String(email.value),
          password: String(password.value),
        }),
      };


      fetchUser(obj)


    } else {
      alert("Fill the mandatory credintials");
    }
  });

  document.getElementById("swipeToRegister").addEventListener("click", () => {
    target.innerHTML = singup;
    document.getElementById("confirmRegister").addEventListener("click", () => {
      let getname = document.getElementById("exampleInputName2");
      let getemail = document.getElementById("exampleInputEmail2");
      let getpass1 = document.getElementById("exampleInputPassword2");
      let getpass2 = document.getElementById("exampleInputPassword3");

      if (
        getemail.value.length > 0 &&
        getname.value.length > 0 &&
        getpass1.value.length > 0 &&
        getpass2.value.length > 0
      ) {
        if (getpass1.value != getpass2.value) {
          alert("Passwords are not matched!");
        } else if (getpass1.value == getpass2.value) {
          try {
            if (emailValidation(String(getemail.value)) == true) {
              // Creating the object

              let obj = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  fullName: String(getname.value),
                  email: String(getemail.value),
                  password: String(getpass1.value),
                  role: "normal",
                  active: true,
                  imageURL: "default.png",
                  about: "Hello I'm " + getname.value,
                }),
              };

              let createUser = async (obj) => {
                await fetch(
                  "http://personaldiary-env.eba-pfsxhh9p.eu-north-1.elasticbeanstalk.com/api/users/",
                  obj
                )
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error(
                        `Error: ${response.status} ${response.statusText}`
                      );
                    }
                    return response.json();
                  })
                  .then((data) => {
                    console.log(data);
                    alert(data["message"]);
                    // return data['message'];
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              };

              createUser(obj);
            }
          } catch {
            alert("This is not a valid email");
          }
        }
      } else {
        alert("Please fill the Mandatory Filelds");
      }
    });

    document.getElementById("swipeToLogIn").addEventListener("click", () => {
      location.reload();
    });
  });
} catch (err) {}

// let a_tag =  document.getElementById("pageChanger");

// a_tag.addEventListener('click',()=>
// {

//     target.innerHTML=singup;
// })
