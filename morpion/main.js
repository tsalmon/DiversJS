var tableau= [];
var joueur = true;
var i;

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

for(i = 1; i < 10; i++)
{
    tableau[i] = document.getElementById("case"+i);
    tableau[i].addEventListener("click",CoupJoueur.bind(this, tableau[i],i),false);
} 
document.write("
    <table>
<tr>
<td id=\"case1\" ></td>
<td id=\"case2\" ></td>
<td id=\"case3\" ></td>
</tr>
<tr>
<td id=\"case4\"></td>
<td id=\"case5\"></td>
<td id=\"case6\"></td>
</tr>
<tr>
<td id=\"case7\"></td>
<td id=\"case8\"></td>
<td id=\"case9\"></td>
</tr></table>
");
alert("syntaxe correcte");

/*
1 2 3
4 5 6 
7 8 9
*/