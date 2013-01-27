var cases = document.getElementsByClassName("case");
var joueur = true;

function estdanstable(x)
{
    return (x > 48 || x < 0);
}

function memecouleur(x,y)
{
    return (cases[y].innerHTML.search(cases[x].innerHTML) != -1)
}

function gagne(x)
{
    hd = true;
    hh = true;
    hg = true;
    d = true; 
    g = true;
    bg = true;
    gd = true;
    bb = true;
    for(i = 1; i < 4; i++)
    {
	if(hd == true && estdanstable(x-8*i) && memecouleur(x,x-8*i))
	{
	    hd = false;
	}
	if(hh == true && estdanstable(x-7*i) && memecouleur(x,x-7*i))
	{
	    hh = false;
	}
	if(hg == true && estdanstable(x-6*i) && memecouleur(x,x-6*i))
	{
	    hg = false;
	}
	if(d == true && estdanstable(x+i) && memecouleur(x,x+i))
	{
	    d = false;
	}
	if(g == true && estdanstable(x-i) && memecouleur(x,x-i))
	{
	    g = false;
	}
	if(bg == true && estdanstable(x+6*i) && memecouleur(x,x+6*i))
	{
	    bg = false;
	}
	if(gd == true && estdanstable(x+8*i) && memecouleur(x,x+8*i))
	{
	    gd = false;
	}
	if(bb == true && estdanstable(x+7*i) && memecouleur(x,x+7*i))
	{
	    alert(bb);
	    bb = false;
	}

    }
    alert(bb);
    return (hd | hh | hg | d | g | bg | gd | bb );
}

function f(x)
{
    if(cases[x].innerHTML != "&nbsp;")
    {
	return ;
    }
    
    while(x+7 < 49 && cases[x+7].innerHTML == "&nbsp;")
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
    if(gagne(x))
    {
	if(joueur == true)
	{
	    alert("Le joueur 1 a gagne")
	}
	else
	{
	    alert("Le joueur 2 a gagne");
	}
    }
}


for(i = 0; i  < cases.length; i++)
{
    cases[i].addEventListener("click", f.bind(this, i), false);
}

alert("syntaxe correcte");