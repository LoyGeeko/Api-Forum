var btUser = document.getElementById('btinscrire');

btUser.addEventListener("click", bticlick, false);

function bticlick() {
    var email = document.getElementById('inputEmail').value;
    var nom = document.getElementById('inputNom').value;
    var prenom = document.getElementById('inputPrenom').value;
    var mdp = document.getElementById('inputPassword').value;
    var mdp2 = document.getElementById('inputPassword2').value;
    var dateInscription = new Date();
    

    if(mdp != mdp2){
        console.log('ils sont differents');
    }else{
        ajoutUser(email,nom,prenom,mdp,dateInscription);
        

    }
    $("#modalInscrire").modal('hide');
}


function ajoutUser(email,nom,prenom,mdp,dateInscription) {
    var request = $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://s3-4396.nuage-peda.fr/forum/api/users",
        method: "POST",
        data: JSON.stringify({
            email: email,
            roles: [
                "ROLE_USER"
            ],
            password: mdp,
            nom: nom,
            prenom: prenom,
            dateInscription: dateInscription,
            messages: []
  
        }),
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.overrideMimeType("application/json; charset=utf-8");
        }
    });

    request.done(function (msg) {
        console.log('Ajouter');
    });

    request.fail(function (jqXHR, textStatus, error) {
        console.log(jqXHR);
    });

}
