document.addEventListener("DOMContentLoaded", function() {
        downloadData("b1","home");
        downloadData("b4","about");
        downloadDataJson("b3","softwares")
        fixButtons();
        $('#b1').click();
   })
var start = '<div class="container-fluid">'+
   '<div class="row text-center row-flex" id="cardsSite">'+
  '</div>'+
 '</div>';
function downloadData(buttonId,dest){
    let button = document.getElementById(buttonId);
    button.addEventListener('click',function(){
  document.getElementById("site").innerHTML = start;
        fetch("https://raw.githubusercontent.com/bestiasia/FlyingPage/main/data/"+dest+".txt")
        .then(response => {return response.text();})
        .then(data => {document.getElementById("site").innerHTML = data;
        $(".prawy-rog").click(function(){
            $(this).parents(".col-md-6.col-lg-4.col-sm-12").remove();
        });
     })
    },false);
}
function downloadDataJson(buttonId,dest){
  let button = document.getElementById(buttonId);
  button.addEventListener('click', function(){
     document.getElementById("site").innerHTML = start;
     fetch("https://raw.githubusercontent.com/bestiasia/FlyingPage/main/data/"+dest+".json")
    .then(response => {return response.json();})
    .then(data => {data.cards.forEach(element => {
        insertCard(element);
      }
      );
    })
  },false);
}
function fixButtons(){
    $(".prawy-rog").click(function(){
        $(this).parents(".col-md-6.col-lg-4.col-sm-12").remove();
    });
    $('#submitEdit').click(function(){
        $('#formEdit').submit();
    })
    $('#submitCreate').click(function(){
        $('#formCreate').submit();
    })
    $('.nav-link').click(function(){
      $('.nav-link.active i').removeClass('fa-folder-open');
      $('.nav-link.active').removeClass('active');
      $(this).children('.far').addClass('fa-folder-open');
      $(this).addClass("active");
    })
    document.getElementById('file-selector').addEventListener(
      'change',
      function () {
          var fr = new FileReader();
          fr.onload = function () {
              let cardObj = JSON.parse(this.result);
              document.getElementById("cardsSite").innerHTML = "";
              cardObj.cards.forEach(element => {
                insertCard(element);
              });
          };
          fr.readAsText(this.files[0]);
      }
  );
}
function savePageContent(){
  localStorage.setItem("Cards",getPageContent())
}
function loadPageContent(){
  if(localStorage.length == 0 || JSON.parse(localStorage.getItem('Cards')) == null){
      alert("LocalStorageEmpty");
  }else{
    $('#b3').click();
    let cardObj = JSON.parse(localStorage.getItem("Cards"));
    document.getElementById("site").innerHTML = start;
    cardObj.cards.forEach(element => {
      insertCard(element);
    });
  }
}
function getPageContent(){
  jsonObj ={
    "cards":[]
  };
    $(".kontent").each(function(){
      jsonObj.cards.push({"title": this.querySelectorAll('.card-title')[0].innerText, 
      "desc": this.querySelectorAll('.card-text')[0].innerText,
      "link": $(this).children('.ref').attr('href'),
      "ico":  $(this).children().eq(2).children(':first').attr("class")
      });
    })
    return JSON.stringify(jsonObj);

  
}

function createCard(type){
    var cardContent = {};
    var title = document.getElementById(type+"TitleFormControlInput").value;
    var desc = document.getElementById(type+"DescFormControlTextarea").value;
    var link = document.getElementById(type+"LinkFormControlInput").value;
    var ico = $('input[name="'+type+'Icon"]:checked');
    

    var isok = true;
    var alert_message = "";

    if(title == ""){ isok = false; alert_message += '<p>Title field cannot be empty!</p>';}
    else {cardContent.title = title;}
    if(desc == ""){ isok = false; alert_message += '<p>Description field cannot be empty!</p>';}
    else {cardContent.desc = desc;}
    if(link == ""){isok = false; alert_message += '<p>Link field cannot be empty!</p>';}
    else{
      if(!(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(link))){
        isok = false;
        alert_message += '<p>Link must be valid URL!</p>';
      }else{cardContent.link = link; }
    }
    if(ico != null) {  
         cardContent.ico =  $('input[name="'+type+'Icon"]:checked').next().children(':first').attr("class"); 
    }
     else {  
         isok = false;
         alert_message += '<p>Select one of icons!</p>';
    }
    if(isok){
      return cardContent;
    }else{
      $('#errorModal').modal('show');
      document.getElementById('errorBody').innerHTML = alert_message;
      return false;
    }
}

var id=0;
function insertCard(cardContent){
    id++;
    let html = 
          '<div class="col-md-6 col-lg-4 col-sm-12">'+
            '<div class="card bg-transparent border-secondary rounded">'+
              '<div class="card-body kontent">'+
                '<h5 class="card-title bg-primary rounded">'+cardContent.title+'</h5>'+
                '<p class="card-text">'+cardContent.desc+'</p>'+
                '<a href="'+cardContent.link+'" class="btn btn-primary ref"><i class="'+cardContent.ico+'"></i></a>'+
            '</div>'+
              '<div class="container-fluid">'+
                '<div class="row text-center">'+
                  '<button type="button" class="col-6 text-dark bg-success lewy-rog" id="'+id+'" onclick="ButtonClicked(this.id);" data-toggle="modal" data-target="#EditModal">Edit</button>'+
                  '<button class="col-6 text-dark bg-danger prawy-rog">Delete</button>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>';
    document.getElementById("cardsSite").innerHTML += html;
    $(".prawy-rog").click(function(){
        $(this).parents(".col-md-6.col-lg-4.col-sm-12").remove();
    });
    return false;
}
var button;
function editCard(){
    var cardContent = {};
    if(!createCard("")){
      return false;
    }else{
    cardContent = createCard("");
    }
    return changeCard(cardContent);
  }
function newCard(){
  var cardContent = {};
  if(!createCard("Create")){
      return false;
  }else{
    cardContent = createCard("Create");
  }
  return insertCard(cardContent);
  }
function changeCard(cardContent){
    var html =     '<div class="card-body kontent">'+
                      '<h5 class="card-title bg-primary rounded">'+cardContent.title+'</h5>'+
                      '<p class="card-text">'+cardContent.desc+'</p>'+
                      '<a href="'+cardContent.link+'" class="btn btn-primary ref"><i class="'+cardContent.ico+'"></i></a>'+
                    '</div>'+
                    '<div class="container-fluid">'+
                      '<div class="row text-center">'+
                        '<button type="button" class="col-6 text-dark bg-success lewy-rog"id="'+button+'" onclick="ButtonClicked(this.id);" data-toggle="modal" data-target="#EditModal">Edit</button>'+
                        '<button class="col-6 text-dark bg-danger prawy-rog">Delete</button>'+
                      '</div>'+
                    '</div>';
    $('#'+button).parents(".card.bg-transparent.border-secondary.rounded").html(html);
    $(".prawy-rog").click(function(){
      $(this).parents(".col-md-6.col-lg-4.col-sm-12").remove();
  });
    return false;
}
function ButtonClicked(button_id){
    button = button_id;
    return button_id;
}
function downloadJson(){
  data = getPageContent();
     if(data.cards.length != 0){
    filename = Date.now() + "cards.json";
    var file = new Blob([data],{
      type: 'application/json',
      name: filename
    });
    //zapisywanie
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
  }else{
    return false;
  }
  
}
