var choix1;
var choix2;
var choix3;
var cote = 1500;
var adv = [[],[],[]];

function jouer(x)
{
   
}



function remplir_cote_case1()
{
    
    var cote1 = cote - Math.floor(Math.random()*300);
    while(cote1 < 0)
    {
	cote1 = Math.floor(cote - Math.random()*300);
    }
    adv[0][0] = cote1;
    document.getElementById("adv1_cote").innerHTML = cote1;
}

function remplir_cote_case2()
{
    var cote2 = Math.floor(cote + Math.random()*150 - Math.random()*150);
    while(cote2 < 0 || cote2 > 3000)
    {
	cote2 = Math.floor(cote + Math.random()*150 - Math.random()*150);
    }
    adv[1][0] = cote2;
    document.getElementById("adv2_cote").innerHTML = cote2;
}

function remplir_cote_case3()
{
    var cote3 = cote + Math.floor(Math.random()*300);
    while(cote3 > 3000)
    {
	cote3 = cote + Math.floor(Math.random()*300);
    } 
    adv[2][0] = cote3;
    document.getElementById("adv3_cote").innerHTML = cote3;
}

function remplir_cote()
{
    if(cote >= 100)
    {
	remplir_cote_case1();
    }
    else
    {
	adv[0][0] = Math.floor(Math.random()*100);
	document.getElementById("adv1_cote").innerHTML = adv[0][0];
    }
    if(cote <= 2900)
    {
	remplir_cote_case3();
    }
    else
    {
	adv[2][0] = 2900 + Math.floor(Math.random()*100);
	document.getElementById("adv3_cote").innerHTML = adv[2][0];
    }
    remplir_cote_case2();
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
    remplir_cote();
    remplir_proba();
}

choix1 = document.getElementById("adv1");
choix1.addEventListener("click", jouer.bind(this, 1),false);
choix2 = document.getElementById("adv2");
choix2.addEventListener("click", jouer.bind(this, 2),false);
choix3 = document.getElementById("adv3");
choix3.addEventListener("click", jouer.bind(this, 3),false);
remplir();
alert("syntaxe correcte");
