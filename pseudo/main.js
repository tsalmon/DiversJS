var appui;
var syl_con = [ 'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', "qu", 'r', 's', 't', 'v', 'w', 'x', 'z', "bh", "ch", "dh", "gh", "jh", "kh", "rh", "th", "wh","zh","ck", "gu", "st", "nt", "nb", "cc", "tt", "ff", "mm", "pp", "mm", "ss", "zz", "dd"];
var syl_voy = [ 'a', 'e', 'i', 'o', 'u', 'y', "ai", "au", "ay", "ei", "ey", "io", "ya", "ye", "yi", "yo", "yu", "eau", "oei"];

function consonne(longueur)
{
    if(longueur == 0)
    {
	return "";
    }
    return syl_con[Math.floor(Math.random() * syl_con.length)] + voyelle(longueur -1);
}

function voyelle(longueur)
{
    if(longueur == 0)
    {
	return "";
    }
    return syl_voy[Math.floor(Math.random() * syl_voy.length)] + consonne(longueur -1);
}

function generer(x)
{
    var longueur = Math.floor(Math.random()*5+1);
    document.getElementById("resultat").innerHTML = (Math.random() > 0.5) ? voyelle(Math.floor(Math.random()*6)+1) : consonne(Math.floor(Math.random()*6)+2);
}

appui = document.getElementById("genere");
appui.addEventListener("click", generer, false);

alert("Syntaxe correcte");