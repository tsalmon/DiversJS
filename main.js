function monopoly()
{
    var joueurs = [];
    var cases = []; 
    
    var nb_joueurs = 0; 
    var joueur_actuel = 0;
    var des_actuel = 0;
    
    var jeu = document.getElementById("jeu");
    var info = document.getElementById("td_info");
    var validation = document.getElementById("td_validation");
    
    var bouton_proprio_view = "<input type=\"button\" id=\"proprio_view\" value=\"Voir les possessions\"/>";
    var bouton_quitter = "<input type=\"button\" id=\"quitter_jeu\" value=\"Quitter le jeu\"/>";
    var bouton_passer = "<input type=\"button\" id=\"bouton_passer\" value=\"Passer\"/>";
    var bouton_payer = "<input type=\"button\" id=\"bouton_payer\" value=\"Payer\"/>";
    var bouton_prison = "<input type=\"button\" id=\"bouton_prison\" value=\"Allez au script\" />";
    /*
      joueurs:
      {"nom", "capital"[=150k], "position"[=0], "prison"[=false], "id", "dispense"[=false], "gares"[=0], "compagnies"[=0]}
      cases: 
      1 = caisse; 
      2 = chance; 
      3 = exam; 
      4 = SV/Parc/Depart; 
      5 = Crous; 
      6 = reste; 
      7 = prison;
      8 = gare;
      9 = compagnie;
      {"proprietaire", "prix", "id", "compagnie"}
    */
    
    // source : ejohn.org/blog/javascript-array-remove/
    Array.prototype.unset = function(from, to)
    {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
    }
    
    // pour un peu d'elegance
    function des()
    {
	return (0|(Math.random()*12)+1);
    }
    
    // meme chose qu'en haut
    function pos_actuelle()
    {
	return (joueurs[joueur_actuel].position);
    }
    
    function loyer_1maison(prix)
    {
	return prix * 0.30;
    }
    
    function loyer_2maisons(prix)
    {
	return prix * 0.5;
    }
    
    function loyer_3maisons(prix)
    {
	return prix * 0.75;
    }
    
    function loyer_4maisons(prix)
    {
	return prix;
    }
    
    function loyer_hotel(prix)
    {
	return prix * 1.3;
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
					      document.getElementById("jeu").innerHTML = "Vous n'avez pas assez d'argent, il n'y a qu'un seul endroit pour les gens comme vous : le script";
					      validation.innerHTML = "<input type=\"button\" value=\"Aller au Script\" id=\"bouton_passe\"/>";
					  }
				      }, false);
    }
    
    //cf caisse: 4, 6
    function aller_a(num_case, message)
    {
	document.getElementById("jeu").innerHTML        = message;
	validation.innerHTML = "<input type=\"button\" id=\"bouton_validation\" value=\"Avancer\"/>";
	joueurs[joueur_actuel].position = num_case;
	var avancer = document.getElementById("bouton_validation");
	avancer.addEventListener("click", avance, false);
    }
    
    //cf caisse : 7, 8, 9, 10, 11, 12 
    function avancer_reculer(nb_cases, message)
    {
	document.getElementById("jeu").innerHTML        = message ;
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
	var b_p = document.getElementById("bouton_valide");
	b_p.addEventListener("click", passer, false);
    }
    
    //cf caisse : 13
    function lancer_des()
    {
	document.getElementById("jeu").innerHTML = "Lancez les dés, vous devrez payer a la banque (le resultat * 500) Fr.<p id=\"lancement\">[<span id=\"d1\"></span>] et [<span id=\"d2\"></span>]</p>";
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
    document.getElementById("jeu").innerHTML = "Tirez une carte" + ((f) ? "Chance" : "Communauté") + ".";
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
    document.getElementById("jeu").innerHTML = "Obtention de locaux: vous avez reçu le terrain de Paris I, si ce terrain est deja pris, vous devez payer une amende egale au loyer de Paris I a son propriétaire";
    if(cases[6] == 6)
    {
	document.getElementById("jeu").innerHTML += "<p>Il n'y a pas de propriétaire, vous obtenez donc le terrain</p>";
	validation.innerHTML = "<input type=\"button\" id=\"bouton_validation\" value=\"Passer\"/>";
	cases[6] = {"proprietaire": joueurs[joueur_actuel].nom, "prix": 10000, "id":joueur_actuel};
    }
    else
    {
	document.getElementById("jeu").innerHTML += "<p>Paris I est occupé, vous devez payer "+cases[6].prix+"Fr à "+cases[6].proprietaire+"</p>";
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
    document.getElementById("jeu").innerHTML = "Vous avez décidés de filmer les cours de vos profs, vous avez alors été dispensé d'un projet de votre choix, vous ne pouvez en avoir qu'une seule";
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
	return aller_a(24 ,"Allez a Sophie-Germain, vos resultats sont affichés (ou pas en fait)");
    case 7:
	return tirer_carte(true);
    }
}

//cf avance: 8
function gare()
{
    var nom_case = document.getElementById("c" + pos_actuelle() + "_nom").innerHTML;
    var bouton_commande = "<input type=\"button\" value=\"Commander\" id=\"commande\"/>";
    var loyer = (joueurs[joueur_actuel].gares == 0) ? 2500 : (joueurs[joueur_actuel].gares) * 5000;
    document.getElementById("jeu").innerHTML = "<p><table><tr><th>" + nom_case + "</th></tr><tr><th>Prix</th><th>Loyer</th></tr><td>20.000</td><td>"+loyer+"</td><td>"+bouton_commande+"</td><tr></th></table></p>";
    bouton_commande = document.getElementById("commande");
    bouton_commande.addEventListener("click", function(X)
				     {
					 if(joueurs[joueur_actuel].capital < 20000)
					 {
					     alert("Pas assez d'argent");
					 }
					 else
					 {
					     joueurs[joueur_actuel].capital -= 20000;
					     cases[pos_actuelle()] = {"proprietaire": joueurs[joueur_actuel].nom, "prix": loyer, "id" : joueur_actuel};
					     if(joueurs[joueur_actuel].gares > 0)
					     {
						 joueurs[joueur_actuel].gares *= 2;
					     }
					     else
					     {
						 joueurs[joueur_actuel].gares = 1;
					     }
					     alert("Commande effectué");
					     passer();
					 }
				     }.bind(this, loyer), false);
    validation.innerHTML = "<input type=\"button\" id=\"validation\" value=\"Passer\"/>";
    var b_p = document.getElementById("validation");
    b_p.addEventListener("click", passer, false);
}

function examen_crous()
{
    validation.innerHTML = 
	"<input type=\"button\" id = \"choix_prison\" name = \"prison\" value = \"Aller au Script\"/>"
	+"<input type=\"button\" id = \"choix_payer\" name = \"payer\" value = \"Payer 10.000Fr\"/> ";
    if(pos_actuelle() == 4)
    {
	document.getElementById("jeu").innerHTML = "Examen : Vous avez le choix entre reviser à en avoir la chair a vif au Script ou payer 10.000 Fr";
    }
    else
    {
	document.getElementById("jeu").innerHTML = "Crous : la bourse ou le script c'est toi qui choisit";
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
	document.getElementById("jeu").innerHTML = "Case départ recevez 20.000 Fr";
	break;
    case 10:
	document.getElementById("jeu").innerHTML = "Simple Visite, c'est marrant de regarder les autres bosser quand on a rien a faire, hein ?";
	break;
    case 20:
	document.getElementById("jeu").innerHTML = "Case Parc, on peut se la couler douce";
	break;
    }
    validation.innerHTML = "<input type=\"button\" id=\"bouton_valider\" value = \"Passer\">";
    var v = document.getElementById("bouton_valider");
    v.addEventListener("click", passer, false);
}   

//cf caisse: 5; cf case 30
function aller_en_prison()
{
    var l = ["Java", "C", "Python", "PHP && co", "Ocaml"];
    var n = (0|(10*Math.random()))*100 + 100;
    var j = 0|(1 + Math.random() * 15);
    var r = l[0|Math.random() * l.length];
    document.getElementById("jeu").innerHTML = "Projet surprise: "+n+" lignes de "+r+" a écrire en "+j+" jour"+((j > 1 )? "s": "")+", par conséquent allez au script";
    validation.innerHTML = "<input type=\"button\" id=\"bouton_valider\" value = \"Aller au script\">"
    var go_script = document.getElementById("bouton_valider");
    joueurs[joueur_actuel].prison = true;
    joueurs[joueur_actuel].nb_prison = 0;
    go_script.addEventListener("click", passer, false);
}

function prison_des(num_des)
{
    var randy = 0|(Math.random()*12)+1;
    var rd1 = document.getElementById("d1");
    var rd2 = document.getElementById("d2");
    document.getElementById("span_d"+num_des).innerHTML = "<input type=\"button\" value=\""+randy+"\" id=\"d"+num_des+"\"/>"
    if((num_des == 1 && rd2.value != "d2") || (num_des == 2 && rd1.value != "d1"))
    {
	var li = document.getElementById("resultat_des");
	if((num_des == 1 && randy == rd2.value) || (num_des == 2 && randy == rd1.value))
	{
	    li.innerHTML = "Bravo !!! \n<input type=\"button\" id=\"b_s\" value=\"Sortir\">";
	    joueurs[joueur_actuel].position = 0;
	    joueurs[joueur_actuel].nb_prison = 0;
	    var s = document.getElementById("b_s");
	    joueurs[joueur_actuel].prison = false;
	    s.addEventListener("click", passer, false);
	}
	else
	{				
	    li.innerHTML = "<input type=\"button\" id=\"b_p\" value=\"Passer\"/>";
	    var passe = document.getElementById("b_p");
	    passe.addEventListener("click", passer,false);
	}
    }
}

function prison()
{
    joueurs[joueur_actuel].nb_prison += 1;
    if(joueurs[joueur_actuel].nb_prison == 4)
    {
	document.getElementById("jeu").innerHTML = "Cela fait maintenant 3 tours que vous etes en prison, vous pouvez maintenant sortir.<input type=\"button\" id=\"sortie_button\" value=\"Sortir de prison\">";
	var sort = document.getElementById("sortie_button");
	joueurs[joueur_actuel].prison = false;
	joueurs[joueur_actuel].position = 0;
	joueurs[joueur_actuel].nb_prison = 0;
	sort.addEventListener("click", passer, false);
    }
    else
    {
	validation.innerHTML = "";
	document.getElementById("jeu").innerHTML = "<p>Vous etes en prison ! pour sortir:</p><ul>"
	    + "<li>Payez 5.000 Fr<input type=\"button\" id=\"bouton_payer\" value=\"Payer\"></li>" 
	    + "<li>Faites un double aux dés<span id=\"span_d1\">"
	    + "<input type=\"button\" value=\"d1\" id=\"d1\"/></span>"
	    + "<span id=\"span_d2\"><input type=\"button\" value=\"d2\" id=\"d2\"/></span></li> "
	    + "<li id=\"resultat_des\"</li></ul></p>";
	var r_amende = document.getElementById("bouton_payer");
	r_amende.addEventListener("click", function()
				  {
				      if(joueurs[joueur_actuel].capital < 5000)
				      {
					  alert("pas assez d'argents");
				      }
				      else
				      {
					  joueurs[joueur_actuel].capital -= 5000;
					  joueurs[joueur_actuel].prison = false;
					  joueurs[joueur_actuel].position = 0;
					  joueurs[joueur_actuel].nb_prison = 0;
					  passer();
				      }
				  }, false);
	var rd1 = document.getElementById("d1");
	var rd2 = document.getElementById("d2");
	rd1.addEventListener("click", function(){ prison_des(1); }, false);
	rd2.addEventListener("click", function(){ prison_des(2); }, false);
    }
}

// cf achat
function achat_choix(x)
{
    switch(x)
    {
    case 0:
	return "terrain";
    case 1:
	return "une maison";
    case 2:
	return "deux maisons";
    case 3:
	return "trois maisons";
    case 4:
	return "quatre maisons";
    case 5:
	return "hotel";
    }
}

//cf  avancer
function achat()
{
    var loyer = parseInt(document.getElementById("c" + pos_actuelle() + "_prix").innerHTML.replace(".",""));
    var c = [];
    var commander = "";
    loyer = [0|(loyer * 0.15), 0|(loyer * 0.30), 0|(loyer * 0.50), 0|(loyer * 0.75), 0|(loyer), 0|(loyer * 1.3)];
    for(i = 0; i < 6; i++)
    {
	commander += "<tr><td>"+ achat_choix(i) +"</td><td>" + (0|(loyer[i] * (i+1))) + "</td><td>"+ loyer[i]+ "</td><td>"+ (0|((loyer[i]*0.1) * Math.log(loyer[i]))) +"</td><td><input type=\"button\" id=\"c"+(i+1)+"\" value=\"commander\" /></td></tr>";
    }
    document.getElementById("jeu").innerHTML = "<table id=\"tableau_achat\" border=\"1\">"
	+ "<caption><h1>" + document.getElementById("c" + pos_actuelle() + "_nom").innerHTML + "</h1></caption>"
	+ "<tr><th>Choix</th><th>Prix</th><th>Loyer</th><th> Hypotheque </th></tr>" + commander + "</table>";
    validation.innerHTML = "<input type=\"button\" id=\"passer\" value=\"Passer\"/>";
    detect_passe = document.getElementById("passer");
    detect_passe.addEventListener("click", passer, false);
    for(i = 1; i < 7; i++)
    {
	c[i-1] = document.getElementById("c" + i);
	c[i-1].addEventListener("click", function(l, p)
				{
				    if(joueurs[joueur_actuel].capital > p)
				    {
					joueurs[joueur_actuel].capital -= p ;
					cases[pos_actuelle()] = {"id":joueur_actuel, "proprietaire":joueurs[joueur_actuel].nom, "prix":l, "compagnie": false};
					alert("Achat effectué");
					passer();
				    }
				    else
				    {
					alert("pas assez d'argent " + p);
				    }
				    
				}.bind(this, loyer[i-1], 0|(loyer[i-1])* i), false);
    }
    return "";
}

function payer_loyer()
{
    if(cases[pos_actuelle()].id == joueur_actuel)
    {
	document.getElementById("jeu").innerHTML = "vous etes chez vous"
	validation.innerHTML = bouton_passer;
	detect_passe = document.getElementById("passer");
	detect_passe.addEventListener("click", passer, false);
	
    }
    else
    {
	document.getElementById("jeu").innerHTML = "<p>Bienvenue chez " + cases[pos_actuelle()].proprietaire + "</p><p><input type=\"button\" value=\"payer\" id=\"payer\"/></p>";
	if(pos_actuelle() % 5 == 0 && pos_actuelle() % 10 != 0)
	{
	    cases[pos_actuelle()].prix = joueurs[cases[pos_actuelle()].id].gares * 2500;
	}
	var p = document.getElementById("payer");
	p.addEventListener("click", function(casa)
			   {
			       
			       if(joueurs[joueur_actuel].capital > casa.prix)
			       {
				   joueurs[joueur_actuel].capital -= casa.prix;
				   joueurs[casa.id].capital += casa.prix;
				   passer();
			       }
			       else
			       {
				   need_money(casa.prix);
			       }
			       
			   }.bind(this, cases[pos_actuelle()]), false);
    }
}

//cf avance : 9
function compagnie_acheter()
{
    document.getElementById("jeu").innerHTML = "<h1>" + document.getElementById("c"+pos_actuelle()+"_nom").innerHTML + "</h1>" + "<p> <input type=\"button\"  id=\"bouton_acheter\" value=\"Acheter\"/></p>";
    validation.innerHTML = bouton_passer;
    
    var b_p = document.getElementById("bouton_passer");
    b_p.addEventListener("click", passer,false);
    
    var b_a = document.getElementById("bouton_acheter");
    b_a.addEventListener("click", function()
			  {
			     if(joueurs[joueur_actuel].capital > 15000)
			     {
				 cases[pos_actuelle()] = {"compagnie" : true, "nom": joueurs[joueur_actuel].nom, "id": joueur_actuel};
				 joueurs[joueur_actuel].compagnies += 1;
				 joueurs[joueur_actuel].capital -= 15000;
				 passer();
			     }
			     else
			     {
				 alert("pas assez d'argent");
			     }
			     
			 },false);
}


//quand on doit payer
function need_money(dette)
{
    if(joueurs[joueur_actuel].capital > dette)
    {
	joueurs[joueur_actuel].capital -= dette;
	passer();
    }
    else
    {
	alert("pas assez d'argent");
	validation.innerHTML = bouton_payer + " " + bouton_prison;
	var b_p = document.getElementById("bouton_payer");
	b_p.addEventListener("click", function(x)
			     {
				 need_money(x);
			     }.bind(this, dette), false);
	var b_s = document.getElementById("bouton_prison");
	b_s.addEventListener("click", function()
			     {
				 joueurs[joueur_actuel].prison = true;
				 passer();
			     }, false);
    }
}

//cf avance default /else
function compagnie_loyer()
{
    if(cases[pos_actuelle()].id == joueur_actuel)
    {
	document.getElementById("jeu").innerHTML = "Vous etes chez vous";
	validation.innerHTML = bouton_passer;
	var b_p = document.getElementById("bouton_passer");
	b_p.addEventListener("click", passer, false);
    }
    else
    {
	var dette = 
	    document.getElementById("jeu").innerHTML = des_actuel * ((joueurs[cases[pos_actuelle()].id].compagnies == 1) ? 4 : 10) * 100;
	jeu.innerHTML = "Vous etes chez la compagnie de " + cases[pos_actuelle()].nom + ", vous devez payer " + dette + ".";
	validation.innerHTML = "<input type=\"button\" id=\"bouton_loyer\" value=\"payer\"/>";
	b_l = document.getElementById("bouton_loyer");
	b_l.addEventListener("click", need_money.bind(this, dette), false);
    }
}

//cases du jeu
function avance()
{
    var c_p_a = cases[pos_actuelle()];
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
	examen_crous();
	break;
    case 4:
	tranquille();
	break;
    case 5:
	examen_crous();
	break;
    case 6:
	achat();
	break;
    case 7:
	aller_en_prison();
	break;
    case 8:
	gare();
	break;
    case 9:
	compagnie_acheter();
	break;
    default:
	if(c_p_a.compagnie == false)
	{
	    payer_loyer();
	}
	else
	{
	    compagnie_loyer();
	}
    }    
}

//condition d'arret et de continuité du jeu
function passer()
{
    //rafraichir_plateau();
    if(nb_joueurs == 1)
    {
	var winner = joueurs[(joueur_actuel + 1) % nb_joueurs] ;
	jeu.innerHTML = "<p>Fin de la partie !!! " + winner.nom + " a gagné !!!<p>";
	validation.innerHTML = "";
	info.innerHTML = "";
    }
    else
    {
	joueur_actuel = (joueur_actuel + 1) % nb_joueurs;
	//alert(joueur_actuel);
	jouer();
    }
}

function voir_proprietes()
{
    var str = "<table style=\"margin:auto;\">";
    var loyer = [];
    var k   = 0;
    for(i = 1; i < 40; i++)
    {
	if( typeof cases[i] == "object" && cases[i].id == joueur_actuel)
	{
	    var nom_case = document.getElementById("c"+i+"_nom").innerHTML;
	    loyer[k] = 0|( cases[i].prix * 0.1 * Math.log(cases[i].prix))
	    str += "<tr><td>"
		+ nom_case 
		+"</td><td>"
		+ loyer[k]
		+"<td><input type=\"button\" value=\"Hypothequer\" id=\"h"+(k)+"\"></td></tr>";
	    k++;
	}
    }
    if( k > 0)
    {
	document.getElementById("jeu").innerHTML = str + "</table>";
	var t = [];
	for(i = 0 ; i < k ; i++)
	{
	    t[i] = document.getElementById("h"+i);
	    t[i].addEventListener("click", function(x)
				  {
				      if(confirm("Etes vous sur d'hypothequer cette maison?"))
				      {
					  joueurs[joueur_actuel].capital += x;
					  cases[i] = 6;
				      }
				  }.bind(this, loyer[i]),false);
	}
    }
    else
    {
	document.getElementById("jeu").innerHTML = "Vous ne possedez aucuns titres de propriétés, clodo ! ";
    }
    validation.innerHTML = "<input type=\"button\" id=\"bouton_retour\" value=\"Retour au jeu\"/>";
    var b_v = document.getElementById("bouton_retour");
    b_v.addEventListener("click", avance, false);
}

function quitter_jeu()
{
    if(confirm("Etes vous sur de quitter le jeu?"))
    {
	// pour savoir si on doit donner les terrains a un joueur(vrai) ou a la banque(faux)
	var give = typeof cases[pos_actuelle()] == "object" && cases[pos_actuelle()].id != joueur_actuel;
	for(i = 1; i < 40; i++)
	{
	    if(i != pos_actuelle() && typeof cases[i] == "object")
 	    {
		if(give)
		{
		    aux.nom = cases[pos_actuelle()].nom;
		    aux.id = cases[pos_actuelle()].id;
		}
		else
		{
		    aux = 6;
		}
	    }
	}
	joueurs.unset(joueur_actuel);
	nb_joueurs--;
	joueur_actuel--;
	passer();
    }
}

//deplacement des joueurs
function jouer()
{
    info.innerHTML = "<ul id=\"barre_joueur\">" 
	+ "<li>" + joueurs[joueur_actuel].nom + "</il>" 
	+ "<li>" + joueurs[joueur_actuel].capital + "</li>" 
	+ "<li>" + bouton_proprio_view + "</li>" 
	+ "<li>" + bouton_quitter + "</li>"
	+ "</ul>";
    var proprio_view = document.getElementById("proprio_view");
    proprio_view.addEventListener("click", voir_proprietes, false);
    var q_jeu = document.getElementById("quitter_jeu");
    q_jeu.addEventListener("click", quitter_jeu, false);    // soit le joueur est en prison, soit il peut se deplacer sur le jeu
    if(joueurs[joueur_actuel].prison == true)
    {
	prison();
    }
    else
    {
	des_actuel = des();
	if(des_actuel + joueurs[joueur_actuel].position > 39)
	{
	    joueurs[joueur_actuel].capital += 20000; // bonus case depart
	}
	joueurs[joueur_actuel].position = (pos_actuelle() + des_actuel) % 40; // % nb de cases
	//alert(joueurs[joueur_actuel].position);
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
		joueurs[nb_joueurs] = {"nom":document.getElementById("j" + i).value,"capital": 150000,"position":0, "prison":false, "id":nb_joueurs, "dispence": false, "gares": 0, "compagnies" :0};
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

    // initialisation des cases du jeu
    cases[2 ] = cases[17] = cases[33] = 1;
    cases[4 ] = cases[38] = 3;
    cases[5 ] = cases[15] = cases[25] = cases[35] = 8;
    cases[7 ] = cases[22] = cases[36] = 2;
    cases[10] = cases[20] = cases[0] = 4;
    cases[12] = cases[28] = 9
    cases[30] = 7;
    for(i = 1; i < 40 ; i++)
    {
	if(cases[i] == undefined)
	{
	    cases[i] = 6;
	}
    }
    
    initialise();

}

monopoly();
