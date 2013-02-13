var joueurs = [];
var nb_joueurs = 0; 
//cette variable permet de savoir quel est le joueur qui est actuellement en train de jouer
var joueur_actuel = 0;
var cases = []; 
/*
  1 = caisse; 
  2 = chance; 
  3 = exam; 
  4 = SV/Parc/Depart; 
  5 = Crous; 
  6 = reste; 
  {"proprietaire", "prix"=1(terrain)/2(maison)/3(hotel)}
*/

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
    return 1; 
    return (parseInt(Math.random()*12)+1);
}

// meme chose qu'en haut
function pos_actuelle()
{
    return (joueurs[joueur_actuel].position);
}

function prix_1maison(prix)
{
    return parseInt(2 * prix + prix/2);
}

function prix_2maisons(prix)
{
    return parseInt(3 * prix + 2 * prix / 3);
}

function prix_3maisons(prix)
{
    return parseInt(5 * prix + 4 * prix / 5);
}

function prix_4maisons(prix)
{
    return parseInt(8 * prix + 7 * prix / 8);
}

function prix_hotel(prix)
{
    return parseInt(12 * prix + 11 * prix / 12);
}

function bouton_passer()
{
    return "<p><input type=\"button\" value=\"passe\" id=\"passer\"/></p>";
}


//////////////////////////////////////////////////

function caisse()
{
    document.getElementById("jeu").innerHTML = "case caisse de communaute" + bouton_passer();
    /*
      document.getElementById("jeu").innerHTML = "<p>Retourner a Paris Store</p>" + bouton_passer();
      document.getElementById("jeu").innerHTML = "<p>Aller en Prison</p>" + bouton_passer();
      document.getElementById("jeu").innerHTML = "<p>Aller a la case Départ</p>" + bouton_passer();
      document.getElementById("jeu").innerHTML = "<p>Tirer une carte chance</p>" + bouton_passer();
      document.getElementById("jeu").innerHTML = "<p>Retourner a Paris Store</p>" + bouton_passer();
      document.getElementById("jeu").innerHTML = "<p></p>" + bouton_passer();
    */
}

function chance()
{
    document.getElementById("jeu").innerHTML = "case chance" + bouton_passer();
}

function examen()
{
    document.getElementById("jeu").innerHTML = "case examen" + bouton_passer();
}

// parc, simple_visite
function tranquille()
{
    document.getElementById("jeu").innerHTML = "Ici il ne se passe rien" + bouton_passer();    
}

//Palmashow : Quand on est en prison
function prison()
{
    document.getElementById("jeu").innerHTML = "vous etes en prison";
}

function crous()
{
    document.getElementById("jeu").innerHTML = "case du crous " + bouton_passer();
}

function achat()
{
    var prix = document.getElementById("c" + pos_actuelle() + "_prix").innerHTML.replace(".","");
    prix = [prix, prix_1maison(prix), prix_2maisons(prix), prix_3maisons(prix), prix_4maisons(prix), prix_hotel(prix)];
    document.getElementById("jeu").innerHTML = "<table style=\"margin:auto\"><tr><td colspan=\"3\">" + document.getElementById("c" + pos_actuelle() + "_nom").innerHTML + "</td></tr><tr><td> terrain </td><td>" + prix[0] + "</td><td><input type=\"button\" id=\"c1\" value=\"commander = c1\" /></td></tr><tr><td> 1 maison </td><td>" + prix[1] + "</td><td><input type=\"button\" id=\"c2\" value=\"commander\" /></td></tr><tr><td> 2 maisons </td><td>" + prix[2] + "</td><td><input type=\"button\" id=\"c3\" value=\"commander\" /></td></tr><tr><td> 3 maisons </td><td>" + prix[3] + "</td><td><input type=\"button\" id=\"c4\" value=\"commander\" /></td></tr><tr><td> 4 maisons </td><td>" + prix[4] + "</td><td><input type=\"button\" id=\"c5\" value=\"commander\" /></td></tr><tr><td> hotel </td><td>" + prix[5] + "</td><td><input type=\"button\" id=\"c6\" value=\"commander\" /></td></tr></table>" + bouton_passer();
    
    var c = [];
    for(i = 1; i < 7; i++)
    {
	c[i-1] = document.getElementById("c" + i);
	c[i-1].addEventListener("click", function(X)
				{
				    if(joueurs[joueur_actuel].capital > X)
				    {
					joueurs[joueur_actuel].capital -= X ;
					alert("Achat effectué");
					passer();
				    }
				    else
				    {
					alert("pas assez d'argent ");
				    }
				    
				}.bind(this, prix[i-1]), false);
    }
}

function payer_loyer()
{
    document.getElementById("jeu").innerHTML = "Bienvenue chez " + cases[pos_actuel()].proprietaire;
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

//condition d'arret et de continuité du jeu
function passer()
{
    alert("111111");
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
	alert("dés : " + d);
	joueurs[joueur_actuel].position = (pos_actuelle() + d) % 40; // % nb de cases
	avance();
    }
    
    detect_passe = document.getElementById("passer");
    detect_passe.addEventListener("click", passer, false);
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