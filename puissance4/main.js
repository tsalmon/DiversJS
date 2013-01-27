var cases = document.getElementsByClassName("case");
var joueur = true;

function f(x)
{
    if(joueur == true)
    {
	cases[x].innerHTML= "<div class=\"cercle\"></div>";
	joueur = false;
    }
    else
    {
	cases[x].innerHTML= "<div class=\"cercle2\"></div>";
	joueur = true;
    }
}


for(i = 0; i  < cases.length; i++)
{
    cases[i].addEventListener("click", f.bind(this, i), false);
}

alert("syntaxe correcte");