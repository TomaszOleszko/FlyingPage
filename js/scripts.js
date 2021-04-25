document.addEventListener("DOMContentLoaded", function() {
        downloadData("b1","home");
        downloadData("b2","color");
        downloadData("m1","map");
   })
function downloadData(buttonId,dest){
    var button = document.getElementById(buttonId);
    button.addEventListener('click',function(){
        fetch("https://www.w3.org/TR/PNG/iso_8859-1.txt)
        .then(response => {return response.text();})
        .then(data => {document.getElementById("site").innerHTML = data; })
    },false);
}
