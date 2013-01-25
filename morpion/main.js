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

document.getElementById("jeu").innerHTML = "<div><a id=\"choix1\" href=\"\">Jouer contre l'ordi</a><a id=\"choix2\" href=\"\">2 Joueurs</a></div>";

choix1.addEventListener("click",,false);
choix2.addEventListener("click",function(){document.getElementById("jeu").innerHTML = "<table><tr><td id=\"case1\" ></td><td id=\"case2\" ></td><td id=\"case3\" ></td></tr><tr><td id=\"case4\"></td><td id=\"case5\"></t><td id=\"case6\"></td></tr><tr><td id=\"case7\"></td><td id=\"case8\"></td><td id=\"case9\"></td></tr></table>"}, false);

for(i = 1; i < 10; i++)
{
    tableau[i] = document.getElementById("case"+i);
    tableau[i].addEventListener("click",CoupJoueur.bind(this, tableau[i],i),false);
} 
alert("syntaxe correcte");
/*
1 2 3
4 5 6 
7 8 9
*/