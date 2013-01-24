var tableau= [];
var i;

function CoupJoueur(x)
{
    x.innerHTML="X";
}

for(i = 1; i < 10; i++)
{
    tableau[i] = document.getElementById("case"+i);
    tableau[i].addEventListener("click",CoupJoueur.bind(this, tableau[i]),false);
} 