const url =
  "http://personaldiary-backernd-env.eba-ngkpwptm.eu-north-1.elasticbeanstalk.com";

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

const singup = `
<div class="box1">
    <span class="borderLine"></span>
      <form>
          <h2>Sign Up</h2>
          <div class="inputBox">
            <input type="text" required ="required" id="exampleInputEmail2">
            <span>Email</span>
            <i></i>
          </div>

          <div class="inputBox">
            <input type="text" required ="required" id="otp2">
            <span> OTP</span>
            <i></i>
          </div>
          <div class="links">
          <a id="otpget">Get OTP</a>
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

`;

const singin = `
<div class="box" >
  <span class="borderLine"></span>
    <form>
        <h2>Sign In</h2>
        <div class="inputBox">
          <input type="text" required ="required" id="singin-email">
          <span>Email</span>
          <i></i>
        </div>

        <div class="inputBox">
          <input type="password" required ="required"  id="singin-pass">
          <span>password</span>
          <i></i>
        </div>

        <div class="links">
          <a id="forgetpassword">Forgot Password</a>
          <a id="swipeToRegister" href="#">Sing Up</a>
        </div>
        <input type="submit" value="login" id="confirm">

    </form>
</div>
`;

const forgot_pass = `<div class="box2" >
<span class="borderLine"></span>
  <form>
      <h2>Reset Password</h2>
      <div class="inputBox">
        <input type="text" required ="required" id="exampleInputEmail12">
        <span>Email</span>
        <i></i>
      </div>

      <div class="inputBox">
            <input type="text" required ="required" id="otp12">
            <span> OTP</span>
            <i></i>
          </div>
          <div class="links">
          <a id="fgotpget">Get OTP</a>
          </div>



      <div class="inputBox">
        <input type="password" required ="required"  id="exampleInputPassword12">
        <span>New password</span>
        <i></i>
      </div>

     
      <input type="submit" value="login" id="resetConfirm">

  </form>
</div>`;

let GettingOtp = async (obj) => {
  await fetch(`${url}/api/users/sendOtp`, obj)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      try {
        localStorage.setItem(
          "otp",
          data.emailVerificationResponse["verificationCode"]
        );
      } catch (err) {
        alert("Please Try Letter!");
      }
    })

    .catch((error) => {
      console.error(error);
    });
};

let fetchUser = async (obj) => {
  await fetch(`${url}/api/users/login`, obj)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("UserId", data.userModel["id"]);

      window.location = "../templates/loading.html";
    })
    .catch((error) => {
      // return error
      alert("User Not Found!" + error);
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

  document.getElementById("forgetpassword").addEventListener("click", () => {
    target.innerHTML = forgot_pass;

    // GettingOtp(reset_otp)

    document.getElementById("fgotpget").addEventListener("click", () => {
      let getemail12 = document.getElementById("exampleInputEmail12");
      console.log(getemail12);
      if (getemail12.value.length > 0) {
        // Creating the counting
        let count = 1;

        const myInterval = setInterval(myTimer, 1000);

        function myTimer() {
          if (count <= 30) {
            document.getElementById("fgotpget").innerHTML =
              "Time Remains: ( " + count + " )";
            count += 1;
          } else {
            clearInterval(myInterval);
            document.getElementById("fgotpget").innerHTML = "Resend OTP";
            localStorage.removeItem("otp");
          }
        }

        //  Sending the otp

        let reset_otp = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            recipientEmail: String(getemail12.value),
            emailType: 1,
          }),
        };
        try
        {
          GettingOtp(reset_otp);
        }
        catch(err)
        {
          
        }
        
      } else {
        alert("Please Enter the User Email");
      }

      document.getElementById("resetConfirm").addEventListener("click", () => {
        let getemail12 = document.getElementById("exampleInputEmail12");
        let getpass12 = document.getElementById("exampleInputPassword12");

        let getfgotp = document.getElementById("otp12");

        if (
          getemail12.value.length > 0 &&
          getpass12.value.length > 0 &&
          getfgotp.value.length > 0
        ) {
          let reset_obj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              email: String(getemail12.value),
              password: String(getpass12.value),
            }),
          };

          let resetPassword = async (obj) => {
            await fetch(
              `${url}/api/users/resetPassword?originalCode=${localStorage.getItem(
                "otp"
              )}&userCode=${getfgotp.value}`,
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
                alert("Password reset Successfully!");
                // return data['message'];
              })
              .catch((error) => {
                console.error(error);
              });
          };

          resetPassword(reset_obj);
        } else {
          alert("Please fill the mandatory fields!");
        }
      });
    });

    // working here
  });

  document.getElementById("confirm").addEventListener("click", () => {
    let email = document.getElementById("singin-email");
    let password = document.getElementById("singin-pass");

    console.log(email);
    console.log(password);
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

      fetchUser(obj);
      setTimeout(() => {}, 1000);
    } else {
      alert("Fill the mandatory credintials");
    }
  });

  document.getElementById("swipeToRegister").addEventListener("click", () => {
    target.innerHTML = singup;

    document.getElementById("otpget").addEventListener("click", () => {
      let getemail = document.getElementById("exampleInputEmail2");
      if (getemail.value.length > 0) {
        // Creating the counting
        let count = 1;

        const myInterval = setInterval(myTimer, 1000);

        function myTimer() {
          if (count <= 30) {
            document.getElementById("otpget").innerHTML =
              "Time Remains: ( " + count + " )";
            count += 1;
          } else {
            clearInterval(myInterval);
            document.getElementById("otpget").innerHTML = "Resend OTP";
            localStorage.removeItem("otp");
          }
        }

        // Providing the details and geting the otp
        const obj1 = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            recipientEmail: String(getemail.value),
            emailType: 0,
          }),
        };

        GettingOtp(obj1);
      } else {
        alert("Please enter the email");
      }
    });

    document.getElementById("confirmRegister").addEventListener("click", () => {
      let getname = document.getElementById("exampleInputName2");
      let getemail = document.getElementById("exampleInputEmail2");
      let getpass1 = document.getElementById("exampleInputPassword2");
      let getpass2 = document.getElementById("exampleInputPassword3");
      let getotp = document.getElementById("otp2");

      if (
        getemail.value.length > 0 &&
        getname.value.length > 0 &&
        getpass1.value.length > 0 &&
        getpass2.value.length > 0 &&
        getotp.value.length > 0
      ) {
        if (getpass1.value != getpass2.value) {
          alert("Passwords are not matched!");
        } else if (getpass1.value == getpass2.value) {
          try {
            if (emailValidation(String(getemail.value)) == true) {
              // Creating the object
              // ---------------------------------------------------------------------------------------------------
              let obj = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },

                // params: JSON.stringify({
                //   originalCode:String(localStorage.getItem("otp")),
                //   userCode: String(getotp.value)

                // }),

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
                  `${url}/api/users/?originalCode=${String(
                    localStorage.getItem("otp")
                  )}&userCode=${String(getotp.value)}`,
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
                    alert("User Created Successfully!");
                    console.log(data);
                    // return data['message'];
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              };

              // -----------------------------------------------------------------------------------------------
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
