var joueurs = new Array();
var nb_joueurs = 0; 


function erreur_init(message)
{
    alert(message);
    initialise();
    nb_joueurs = 0;
}

function initialise()
{
    for(i = 1; i < 7; i++)
    {
	joueurs[i-1] = document.getElementById("j"+i);
	joueurs[i-1].addEventListener("keypress", f, false);
	document.getElementById("j" + i).value = "";
    }
}

function f(x)
{
    
    if(x.keyCode != 13)
    {
	return ;
    }
    
    var k = 0; 
    for( i = 1; i < 7; i++)
    {
	if(joueurs.indexOf(document.getElementById("j" + i).value) != -1)
	{
	    erreur_init("Au moins deux joueurs ont le même nom.");
	    return ;
	}
	if(document.getElementById("j" + i).value.length > 10)
	{
	    erreur_init("Les noms ne doivent pas exceder 10 char.");
	}
	if(/^\w+$/.test(document.getElementById("j" + i).value))
	{
	    joueurs[nb_joueurs] = document.getElementById("j" + i).value;
	    nb_joueurs = nb_joueurs + 1;
	}
    }
    if(nb_joueurs < 2)
    {
	erreur_init("Pas assez de joueurs");
    }
    else
    {
	alert("bon");
    }
}

document.getElementById("jeu").innerHTML = "<p><label for=\"j1\">Joueur 1</label><input id=\"j1\" type=\"text\"/></p><p><label for=\"j2\">Joueur 2</label><input id=\"j2\" type=\"text\"/></p><p><label for=\"j3\">Joueur 3</label><input id=\"j3\" type=\"text\"/></p><p><label for=\"j4\">Joueur 4</label><input id=\"j4\" type=\"text\"/></p><p><label for=\"j5\">Joueur 5</label><input id=\"j5\" type=\"text\"/></p><p><label for=\"j6\">Joueur 6</label><input id=\"j6\" type=\"text\"/></p>";

initialise();

alert("syntaxe correcte");