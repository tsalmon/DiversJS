var cases_defaut = []; // {html: innerhtml , css: className}
var radio_defaut = document.getElementById("radio_defaut");
var radio_joueurs = document.getElementById("radio_joueurs");
var radio_proprietes = document.getElementById("radio_proprietes");

function rafraichir_plateau()
{
    if(radio_defaut.checked)
    {
	affichage_defaut();
    }
    else if(radio_joueurs.checked)
    {
	affichage_joueurs();
    }
    else 
    {
	affichage_proprietes();
    }
    jeu = document.getElementById("jeu");
}

//enleve la classe de background d'une case
function removeBG(x)
{
    var y = x;
    y = y.replace("violet", "");
    y = y.replace("bleu", "");
    y = y.replace("violet_claire", "");
    y = y.replace("rouge", "");
    y = y.replace("jaune", "");
    y = y.replace("orange", "");
    y = y.replace("vert", "");
    y = y.replace("bleu_fonce", "");
    y = y.replace("caisse", "");
    return y;
}

function couleur_joueur(x)
{
    switch(x)
    {
    case 1:
	return "bleu";
    case 2:
	return "rouge";
    case 3:
	return "vert";
    case 4:
	return "jaune";
    case 5:
	return "cyan";
    case 6:
	return "violet";
    }
}

function affichage_defaut()
{
    for(i = 0; i < 40; i++)
    {
	document.getElementById("c" + i).innerHTML = cases_defaut[i].html;
	document.getElementById("c" + i).className = cases_defaut[i].css;
    }
}

function affichage_joueurs()
{
    for(i = 0; i < 40; i++)
    {
	var aux = "";
	for(j = 0; j < 6; j++)
	{
	    if(joueurs[j].position == i)
	    {
		aux += "<span class=\"config_joueur "+ couleur_joueur(j) +"\">&nbsp;</span>";
	    }
	}
	document.getElementById("c" + i).className = removeBG(cases_defaut[i].css);
	document.getElementById("c" + i).innerHTML = aux ;
    }
    
}

function affichage_proprietes()
{
    for(i = 0; i < 40; i++)
    {
	
    }
}

for(i = 0; i < 40; i++)
{
    cases_defaut[i] = {"html":document.getElementById("c"+i).innerHTML, "css": document.getElementById("c" + i).className };
}


radio_defaut.addEventListener("click", affichage_defaut, false);
radio_joueurs.addEventListener("click", affichage_joueurs,false);
radio_proprietes.addEventListener("click", affichage_proprietes, false);