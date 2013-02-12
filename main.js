var joueurs = new Array();
var nb_joueurs = 0; 
//cette variable permet de savoir quel est le joueur qui est actuellement en train de jouer
var joueur_actuel = 0;

// source : jonathankowalski.fr/blog/2011/12/supprimer-un-element-dans-un-tableau-javascript
Array.prototype.unset = function(val)
{
    var index = this.indexOf(val)
    if(index > -1)
    {
	this.splice(index, -1)
    }
}

// pour un peu d'elegance
function des()
{
    return (parseInt(Math.random()*12)+1);
}

function jouer()
{
    var d = des();
    
    joueurs[joueur_actuel].position = (joueurs[joueur_actuel].position + d) % 39; // % nb de cases
    
    alert(joueurs[joueur_actuel].nom + " " + joueurs[joueur_actuel].position);
    
    //condition d'arret et de continuité du jeu
    if(nb_joueurs == 1)
    {
    var winner = joueurs[(joueur_actuel + 1) % nb_joueurs] ;
	document.getElementById("jeu").innerHTML = "<p>Fin de la partie !!! " + winner + " a gagné <p>";
    }
    else
    {
	joueur_actuel = (joueur_actuel + 1) % nb_joueurs;
	jouer();
    }
    
}

/****************************
         lancement du jeu 
*********************************/

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
	joueurs[i-1].addEventListener("keypress", choisir_nom, false);
	document.getElementById("j" + i).value = "";
    }
}

function choisir_nom(x)
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
	    return ;
	}
	if(/^\w+$/.test(document.getElementById("j" + i).value))
	{
	    joueurs[nb_joueurs] = {"nom":document.getElementById("j" + i).value,"capital": 150000,"position":0};
	    nb_joueurs = nb_joueurs + 1;
	}
    }
    if(nb_joueurs < 2)
    {
	erreur_init("Pas assez de joueurs");
	return ;
    }
    alert("inscription validé");
    jouer();
}

initialise();

alert("syntaxe correcte");