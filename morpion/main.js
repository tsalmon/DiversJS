var tableau= [];
var joueur = true;
var i;

function gagne(y)
{
    if(tableau[y].innerHTML != "")
    {
	var aux = tableau[y].innerHTML;
	if(aux == tableau[y+1].innerHTML && aux == tableau[y-1].innerHTML 
	   || aux == tableau[y+3] && aux == tableau[y-3] 
	   || aux == tableau[1].innerHTML && y == 5 && tableau[9].innerHTML
	   || aux == tableau[3].innerHTML && y == 5 && tableau[7].innerHTML
	  )
	{
	    if(joueur == false)
	    {
		alert("le joueur 1 a gagné");
	    }
	    else
	    {
		alert("le joueur 2 a gagné");
	    }
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