var pina_colada = [ "rhum blanc", "jus ananas","creme de coco", "creme fraiche"];
var mot = pina_colada[Math.floor(Math.random()*pina_colada.length)];
var choix;
var chaine =  "";

function f(x)
{
    if(x.keyCode == 13)
    {
	for(i = 0; i < mot.length; i++)
	{
	}
    }  
}

chaine = "";
for(i = 0; i < mot.length; i++)
{
    chaine += "_";
}

document.getElementById("ecran").innerHTML = chaine;

choix = document.getElementById("txt");
choix.addEventListener("keypress", f, false);

//alert("syntaxe correcte");