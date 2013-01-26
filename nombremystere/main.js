var choix;
var min = 0;
var max = 100;
var mystere = Math.floor((Math.random()*max)+min);

function f(x)
{
    if(x.keyCode == 13)
    {
	var donnee = parseInt(choix.value);
	if(donnee == mystere)
	{
	    alert("gagne");
	}
	else if(donnee > mystere)
	{
	    alert("c'est plus petit");
	    if(max > donnee)
	    {
		document.getElementById("nb2").innerHTML = donnee;
		max = donnee;
	    }
	}
	else
	{
	    alert("c'est plus grand");
	    if(min < donnee)
	    {
		document.getElementById("nb1").innerHTML = donnee;
		min = donnee;
	    }
	}
	document.getElementById("nb").value= "";
    }
}

choix = document.getElementById("nb")
choix.addEventListener("keypress", f, false);

alert("syntaxe correcte");