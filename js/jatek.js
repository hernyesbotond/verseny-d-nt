var sorok;
var oszlopok;
var map = "";
var jatekos;
var object;
var hackerid;
var hacker;
var temp_ertek = ".";
var targetid = [];
var target = [];
var parancs = [];

$(document).ready(
function() {
    //kezdes();
    elkuldes(7);
});

function kezdes(szint)
{  
    //szint = 7;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST","http://bitkozpont.mik.uni-pannon.hu/2021/gamehandler.php",true);
    xhttp.send(JSON.stringify({
        action: "starttask",
        teamcode: "b45e7b1c2ba70abf98f8",
        taskid: szint
    }));
    $("#tabla").empty();
    document.getElementById("tabla").style.display = "block";

    xhttp.onreadystatechange = 
    function() 
    {
        if (this.readyState == 4 && this.status == 200)
        {
            ansobj=JSON.parse(this.responseText);
            var nrow = ansobj.data.map.rowcount;
            var ncell = ansobj.data.map.colcount;
            var newmap = ansobj.data.map.field;
            for(var i = 0; i < newmap.length; i++)
            {
                if(newmap[i] == "." || newmap[i] == "o")
                {
                    map += newmap[i];
                }
            }
            jatekos = ansobj.data.player;
            object = ansobj.data.objects;
            folytatas(nrow,ncell);
        }
    }
}

function enterkivesz(pont)
{
    return pont != "\n";
}

function folytatas(nrow,ncell)
{
    var nszenzor = 5;
    var lepes = 0;
    var mezo  = [];
    var newrow;
    
    for( var i = 0; i < nrow; i++ )
    {
        newrow = document.getElementById("tabla").insertRow(i);
        mezo[i] = new Array(ncell);
        
        for( var j = 0; j < ncell; j++ )
        {
            mezo[i][j] = newrow.insertCell(j);
            mezo[i][j].id = i * ncell + j;
            mezo[i][j].innerHTML = map[mezo[i][j].id]
            mezo[i][j].onclick = function(){ arrebblep(this, ncell); };
            $( mezo[i][j] ).addClass("mezo");
        }
    }

    for( var i = 0; i < object.length; i++ )
    {
        if(object[i].type == "target")
        {
            targetid[i] = object[i].posy * ncell + object[i].posx;
            target[i] = document.getElementById( targetid[i].toString() );
            document.getElementById( targetid[i].toString() ).style.background = "red";

        }
    }
    
    hackerid = jatekos.posy * ncell + jatekos.posx;
    hacker = document.getElementById( hackerid.toString() );
    $( hacker ).addClass("hacker");
    hacker.innerHTML = "H";
    
    var szenzorid = [];
    var szenzor = [];
    var rossz_mezo = [];
    var proba = 20;

    var kozelseg = [];
    var legkozelebb;
}

function arrebblep(obj, ncell)
{
    var nid = parseInt( obj.id );
    var nhacker = parseInt( hackerid );
    
    if(nid + ncell == nhacker)
    {
        console.log("up, ");
        parancs.push("up");
    }
    else if(nid - ncell == nhacker)
    {
        console.log("down, ");
        parancs.push("down");
    }
    else if(nid + 1 == nhacker)
    {
        console.log("left, ");
        parancs.push("left");
    }
    else if(nid - 1 == nhacker)
    {
        console.log("right, ");
        parancs.push("right");
    }
    else if(nid == nhacker)
    {
        console.log("activate, ");
        parancs.push("activate");
        console.log(parancs);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST","http://bitkozpont.mik.uni-pannon.hu/2021/gamehandler.php",true);
        xhttp.send(JSON.stringify({
            action: "activateobject",
            teamcode: "b45e7b1c2ba70abf98f8",
            taskid: 7,
            pwd:"IamJoker82"
        }));
        alert("Itt egy objektum!");
    }

    if
    (
        nid + ncell == nhacker || nid - ncell == nhacker ||
        nid + 1 == nhacker && nhacker % ncell != 0 ||
        nid - 1 == nhacker && nid % ncell != 0 
    )
    {
        
        hacker.innerHTML = temp_ertek;
        temp_ertek = map[obj.id];
        $( hacker ).removeClass("hacker");
        $( obj ).addClass("hacker");
        obj.innerHTML = "H";
        hackerid = obj.id;
        hacker = document.getElementById( hackerid.toString() );
    }
}

function elkuldes(szint) 
{
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST","http://bitkozpont.mik.uni-pannon.hu/2021/gamehandler.php",true);
    xhttp.send(JSON.stringify({
        action: "performactions",
        teamcode: "b45e7b1c2ba70abf98f8",
        taskid: szint,
        actions: ['left', 'left', 'left', 'activate', 'down', 'left', 'left', 'down', 'down', 'right', 'down', 'right', 'activate', 'left', 'left', 'down', 'down', 'right', 'down', 'activate', 'down', 'right', 'right', 'right', 'right', 'down', 'activate', 'up,', 'up,', 'up,', 'up,', 'up,', 'right', 'activate', 'down', 'down', 'down', 'down', 'down', 'right', 'right', 'activate', 'right', 'right', 'up,', 'up,', 'activate', 'up,', 'up,', 'up,', 'up,', 'right', 'up,', 'up,', 'left', 'activate']
    }));
}