var appui;
var syl_con = [ 'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', "qu", 'r', 's', 't', 'v', 'w', 'x', 'z', "bh", "ch", "dh", "gh", "jh", "kh", "rh", "th", "wh","zh","ck", "cc", "gu", "st", "nt", "nb"];
var syl_voy = [ 'a', 'e', 'i', 'o', 'u', 'y', "ai", "au", "ay", "ei", "ey", "io", "ya", "ye", "yi", "yo", "yu", "eau", "oei"];

function consonne(longueur)
{
    if(longueur == 0)
    {
	return "";
    }
    return syl_con[Math.floor(Math.random() * syl_con.length] + voyelle;
}

function voyelle(longueur)
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
	return lettre + consonne(longueur - 1); 
    }
    else
    {
	return lettre + voyelle(longueur -1); 
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