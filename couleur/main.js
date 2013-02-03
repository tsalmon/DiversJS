function f(canvas,inc)
{
    var  c = document.getElementById(canvas);
    var ctx = c.getContext("2d");
    var a = 0;
    for(i = 0; i < 256; i++)
    {
	for(j = 0; j < 256; j++)
	{
	    var e = a.toString(16);
	    while(e.length < 6)
	    {
		e = 0 + e;
	    }
	    ctx.fillStyle = "#" + e;
	    ctx.fillRect(i, j, i+1, j+1);
	    a = a + inc;
	}
    }
    alert(a.toString(16)+ "\t" + a);
}

f("myCanvas",1);
f("myCanvas1",256);
