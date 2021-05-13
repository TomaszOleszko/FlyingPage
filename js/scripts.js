document.addEventListener("DOMContentLoaded", function() {
        downloadData("b1","home");
        downloadData("b2","map");
        downloadData("b3","about");
        fixButtons();
        $('#b1').click();
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
}
function savePageContent(){
  localStorage.setItem("Cards",getPageContent())
}
function loadPageContent(){
  let cardObj = JSON.parse(localStorage.getItem("Cards"));
  cardObj.cards.forEach(element => {
    insertCard(element);
  });
}
function getPageContent(){
  jsonObj ={
    "cards":[]
  };
  $(".kontent").each(function(){
    jsonObj.cards.push({"title": this.querySelectorAll('.card-title')[0].innerText, 
    "desc": this.querySelectorAll('.card-text')[0].innerText,
    "link": $(this).children('.ref').attr('href')});
  })
  return JSON.stringify(jsonObj);
}

function createCard(){
    var cardContent = {};
    var title = document.getElementById("CreateTitleFormControlInput").value;
    var desc = document.getElementById("CreateDescFormControlTextarea").value;
    var link = document.getElementById("CreateLinkFormControlInput").value;

    //walidacja do dodania!!!

    cardContent.title = title;
    cardContent.desc = desc;
    cardContent.link = link;

    return insertCard(cardContent);
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
                '<a href="'+cardContent.link+'" class="btn btn-primary ref"><i class="fas fa-archive"></i></a>'+
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
    var title = document.getElementById("TitleFormControlInput").value;
    var desc = document.getElementById("DescFormControlTextarea").value;
    var link = document.getElementById("LinkFormControlInput").value;

    //walidacja do dodania!!!

    cardContent.title = title;
    cardContent.desc = desc;
    cardContent.link = link;

    return changeCard(cardContent);
}
function changeCard(cardContent){
    var html =     '<div class="card-body kontent">'+
                      '<h5 class="card-title bg-primary rounded">'+cardContent.title+'</h5>'+
                      '<p class="card-text">'+cardContent.desc+'</p>'+
                      '<a href="'+cardContent.link+'" class="btn btn-primary ref"><i class="fas fa-archive"></i></a>'+
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
