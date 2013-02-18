var joueurs = [];
var nb_joueurs = 0; 
//cette variable permet de savoir quel est le joueur qui est actuellement en train de jouer
var joueur_actuel = 0;
var cases = []; 
var jeu = document.getElementById("jeu");
var info = document.getElementById("td_info");
var validation = document.getElementById("td_validation");
/*
  joueurs:
  {"nom", "capital"[=150k], "position"[=0], "prison"[=false], "id", "dispense"[=false], "gares"[=0]}
  cases: 
  1 = caisse; 
  2 = chance; 
  3 = exam; 
  4 = SV/Parc/Depart; 
  5 = Crous; 
  6 = reste; 
  7 = prison;
  8 = gare;
  {"proprietaire", "prix", "id"}
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
    return 5;
    return (parseInt(Math.random()*12)+1);
}

// meme chose qu'en haut
function pos_actuelle()
{
    return (joueurs[joueur_actuel].position);
}

function loyer_1maison(prix)
{
    return parseInt(2 * prix + prix/2);
}

function loyer_2maisons(prix)
{
    return parseInt(3 * prix + 2 * prix / 3);
}

function loyer_3maisons(prix)
{
    return parseInt(5 * prix + 4 * prix / 5);
}

function loyer_4maisons(prix)
{
    return parseInt(8 * prix + 7 * prix / 8);
}

function loyer_hotel(prix)
{
    return parseInt(12 * prix + 11 * prix / 12);
}

/***********************************************/

//cf caisse: 1, 2, 3
// on s'aide des positions des gares
function couleur()
{
    return 25000 * (0|pos_actuelle()/5 + 1);
}

function amende_bonus(x, message)
{
    jeu.innerHTML = message;
    validation.innerHTML = "<input type=\"button\" id=\"bouton_validation\" value=\"Payer\"/>";
    var bouton_event = document.getElementById("bouton_validation");
    bouton_event.addEventListener("click" , function()
				  {
				      if(joueurs[joueur_actuel].capital > x)
				      {
					  joueurs[joueur_actuel].capital += x;
					  passer();
				      }
				      else
				      {
					  jeu.innerHTML = "Vous n'avez pas assez d'argent, il n'y a qu'un seul endroit pour les gens comme vous : le script";
					  validation.innerHTML = "<input type=\"button\" value=\"Aller au Script\" id=\"bouton_passe\"/>";
				      }
				  }, false);
}

//cf caisse: 4, 6
function aller_a(num_case, message)
{
    jeu.innerHTML        = message;
    validation.innerHTML = "<input type=\"button\" id=\"bouton_validation\" value=\"Avancer\"/>";
    joueurs[joueur_actuel].position = num_case;
    var avancer = document.getElementById("bouton_validation");
    avancer.addEventListener("click", avance, false);
}

//cf caisse : 7, 8, 9, 10, 11, 12 
function avancer_reculer(nb_cases, message)
{
    jeu.innerHTML        = message ;
    validation.innerHTML = "<input type=\"button\" id=\"bouton_validation\" value=\""+((nb_cases > 0) ? "Avancer" : "Reculer")+"\"/>";
    joueurs[joueur_actuel].position+=nb_cases;
    if(joueurs[joueur_actuel].position < 0)
    {
	joueurs[joueur_actuel].position = 39;
    }
    var bouger = document.getElementById("bouton_validation");
    bouger.addEventListener("click", avance, false);
}

function resultat_lancer_des()
{
    var d1 = document.getElementById("d1");
    var d2 = document.getElementById("d2");
    if( d1.innerHTML == ""  || d2.innerHTML == "")
    {
	return ;
    } 
    document.getElementById("lancement").innerHTML = "Vous devez payer : " + ((0|d1.innerHTML) + (0|d2.innerHTML)) * 500 + "Fr";
    validation.innerHTML = "<input type=\"button\" id=\"bouton_valide\" value=\"Payer\"/>";
}

//cf caisse : 13
function lancer_des()
{
    jeu.innerHTML = "Lancez les dés, vous devrez payer a la banque (le resultat * 500) Fr.<p id=\"lancement\">[<span id=\"d1\"></span>] et [<span id=\"d2\"></span>]</p>";
    validation.innerHTML = "<input type=\"button\" id=\"bouton_d1\" value=\"t1\"/> <input type=\"button\" id=\"bouton_d2\" value=\"t2\"/>";
    var td1 = document.getElementById("bouton_d1");
    td1.addEventListener("click", function(X)
		       {
			   document.getElementById("d1").innerHTML = X;
			   resultat_lancer_des();
		       }.bind(this, 1 + (0|Math.random()* 12)), false);
    var td2 = document.getElementById("bouton_d2");
    td2.addEventListener("click", function(X)
			 {
			     document.getElementById("d2").innerHTML = X;
			     resultat_lancer_des();
		       }.bind(this, 1 + (0|Math.random()* 12)), false);
}

//cf caisse : 14
function tirer_carte(f)
{
    jeu.innerHTML = "Tirez une carte" + ((f) ? "Chance" : "Communauté") + ".";
    validation.innerHTML = "<input type=\"button\" value=\"Tirer une carte\" id=\"bouton_validation\"/>";
    var v = document.getElementById("bouton_validation");
    if(f)
    {
    v.addEventListener("click", chance.bind(this, 1 + (0|Math.random()* 7)), false)
    }
    else
    {
	v.addEventListener("click", caisse.bind(this, 1 + (0|Math.random()* 14)), false)
    }
}

//cf avance : 1 
function caisse(d, message)
{
    switch(d)
    {
    case 1:
	return amende_bonus(-5000,"Recharge de carte pour la cantine : payer a la banque 5.000 Fr");
    case 2:
	return amende_bonus(-10000, "Inscription au sport : payer a la banque 10.000 Fr");
    case 3:
	return amende_bonus(-20000,"Chantage: Payez 20.000Fr à la banque, ou redoublez");
    case 4:
	return aller_a(1 ,"Stage en entreprise: allez a Paris Store");
    case 5:
	return aller_en_prison();
    case 6: 
	return aller_a(24, "Allez a Sophie-Germain, vos resultats sont affichés (ou pas en fait)");
    case 7:
	return avancer_reculer(-3, "Reculez de 3 cases");
    case 8:
	return avancer_reculer(-2, "Reculez de 2 cases");
    case 9:
	return avancer_reculer(-1, "Reculez de 1 case"); 
    case 10:
	return avancer_reculer(1, "Avancez de 1 case"); 
    case 11:
	return avancer_reculer(2, "Avancez de 2 cases");
    case 12:
	return avancer_reculer(3, "Avancez de 3 cases");
    case 13:
	return lancer_des();
    case 14:
	return tirer_carte();
    }
}

// cf chance : 4
function recoit_terrain()
{
    jeu.innerHTML = "Obtention de locaux: vous avez reçu le terrain de Paris I, si ce terrain est deja pris, vous devez payer une amende egale au loyer de Paris I a son propriétaire";
    if(cases[6] == 6)
    {
	jeu.innerHTML += "<p>Il n'y a pas de propriétaire, vous obtenez donc le terrain</p>";
	validation.innerHTML = "<input type=\"button\" id=\"bouton_validation\" value=\"Passer\"/>";
	cases[6] = {"proprietaire": joueurs[joueur_actuel].nom, "prix": 10000, "id":joueur_actuel};
    }
    else
    {
	jeu.innerHTML += "<p>Paris I est occupé, vous devez payer "+cases[6].prix+"Fr à "+cases[6].proprietaire+"</p>";
	validation.innerHTML = "<input type=\"button\" id=\"bouton_validation\" value=\"Payer\"/>";
	joueurs[joueur_actuel].capital -= cases[6].loyer;
	joueurs[cases[6].id].capital += cases[6].loyer;
    }
    var v = document.getElementById("bouton_validation");
    v.addEventListener("click", passer, false);
}

// cf chance: 5
function carte_prison()
{
    validation.innerHTML = "<input type=\"button\" id=\"bouton_validation\" name=\"antiprison\" value=\"Obtenir la dispense\"/>";
    jeu.innerHTML = "Vous avez décidés de filmer les cours de vos profs, vous avez alors été dispensé d'un projet de votre choix, vous ne pouvez en avoir qu'une seule";
    joueurs[joueur_actuel].dispence = true;
    var v = document.getElementById("bouton_validation");
    v.addEventListener("click", passer, false);
}

/*
  Carte anti-Prison
  Gagner "G" argent
  Tirer une carte communauté
  aller a la case depart
  vous gagnez le terrain de la case C
*/
function chance(d)
{
    switch(d)
    {
    case 1:
	return amende_bonus(5000, "Disfonctionnement de la recharge de carte pour la cantine : recevez 5.000 Fr");
    case 2:
	return amende_bonus(10000, "La machine a café ne verse plus le café... mais de l'argent, recevez 10.000 Fr");
    case 3:
	return amende_bonus(20000, "David doit vous remboursez des repas de cantine impayés, recevez 20.000 Fr");
    case 4:	
	return recoit_terrain();
    case 5:
	return carte_prison();
    case 6:
	aller_a(24 ,"Allez a Sophie-Germain, vos resultats sont affichés (ou pas en fait)");
    case 7:
	tirer_carte(true);
    }
}

//cf avance: 8
function gare()
{
    var nom_case = document.getElementById("c" + pos_actuelle() + "_nom").innerHTML;
    var bouton_commande = "<input type=\"button\" value=\"Commander\" id=\"commande\"/>";
    var loyer = (joueurs[joueur_actuel].gares == 0) ? 2500 : (joueurs[joueur_actuel].gares) * 2;
    jeu.innerHTML = "<p><table><tr><th>" + nom_case + "</th></tr><tr><th>Prix</th><th>Loyer</th></tr><td>20.000</td><td>"+loyer+"</td><td>"+bouton_commande+"</td><tr></th></table></p>";
    bouton_commande = document.getElementById("commande");
    bouton_commande.addEventListener("click", function(X)
				     {
					 if(joueurs[joueur_actuel].capital < X)
					 {
					     alert("Pas assez d'argent");
					 }
					 else
					 {
					     joueurs[joueur_actuel].capital -= X;
					     alert(joueurs[joueur_actuel].capital);
					     cases[pos_actuelle()] = {"proprietaire": joueurs[joueur_actuel].nom, "prix": loyer, "id" : joueur_actuel};
					     joueurs[joueur_actuel].gare += 1;
					     alert("Commande effectué");
					     passer();
					 }
					 }.bind(this, loyer), false);
    /*----------------------------*/
    validation.innerHTML = "<input type=\"button\" id=\"validation\" value=\"Passer\"/>";
    var bouton_passer = document.getElementById("validation");
    bouton_passer.addEventListener("click", passer, false);
}

function examen_crous()
{
    validation.innerHTML = "<input type=\"button\" id = \"choix_prison\" name = \"prison\" value = \"Aller au Script\"/> <input type=\"button\" id = \"choix_payer\" name = \"payer\" value = \"Payer 10.000Fr\"/> ";
    if(pos_actuelle() == 4)
    {
	jeu.innerHTML = "Examen : Vous avez le choix entre reviser à en avoir la chair a vif au Script ou payer 10.000 Fr";
    }
    else
    {
	jeu.innerHTML = "Crous : la bourse ou le script c'est toi qui choisit";
    }
    var pr = document.getElementById("choix_prison");
    pr.addEventListener("click", function()
		       {
			   joueurs[joueur_actuel].prison = true;
			   passer();
		       }, false);
    var pa = document.getElementById("choix_payer");
    pa.addEventListener("click", function()
			{
			    joueurs[joueur_actuel].capital -= 10000;
			    passer();
			}, false);
}

function tranquille()
{
    switch(pos_actuelle())
    {
    case 0:
	validation.innerHTML = "<input type=\"button\" name=\"depart\" value = \"Passer\">";
	return "Case départ recevez 20.000 Fr";
    case 10:
	validation.innerHTML = "<input type=\"button\" name=\"sv\" value = \"Passer\">";
	return "Simple Visite, c'est marrant de regarder les autres bosser quand on a rien a faire, hein ?";
    case 20:
	validation.innerHTML = "<input type=\"button\" name=\"parc\" value = \"Passer\">";
	return "Case Parc, on peut se la couler douce";
    }
}   

//cf caisse: 5; cf case 30
function aller_en_prison()
{
    var l = ["Java", "C", "Python", "PHP && co", "Ocaml"];
    var n = (0|(10*Math.random()))*100 + 100;
    var j = 0|(1 + Math.random() * 15);
    var r = l[0|Math.random() * l.length];
    jeu.innerHTML = "Projet surprise: "+n+" lignes de "+r+" a écrire en "+j+" jour"+((j > 1 )? "s": "")+", par conséquent allez au script";
    validation.innerHTML = "<input type=\"button\" id=\"bouton_valider\" value = \"Aller au script\">"
    var go_script = document.getElementById("bouton_valider");
    joueurs[joueur_actuel].prison = true;
    go_script.addEventListener("click", passer, false);
}

function prison(){alert("en prison");}

function crous(){}
 
function achat()
{
    var loyer = parseInt(document.getElementById("c" + pos_actuelle() + "_prix").innerHTML.replace(".",""));
    loyer = [loyer, loyer_1maison(loyer), loyer_2maisons(loyer), loyer_3maisons(loyer), loyer_4maisons(loyer), loyer_hotel(loyer)];
    var prix = [ loyer[0], loyer[0] + couleur(), 2 * (loyer[0] + couleur()), 3 * ( loyer[0] + couleur()), 4 * (loyer[0] + couleur()), 2 * 3 * 4 * loyer[0] + couleur()]; 
    
    jeu.innerHTML = "<table style=\"margin:auto\"><tr><td colspan=\"3\">" + document.getElementById("c" + pos_actuelle() + "_nom").innerHTML + "</td></tr><tr><th>Choix</th><th>Prix</th><th>Loyer</th></tr><tr><td> terrain   </td><td>"+ prix[0] + "</td><td>" + loyer[0] + "</td><td><input type=\"button\" id=\"c1\" value=\"commander\" /></td></tr><tr><td> 1 maison  </td><td>"+ prix[1] + "</td><td>" + loyer[1] + "</td><td><input type=\"button\" id=\"c2\" value=\"commander\" /></td></tr><tr><td> 2 maisons </td><td>"+ prix[2] + "</td><td>" + loyer[2] + "</td><td><input type=\"button\" id=\"c3\" value=\"commander\" /></td></tr><tr><td> 3 maisons </td><td>"+ prix[3] + "</td><td>" + loyer[3] + "</td><td><input type=\"button\" id=\"c4\" value=\"commander\" /></td></tr><tr><td> 4 maisons </td><td>"+ prix[4] + "</td><td>" + loyer[4] + "</td><td><input type=\"button\" id=\"c5\" value=\"commander\" /></td></tr><tr><td> hotel     </td><td>"+ prix[5] + "</td><td>" + loyer[5] + "</td><td><input type=\"button\" id=\"c6\" value=\"commander\" /></td></tr></table>";

    validation.innerHTML = "<input type=\"button\" id=\"passer\" value=\"Passer\"/>";
    detect_passe = document.getElementById("passer");
    detect_passe.addEventListener("click", passer, false);
    
    var c = [];
    for(i = 1; i < 7; i++)
    {
	c[i-1] = document.getElementById("c" + i);
	c[i-1].addEventListener("click", function(l, p)
				{
				    if(joueurs[joueur_actuel].capital > p)
				    {
					joueurs[joueur_actuel].capital -= p ;
					cases[pos_actuelle()] = {"id":joueur_actuel, "proprietaire":joueurs[joueur_actuel].nom, "prix":l};
					alert("Achat effectué " + p);
					passer();
				    }
				    else
				    {
					alert("pas assez d'argent " + p);
				    }
				    
				}.bind(this, loyer[i-1], prix[i-1]), false);
    }
    return "";
}

function payer_loyer()
{
    if(pos_actuelle() == undefined)
    {
	alert("indefini : " + joueur_actuel);
    }
    else if(cases[pos_actuelle()].id == joueur_actuel)
    {
	jeu.innerHTML = "vous etes chez vous" + bouton_passer();
	detect_passe = document.getElementById("passer");
	detect_passe.addEventListener("click", passer, false);
	
    }
    else
    {
	jeu.innerHTML = "<p>Bienvenue chez " + cases[pos_actuelle()].proprietaire + "</p><p><input type=\"button\" value=\"payer\" id=\"payer\"/></p>";
	var p = document.getElementById("payer");
	p.addEventListener("click", function(casa)
			   {
			       alert(pos_actuelle());
			       if(joueurs[joueur_actuel].capital > casa.prix)
			       {
				   joueurs[joueur_actuel].capital -= casa.prix;
				   joueurs[casa.id].capital += casa.prix;
				   passer();
			       }
			       else
			       {
				   alert("pas assez d'argent");
			       }
			       
			   }.bind(this, cases[pos_actuelle()]), false);
    }
}
//cases du jeu
function avance()
{
    var c_p_a = cases[pos_actuelle()];
    //////////////////////////////////////////////
    
    info.innerHTML = joueurs[joueur_actuel].nom +" " + joueurs[joueur_actuel].capital;
    
    //////////////////////////////////////
    
    switch(c_p_a)
    {
    case 1:
	caisse(1 + (0|Math.random() * 14));
	break;
    case 2:
	chance(1 + (0|Math.random() * 7));
	break;
    case 3:
	jeu.innerHTML = "<div class=\"examen\">" + examen() + "</div>";
	break;
    case 4:
	jeu.innerHTML = "tranquille";
	break;
    case 5:
	jeu.innerHTML = "crous";
	break;
    case 6:
	achat();
	break;
    case 7:
	jeu.innerHTML = aller_en_prison();
	break;
    case 8:
	gare();
	break;
    default :
	payer_loyer();
    }    
}
//condition d'arret et de continuité du jeu
function passer()
{
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
	joueurs[joueur_actuel].position = (pos_actuelle() + d) % 40; // % nb de cases
	avance();
    }    
}

/*******************************\
*        lancement du jeu       *
\*******************************/

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
	    joueurs[nb_joueurs] = {"nom":document.getElementById("j" + i).value,"capital": 150000,"position":0, "prison":false, "id":nb_joueurs, "dispence": false, "gares": 0};
	    nb_joueurs = nb_joueurs + 1;
	}
    }
    if(nb_joueurs < 2)
    {
	erreur_init("Pas assez de joueurs");
	return ;
    }
    jouer();
}

for(i = 0; i < 40 ; i++)
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
    else if(i % 5 == 0 && i % 10 != 0)
    {
	cases[i] = 8;
    }
    else if(i == 4)
    {
	cases[i] = 3;
    }
    else if(i == 10 || i == 20 || i == 0)
    {
	cases[i] = 4;
    }
    else if(i == 30)
    {
	cases[i] = 7;
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
