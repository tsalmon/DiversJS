/*
  R14 = 0.5
  R13 = 1
  R12 = 1
  R11 = 1.5
  R10 = 1.75
  R09 = 0.75
  R08 = 2
  R07 = 1
  R06 = 10
  R05 = 15
  R04 = 5.5
  R03 = 15
  R02 = 10
  R01 = 35
*/
var max ;
var champs;
var tableau = new Array();
var places = [35, 10, 15, 5.5, 15, 10, 1, 2, 0.75, 1.75, 1.5, 1, 1, 0.5]; 
function genere_pseudo(i)
{
    return "random"
}

function genere_VH()
{
    
}



/* Genere n cases pour tableau */
function genere(x)
{
    if(x != 13)
    {
	return;
    }
    
}

/*Supprimer espaces de fin de chaine*/
function del_esp_str(x)
{
    return champs.value;
}

/* w1 ... wn p => ["w1+...+wn", p]*/
function decoupe()
{
    u = champs.value.split(" ");
    str = "";
    for(v=0; v < u.length-1; v++)
    {
	str = str + " " + u[v];
    }
    return [str, u[u.length-1]];
}

function pseudo_existe(x)
{
    for(i = 0; i < tableau.length; i++)
    {
	if(tableau[i][0] == x)
	{
	    return (true);
	}
    }
    return (false);
}

function arrondir(n)
{
    if(n % 1 < 0.5)
    {
	return Math.floor(n);
    }
    else
    {
	return Math.ceil(n);
    }
}

/* afficher tableau dans la page */
function affiche()
{  
    /*
    var rank = 14;
    var nb_elems = tableau.length;
    var str = "";
    str = afficher_r14_r13_r12();
    if(tableau.length > 15)
    {
	for(i = tableau.length -1; i>0 ; i--)
	{
	    str = str + "<tr><td> " +  tableau[i][0] + "</td><td>" + tableau[i][1] + "</td><td><img src=\"images/rank"+11+".gif\"/></td></tr>";
	}
    }
    document.getElementById("tableau").innerHTML = "<table><tr><th>Pseudo</th><th>VH</th><th></th></tr>" + str + "</table>";
    */
    var k = 0;
    var str = "";
    
    for(i = 0; i < places.length; i++)
    {
	var place = arrondir(tableau.length*places[i]/100);
	for(j = 0; j < place; j++)
	{
	    str = str + "<tr><td> " +  tableau[k+j][0] + "</td><td>" + tableau[k+j][1] + "</td><td><img src=\"images/rank"+(i+1)+".gif\"/></td></tr>";	    
	}
	
	k += place;
    }
    document.getElementById("tableau").innerHTML = "<table><tr><th>Pseudo</th><th>VH</th><th></th></tr>" + str + "</table>";
}

/* ajouter le champs dans tableau */
function ajouter_case(x)
{
    if(x.keyCode != 13)
    {
	return ;
    }
    var resultat = decoupe();
    resultat[1] = parseInt(resultat[1],10);
    if(pseudo_existe(resultat[0]) == true || resultat[1] == NaN)
    {
	return ;
    }
    tableau.push(resultat);
    tableau = tableau.sort(
	function(b,c) 
	{ 
	    var i=b[1], j=c[1]; if (i===j)return 0; return i<j ? -1 : 1; 
	});
    affiche();
}

champs = document.getElementById("champs");
champs.addEventListener("keypress",ajouter_case,false);

alert("syntaxe correcte");