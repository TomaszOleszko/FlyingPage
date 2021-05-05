document.addEventListener("DOMContentLoaded", function() {
        downloadData("b1","home");
        downloadData("b2","color");
        downloadData("b3","about");
   })
function downloadData(buttonId,dest){
    var button = document.getElementById(buttonId);
    button.addEventListener('click',function(){
        fetch("https://raw.githubusercontent.com/bestiasia/FlyingPage/main/data/"+dest+".txt")
        .then(response => {return response.text();})
        .then(data => {document.getElementById("site").innerHTML = data; })
    },false);
}

var site
function saveSite() {
    localStorage.setItem('site', JSON.stringify(site));
}
function createCard(){
    var cardContent = {};
    var title = document.getElementById("CARD_title").value;
    var content = document.getElementById("CARD_content").value;
    var button = document.getElementById("CARD_button").value;

    //walidacja do dodania!!!

    cardContent.title = title;
    cardContent.content = content;
    cardContent.button = button;

    return cardContent;
}
function addCard(cardContent){

}
