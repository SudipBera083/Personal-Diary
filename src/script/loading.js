let loading = document.getElementById("loading")
let count = 1

const myInterval = setInterval(myTimer, 1000);

function myTimer() {
    if(count<=10)
    {
        loading.innerHTML ="Loading...   "+count+" /10"
        count+=1
    }
    else
    {
        clearInterval(myInterval);
        window.location ="../templates/home.html"
    }
    
  }

  

