var tagInputNamePromo = document.querySelector("#inputNamePromo") ; 
var tagInputStartPromo = document.querySelector("#inputStartPromo") ; 
var tagInputEndPromo = document.querySelector("#inputEndPromo") ; 
var tagButtonAddPromo = document.querySelector("#buttonAddPromo") ; 
var tagButtonDeletePromo = document.querySelector("#buttonDeletePromo") ; 
var tagSelectPromos = document.querySelector("#selectPromo") ; 


// variable global 
var listPromo = [] ; 

const API_POPSCHOOL = "http://api-students.popschool-lens.fr/api/" ; 


function loadPromos()
{
    fetch(API_POPSCHOOL + "promotions")
    .then(function(response){
        return response.json() ; 
    })
    .then(function(data){
        console.log(data['hydra:member']) ; 
         listPromo = data['hydra:member'] ; 
         drawPromos(listPromo) ; 
    });
}

// draw the promo in the DOM 
function drawPromos(listPromo)
{
    // delete all the promos in the DOM 
    tagSelectPromos.innerHTML = "" ; 
    // add all the promos in the Select tag 
    listPromo.forEach(function(promo){
        let tagOption = createTagOptionPromo(promo) ; 
        tagSelectPromos.appendChild(tagOption) ; 
    })
}

function createTagOptionPromo(promo)
{
    var tagPromo = document.createElement("option") ; 
    tagPromo.value = promo.id ; 
    tagPromo.innerHTML = promo.name ; 
    return tagPromo ; 
}

function addPromo(name, startDate, endDate)
{
    let bodyMessage = {
        name: name , 
        startDate: startDate ,
        endDate: endDate
    } ; 

    // send the data
    fetch(API_POPSCHOOL + "promotions" , {
        method : "POST" , 
        headers : {
            'Accept' : 'application/json' , 
            'Content-Type' : 'application/json'
        }, 
        body : JSON.stringify(bodyMessage)
    })
    .then(function(response){
        console.log("envoi ok : " + response.ok) ; 
        loadPromos() ; // déconseillé 
    })
}

function deletePromo(idPromo)
{
    fetch("http://api-students.popschool-lens.fr/api/promotions/" + idPromo, {
        method: "DELETE" 
    })
    .then(function(response){
        loadPromos() ;  // déconseillé 
    });
}

function updatePromo(idPromo, name, startDate, endDate)
{
    let bodyMessage = {
        name: name , 
        startDate: startDate ,
        endDate: endDate
    } ; 

    // send the data
    fetch(API_POPSCHOOL + "promotions/" + idPromo, {
        method : "POST" , 
        headers : {
            'Accept' : 'application/json' , 
            'Content-Type' : 'application/json'
        }, 
        body : JSON.stringify(bodyMessage)
    })
    .then(function(response){
        console.log("envoi ok : " + response.ok) ; 
        loadPromos() ; // déconseillé 
    })
}

// handled event  
tagButtonAddPromo.addEventListener("click", function(){
    addPromo(tagInputNamePromo.value, tagInputStartPromo.value , tagInputEndPromo ) ; 
}); 

tagButtonDeletePromo.addEventListener("click", function(){
    // confirm deleting before to delete 
    if(confirm("Supprimer la promo : " + tagContainerPromos.value + " ?"))
    {
        // user confirm the delete
        deletePromo(tagSelectPromos.value) ; 
        loadPromos() ; 
    }
    });

// start 
loadPromos() ; 