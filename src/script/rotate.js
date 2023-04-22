// let loading = document.getElementById("timeCount")
let count = 1

const myInterval = setInterval(myTimer, 1000);

function myTimer() {
    if(count<=4)
    {
        // loading.innerHTML ="( "+count+"s )"
        count+=1
    }
    else
    {
        clearInterval(myInterval);
        window.location = "../templates/welcome.html"
    }
    
  }

  