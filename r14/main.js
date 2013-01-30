var max ;
var champs;
var tableau = new Array(["a",1], ["b",2], ["c",3],["d",4]);
var places = [35, 10, 15, 5.5, 15, 10, 1, 2, 0.75, 1.75, 1.5, 1, 1, 0.5]; 

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
    var k = 0;
    var str = "";
    var dernier_rang = -1;

    for(i = 0; i < places.length; i++)
    {
	var place = arrondir(tableau.length*places[i]/100);
	
	for(j = 0; j < place && k+j < tableau.length; j++)
	{
	    str = str + "<tr><td> " +  tableau[k+j][0] + "</td><td>" + tableau[k+j][1] + "</td><td><img src=\"images/rank"+(i+1)+".gif\"/></td></tr>";	    
	}

	if(place == 0 && dernier_rang == -1)
	{
	    dernier_rang = i;
	}

	k += place;
    }
    if(k < tableau.length)
    {
	str = str + "<tr><td> " +  tableau[k][0] + "</td><td>" + tableau[k][1] + "</td><td><img src=\"images/rank"+(dernier_rang+1)+".gif\"/></td></tr>";
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