/*
  a = nb - 14
  R14 = 1ere place
  R13 = 2e - 5e places
  R12 = 6e - 14e places
  R11 = ... R1 = 1/11 
*/

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

function ajouter_case(x)
{
    if(x.keyCode != 13)
    {
	return ;
    }
    tableau = tableau.push(decoupe());
    tableau = tableau.sort(
	function(a,b)
	{
	    return (a[1] < b[1] ? -1 : (a[1] > b[1] ? -1: 0)) 
	}
    );
    str = "";
    
    for(i = 0; i < tableau.length ; i++)
    {
	str = str + "<tr><td> " +  tableau[i][0] + "</td><td>" + tableau[i][1] + "</td><td></td></tr>";
    }
    
    document.getElementById("tableau").innerHTML = "<table><tr><th>Pseudo</th><th>VH</th><th></th></tr>" + str + "</table>";
}

champs = document.getElementById("champs");
champs.addEventListener("keypress",ajouter_case,false);

alert("syntaxe correcte");