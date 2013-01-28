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

/* afficher tableau dans la page */
function affiche()
{  
    max = tableau[tableau.length-1][1];
    str = "";
    for(i = 0; i < tableau.length ; i++)
    {
	str = str + "<tr><td> " +  tableau[i][0] + "</td><td>" + tableau[i][1] + "</td><td>"+i+"</td></tr>";
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