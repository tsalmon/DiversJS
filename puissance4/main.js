var cases = document.getElementsByClassName("case");
var joueur = true;

function descendre(x)
{
    
}

function f(x)
{
    if(cases[x].innerHTML != "&nbsp;")
    {
	return ;
    }
    
    while(x+7 < 48 && cases[x+7].innerHTML == "&nbsp;")
    {
	x+=7;
    } 
    
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
    descendre(x);
}


for(i = 0; i  < cases.length; i++)
{
    cases[i].addEventListener("click", f.bind(this, i), false);
}

alert("syntaxe correcte");