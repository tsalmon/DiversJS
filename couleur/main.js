var  c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var a = 0;
for(i = 0; i < 256; i+=1)
{
    for(j = 0; j < 256; j+=1)
    {
	var e = a.toString(16);
	while( e.length < 6)
	{
	    e = 0 + e;
	}
	ctx.fillStyle = "#" + e;
	ctx.fillRect(i, j, i+1, j+1);
	a = a + 16;
    }
}
alert("syntaxe correcte " + a.toString(16));