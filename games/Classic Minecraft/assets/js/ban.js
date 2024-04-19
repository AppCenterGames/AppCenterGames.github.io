/*var vID
getFP()
function getFP(){
    if (vID) {
        return;
    }else{
        setTimeout(getFP, 500);
    }
    
    const fpPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.onload = resolve;
    script.onerror = reject;
    script.async = true;
    //script.src = "fp.min.js"
    script.src = 'https://cdn.jsdelivr.net/npm/'
      + '@fingerprintjs/fingerprintjs-pro@3/dist/fp.min.js';
    document.head.appendChild(script);
  })
    .then(() => FingerprintJS.load({
      token: 'XLURglRdxW1tE1zVm9uD', region: 'eu', endpoint: 'https://fp.saltyspamz.xyz'
    }));

    // Get the visitor identifier when you need it.
    fpPromise
        .then(fp => fp.get())
        .then(result => vID = result.visitorId)//$(".vID").html(result.visitorId));
}*/
//==================================================================

function checkBan(response){
    /*function checkvID() {
       if (typeof vID != "undefined") {
           return;
       }else{
           setTimeout(checkvID, 1);
       }
     }*/
    //checkvID()
    var data = 'ip=' + response.ip;// + '&vID=' + vID;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'assets/js/checkban.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.send(data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var res = JSON.stringify(xhr.responseText);
             console.log(res)
            if (res.includes("1")){
                //localStorage["vID"] = vID;
                localStorage["ip"] = response.ip;
                console.log("ip banned")
            }

        }
    }
}

function CheckBanLoop(response){
    checkBan(response)
    setInterval(function() {checkBan(response)}, 60000); // 120000
}

var ip = ""

function getIP(){
    if (ip != "") {
        return;
    }else{
        setTimeout(getIP, 10);
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'assets/js/getinfo.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.send();
    var success = false
    xhr.onreadystatechange = function () {
        
        if(xhr.readyState === XMLHttpRequest.DONE) {
                var status = xhr.status;
                if (status === 0 || (status >= 200 && status < 400)) {
                      // The request has been completed successfully
                    success = true
                    var response = JSON.parse(xhr.responseText)
                    
                    // Set hidden elements to correct values
                    ip = response.ip
                    /*$(".city").html(response.city)
                    $(".country").html(response.country)
                    $(".region").html(response.region)*/
                    
                    //checkBanLoop(response)
                    checkBan(response)
                    setInterval(function() {checkBan(response)}, 60000); // 120000
                    
                } else {
                      // Oh no! There has been an error with the request!
                    
                    if(status == 500){response = "The server could not handle your request"}
                    console.warn("Error")
                }	
        }
    }
    setTimeout(function(){ if(success != true){iperror("Internal PHP blocked by client or request timed out")} }, 10000);
}

function check(){
getIP()
}
