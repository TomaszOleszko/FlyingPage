document.addEventListener("DOMContentLoaded", function() {
        downloadData("b1","home");
        downloadData("b2","map");
        downloadData("b3","about");
        fixButtons();
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
        $(this).parents(".col-md-6.col-lg-4.col-sm-12").hide();
    });
    $('#submitEdit').click(function(){
        $('#formEdit').submit();
    })
    $('#submitCreate').click(function(){
        $('#formCreate').submit();
    })
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

function insertCard(cardContent){
    var html =  '<div class="col-md-6 col-lg-4 col-sm-12">'+
                  '<div class="card bg-transparent border-secondary rounded">'+
                    '<div class="card-body">'+
                      '<h5 class="card-title bg-primary rounded">'+cardContent.title+'</h5>'+
                      '<p class="card-text">'+cardContent.desc+'</p>'+
                      '<a href="'+cardContent.link+'" class="btn btn-primary">Source</a>'+
                    '</div>'+
                    '<div class="container-fluid">'+
                      '<div class="row text-center">'+
                        '<button type="button" class="col-6 text-dark bg-success lewy-rog" data-toggle="modal" data-target="#EditModal">Edit</button>'+
                        '<button class="col-6 text-dark bg-danger prawy-rog">Delete</button>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>';
    document.getElementById("cardsSite").innerHTML += html;
    $(".prawy-rog").click(function(){
        $(this).parents(".col-md-6.col-lg-4.col-sm-12").hide();
    });
    return false;
}
var id=0;
function insertCard(cardContent){
    id++;
    var html =  '<div class="col-md-6 col-lg-4 col-sm-12">'+
                  '<div class="card bg-transparent border-secondary rounded">'+
                    '<div class="card-body">'+
                      '<h5 class="card-title bg-primary rounded">'+cardContent.title+'</h5>'+
                      '<p class="card-text">'+cardContent.desc+'</p>'+
                      '<a href="'+cardContent.link+'" class="btn btn-primary">Source</a>'+
                    '</div>'+
                    '<div class="container-fluid">'+
                      '<div class="row text-center">'+
                        '<button type="button" class="col-6 text-dark bg-success lewy-rog"id="'+id+'" onclick="ButtonClicked(this.id);" data-toggle="modal" data-target="#EditModal">Edit</button>'+
                        '<button class="col-6 text-dark bg-danger prawy-rog">Delete</button>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>';
    document.getElementById("cardsSite").innerHTML += html;
    $(".prawy-rog").click(function(){
        $(this).parents(".col-md-6.col-lg-4.col-sm-12").hide();
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
    var html =     '<div class="card-body">'+
                      '<h5 class="card-title bg-primary rounded">'+cardContent.title+'</h5>'+
                      '<p class="card-text">'+cardContent.desc+'</p>'+
                      '<a href="'+cardContent.link+'" class="btn btn-primary">Source</a>'+
                    '</div>'+
                    '<div class="container-fluid">'+
                      '<div class="row text-center">'+
                        '<button type="button" class="col-6 text-dark bg-success lewy-rog"id="'+button+'" onclick="ButtonClicked(this.id);" data-toggle="modal" data-target="#EditModal">Edit</button>'+
                        '<button class="col-6 text-dark bg-danger prawy-rog">Delete</button>'+
                      '</div>'+
                    '</div>';
    $('#'+button).parents(".card.bg-transparent.border-secondary.rounded").html(html);
    return false;
}
function ButtonClicked(button_id){
    button = button_id;
    return button_id;
}
