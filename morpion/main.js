var tableau= [];

function f(x)
{
    x.innerHTML = "a";
}

var i;
for(i = 1; i < 10; i++)
{
    tableau[i] = document.getElementById("case"+i);
    tableau[i].addEventListener("click",f,false);
}

alert("marche");