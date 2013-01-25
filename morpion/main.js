var tableau= [];
var i;

function CoupPC()
{
    
}

function CoupJoueur(x)
{
    if(x.innerHTML == "")	
    {
	x.innerHTML="X";
	CoupPC();
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