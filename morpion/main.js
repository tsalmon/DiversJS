var tableau= [];
var joueur = true;
var i;

function CoupJoueur(x)
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
    }
}

for(i = 1; i < 10; i++)
{
    tableau[i] = document.getElementById("case"+i);
    tableau[i].addEventListener("click",CoupJoueur.bind(this, tableau[i]),false);
} 

alert("syntaxe correcte");
/*
1 2 3
4 5 6 
7 8 9
*/