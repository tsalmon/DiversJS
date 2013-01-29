/*
  a = nb - 14
  R14 = 1ere place
  R13 = 2e - 5e places
  R12 = 6e - 14e places
  R11 = ... R1 = 1/11 
*/
var max ;
var champs;
var tableau = new Array();

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

function afficher_r14_r13_r12()
{
    var str = "";
    var k = 0;
    for(i = tableau.length-1; i >= 0  && k++ < 15; i--)
    {
	str = str + "<tr><td>" + tableau[i][0] + "</td><td>" + tableau[i][1] + "</td><td><img src=\"images/rank"; 
	if(k-1 == 0)
	{
	    str = str + "14";
	}
	else if(k-1 > 0 && k-1 < 5)
	{
	    str = str + "13";
	}
	else
	{
	    str = str + "12";
	}
	str = str + ".gif\"/></td></tr>";
    }
    return str;
}

/* afficher tableau dans la page */
function affiche()
{  
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
}

/* ajouter le champs dans tableau */
function ajouter_case(x)
{
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