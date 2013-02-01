var choix1;
var choix2;
var choix3;
var cote = 1500;
var adv = [[],[],[]];
var parties = 0;

function vainqueur(x)
{
    var r = Math.random();
    return r > (adv[x][1]/10);
}

function p(x)
{
    return 1/(1+10^(-(cote-adv[x][0])/400));
}

function K()
{
    if(parties < 30)
    {
	return 30;
    }
    if(cote < 2400)
    {
	return 15;
    }
    return 10;
}

function W(v)
{
    return (v) ? 1 : -1;
}

function jouer(x)
{   
    var v = vainqueur(x);
    document.getElementById("resultat").innerHTML = (v) ? "Vous avez gagné!" : "Vous avez perdu!";
    cote = Math.floor(cote + K()*(W(v) - p(x)));
    if(cote > 3000)
    {
	cote = 3000;
    }
    document.getElementById("cote").innerHTML = cote;
    remplir();
    parties++;
}

function remplir_cote_case1()
{
    
    var cote1 = Math.floor(Math.random()*1500);
    adv[0][0] = cote1;
    document.getElementById("adv1_cote").innerHTML = cote1;
}

function remplir_cote_case2()
{
    var cote2 = Math.floor(Math.random()*1500+750);
    adv[1][0] = cote2;
    document.getElementById("adv2_cote").innerHTML = cote2;
}

function remplir_cote_case3()
{
    var cote3 = 1500 + Math.floor(Math.random()*1500);
    adv[2][0] = cote3;
    document.getElementById("adv3_cote").innerHTML = cote3;
}

function remplir_proba()
{
    for(i = 0; i < 3; i++)
    {
	adv[i][1] = Math.ceil(Math.random()*10);
	document.getElementById("adv"+(i+1)+"_proba").innerHTML = adv[i][1]+"/"+10;
    }
}

function remplir()
{
    remplir_cote_case1();
    remplir_cote_case3();
    remplir_cote_case2();
    remplir_proba();
}

choix1 = document.getElementById("adv1");
choix1.addEventListener("click", jouer.bind(this, 0),false);
choix2 = document.getElementById("adv2");
choix2.addEventListener("click", jouer.bind(this, 1),false);
choix3 = document.getElementById("adv3");
choix3.addEventListener("click", jouer.bind(this, 2),false);
remplir();
alert("syntaxe correcte");
