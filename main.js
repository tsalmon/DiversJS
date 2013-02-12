var joueurs = new Array();
var nb_joueurs = 0; 
//cette variable permet de savoir quel est le joueur qui est actuellement en train de jouer
var joueur_actuel = 0;
var cases = new Array(); // 1 = caisse, 2 = chance, 3 = exam, 4 = SV/Parc/Depart, 5 = Crous, 6 = reste
var detect_passe; // detecter le bouton de passage au joueur suivant
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

// meme chose qu'en haut
function pos_actuelle()
{
    return (joueurs[joueur_actuel].position);
}

function bouton_passer()
{
    return "<input type=\"button\" id=\"passe\"/>";
}

//////////////////////////////////////////////////

function caisse()
{
    document.getElementById("jeu").innerHTML = "<p>Retourner a Paris Store</p>" + bouton_passer();
    document.getElementById("jeu").innerHTML = "<p>Aller en Prison</p>" + bouton_passer();
    document.getElementById("jeu").innerHTML = "<p>Aller a la case Départ</p>" + bouton_passer();
    document.getElementById("jeu").innerHTML = "<p>Tirer une carte chance</p>" + bouton_passer();
    document.getElementById("jeu").innerHTML = "<p>Retourner a Paris Store</p>" + bouton_passer();
    document.getElementById("jeu").innerHTML = "<p></p>" + bouton_passer();
}

function chance()
{
    
}

function examen()
{
}

// parc, simple_visite
function tranquille()
{
    document.getElementById("jeu").innerHTML = "Ici il ne se passe rien<input id=\"passe\" type=\"button\"/>";
    
}

//Palmashow : Quand on est en prison
function prison()
{
    
}

function crous()
{
    
}

function achat()
{
    
}

function payer_loyer()
{
    
}

//cases du jeu
function avance()
{
    switch(cases[pos_actuelle()])
    {
    case 1:
	caisse();
	break;
    case 2:
	chance();
	break;
    case 3:
	examen();
	break;
    case 4:
	tranquille();
	break;
    case 5:
	crous();
	break;
    case 6:
	achat();
	break;
    default :
	payer_loyer();
    }
}

//deplacement des joueurs
function jouer()
{
    // soit le joueur est en prison, soit il peut se deplacer sur le jeu
    if(joueurs[joueur_actuel].prison == true)
    {
	prison();
    }
    else
    {
	var d = des();
	joueurs[joueur_actuel].position = (pos_actuelle() + d) % 40; // % nb de cases
	avance();
    }
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
	    joueurs[nb_joueurs] = {"nom":document.getElementById("j" + i).value,"capital": 150000,"position":0, "prison":false};
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

for(i = 0; i < 39 ; i++)
{
    //caisse
    if(i == 2 || i == 17 || i == 33)
    {
	cases[i] = 1;
    }
    else if(i == 7 || i == 22 || i == 36)
    {
	cases[i] = 2;
    }
    else if(i == 4)
    {
	cases[i] = 3;
    }
    else if(i == 10 || i == 20 || i == 0)
    {
	cases[i] = 4;
    }
    else if(i == 38)
    {
	cases[i] = 5;
    }
    else 
    {
	cases[i] = 6;
    }
}

initialise();

alert("syntaxe correcte");