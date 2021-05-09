document.addEventListener("DOMContentLoaded", function() {
        downloadData("b1","home");
        downloadData("b2","map");
        downloadData("b3","about");
   })
function downloadData(buttonId,dest){
    var button = document.getElementById(buttonId);
    button.addEventListener('click',function(){
        fetch("https://raw.githubusercontent.com/bestiasia/FlyingPage/main/data/"+dest+".txt")
        .then(response => {return response.text();})
        .then(data => {document.getElementById("site").innerHTML = data;
        $(".prawy-rog").click(function(){
            $(this).parents(".col-md-6.col-lg-4.col-sm-12").hide();
        });
                      })
    },false);
}
$(document).ready(function(){
    $(".prawy-rog").click(function(){
        $(this).parents(".col-md-6.col-lg-4.col-sm-12").hide();
    });
  });
