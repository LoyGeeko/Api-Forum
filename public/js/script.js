var madiv = document.getElementById('madiv');
var ok = document.getElementById('ok');
var btco = document.getElementById('btconnect');
var co = document.getElementById('btco');
var btdeco = document.getElementById('boutton');

btco.addEventListener("click", btclick, false);
btdeco.addEventListener("click", btdclick, false);


btdeco.style.display = "none";
co.style.display = "block";


function btclick() {
    var email = document.getElementById('email').value;
    var mdp = document.getElementById('mdp').value;
    
    auth(email, mdp);

    btdeco.style.display = "block";
    co.style.display = "none";

    $("#exampleModal").modal('hide');
}

function btdclick() {
    localStorage.setItem('token', '');
    console.log('token'+localStorage.getItem('token'));
    btdeco.style.display = "none";
    co.style.display = "block";
}



function auth(email123, mdp123) {
    var request = $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://s3-4396.nuage-peda.fr/forum/api/authentication_token",
        method: "POST",
        data: JSON.stringify({
            email: email123,
            password: mdp123
        }),
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.overrideMimeType("application/json; charset=utf-8");
        }
    });

    request.done(function (msg) {
        localStorage.setItem('token', msg.token);
        console.log(msg.token);
        console.log('connecter');
    });

    request.fail(function (jqXHR, textStatus, error) {
        console.log(jqXHR);
    });

}


function ajax() {

    var request = $.ajax({
        url: "http://s3-4396.nuage-peda.fr/forum/api/users",
        method: "GET",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.overrideMimeType("application/json; charset=utf-8");
        }
    });
    request.done(function (msg) {

        msg.sort(function (a, b) {

            if (a.email < b.email) {
                return -1;
            }
            else {
                return 1;
            }
        });

        $.each(msg, function (index, e) {
            option = document.createElement('option');
            option.value = e.id;
            option.innerText = e.email;
            ok.appendChild(option);
        });
    });
    request.fail(function (jqXHR, textStatus) {
        alert('erreur');
    });
}
ajax();


ok.addEventListener("change", dep, false);

function dep() {

    $("#madiv #s2").remove();

    $("#madiv #s1").remove();

    select = document.createElement('select');
    select.setAttribute("id", "s1");
    var request;

    if (ok.value != 0) {

        request = $.ajax({
            url: "http://s3-4396.nuage-peda.fr/forum/api/users/" + ok.value,
            method: "GET",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.overrideMimeType("application/json; charset=utf-8");
            }
        });

    }

    request.done(function (msg) {
        choix = document.createElement('option');
        option.innerText = "Selection Du Message";
        select.appendChild(option);

        $.each(msg.messages, function (index, e) {
            option = document.createElement('option');
            option.value = e.id;
            option.innerText = e.contenu;
            select.appendChild(option);
        });
    });

    request.fail(function (jqXHR, textStatus) { alert('erreur'); });

    madiv.appendChild(select);
}
