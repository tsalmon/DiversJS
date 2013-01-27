var pina_colada = [ "rhum blanc", "jus ananas","creme de coco", "creme fraiche"];
var mot = pina_colada[Math.floor(Math.random()*pina_colada.length)];
var choix;
var pile = "";
var chaine =  "";

function f(x)
{
    if(x.keyCode == 13 && choix.value != "" && pile.search(choix.value) == -1)
    {
	pile+= choix.value;
	choix.value ="";
	chaine = "";
	for(i = 0; i < mot.length; i++)
	{
	    if(pile.search(mot.charAt(i)) == -1)
	    {
		chaine = chaine + "_";
	    }
	    else
	    {
		chaine = chaine + mot.charAt(i);
	    }
	}
	document.getElelementById("ecran").innerHTML = chaine;
	alert(chaine);
    }
}
for(i = 0; i < mot.length; i++)
{
    chaine += "_";
}

document.getElementById("ecran").innerHTML = chaine;

choix = document.getElementById("txt");
choix.addEventListener("keypress", f, false);

alert(mot);