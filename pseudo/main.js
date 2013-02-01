var appui;

function consonne(longueur, lettre)
{
    if(longueur == 0)
    {
	return "";
    }
    switch(lettre)
    {
    case 'a':
	alert("a");
	break;
    case 'e':
	alert("e");
	break;
    case 'i':

	break;
    case 'o':
	break;
    case 'u':
	break;
    case 'y'
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