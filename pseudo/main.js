var appui;

function consonne(longueur, lettre)
{
    if(longueur == 0)
    {
	return "";
    }
    switch(lettre.charCodeAt(0))
    {
    case 97:
	
	break;
    case 101:

	break;
    case 105:

	break;
    case 111:

	break;
    case 117:

	break;
    case 121:

	break;
    }
    return "";
}

function voyelle(longueur, lettre)
{
    if(longueur == 0)
    {
	return "";
    }
    return "";
}

function f(lettre, longueur)
{
    var x = lettre;
    if(x == 'a' || x == 'e' || x == 'i' || x == 'o' || x == 'u' || x == 'y')
    {
	return lettre + consonne(longueur - 1, lettre); 
    }
    else
    {
	return lettre + voyelle(longueur -1, lettre); 
    }
}

function generer(x)
{
    var longueur = Math.floor(Math.random()*5+1);
    alert(f(String.fromCharCode(Math.ceil(Math.random()*25)+97)));
}

appui = document.getElementById("genere");
appui.addEventListener("click", generer, false);

alert("Syntaxe correcte");