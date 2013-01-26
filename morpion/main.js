var tableau= [];
var joueur = true;
var i;
var choix1;
var choix2;

function gagne(y)
{
    if( tableau[1].innerHTML != "" && (tableau[1].innerHTML == tableau[2].innerHTML && tableau[1].innerHTML == tableau[3].innerHTML ) ||
	tableau[4].innerHTML != "" && (tableau[4].innerHTML == tableau[5].innerHTML && tableau[4].innerHTML == tableau[6].innerHTML ) ||
	tableau[7].innerHTML != "" && (tableau[7].innerHTML == tableau[8].innerHTML && tableau[7].innerHTML == tableau[9].innerHTML ) ||
	tableau[1].innerHTML != "" && (tableau[1].innerHTML == tableau[4].innerHTML && tableau[1].innerHTML == tableau[7].innerHTML ) ||
	tableau[2].innerHTML != "" && (tableau[2].innerHTML == tableau[5].innerHTML && tableau[2].innerHTML == tableau[8].innerHTML ) ||
	tableau[3].innerHTML != "" && (tableau[3].innerHTML == tableau[6].innerHTML && tableau[3].innerHTML == tableau[9].innerHTML ) ||
	tableau[1].innerHTML != "" && (tableau[1].innerHTML == tableau[5].innerHTML && tableau[5].innerHTML == tableau[9].innerHTML ) ||
	tableau[5].innerHTML != "" && (tableau[3].innerHTML == tableau[5].innerHTML && tableau[3].innerHTML == tableau[7].innerHTML ) 
      )
    {
	if(joueur == false)
	{
	    alert("le joueur 1 gagne");
	}
	else
	{
	    alert("le joueur 2 gagne");
	}
	for(i = 1;i < 10; i++)
	{
	    document.getElementById("case"+i).innerHTML = "";
	}
    }
}

function CoupJoueur(x,y)
{
    if(x.innerHTML == "")	
    {
	if(joueur == true)
	{
	    x.innerHTML = "X";
	    joueur = false;
	}
	else
	{
	    x.innerHTML = "O";
	    joueur = true;
	}
	gagne(y);
    }
}

function f(x)
{
    document.getElementById("choixdujeu").style.display = "none";
    if(x == true)
    {
	document.getElementById("jeu").style.display = "block";
    }
    else
    {
	document.getElementById("construction").style.display = "block";
    }
}

for(i = 1; i < 10; i++)
{
    tableau[i] = document.getElementById("case"+i);
    tableau[i].addEventListener("click",CoupJoueur.bind(this, tableau[i],i),false);
}

choix1 = document.getElementById("choix1");
choix2 = document.getElementById("choix2");
choix1.addEventListener("click", f.bind(this, true), false);
choix2.addEventListener("click", f.bind(this, false), false);

alert("syntaxe correcte");