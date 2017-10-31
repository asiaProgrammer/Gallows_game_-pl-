var catchword = "Do it today or regret it tomorrow";
catchword = catchword.toUpperCase();

var length = catchword.length; 

let ile_skuch = 0;

const yes = new Audio("yes.wav");
const no = new Audio("no.wav");

var catchword1 = "";

for (i = 0; i < length; i++)
{
	if (catchword.charAt(i)==" ") 
		catchword1 = catchword1 + " ";
	else
		catchword1 = catchword1 + "-";
}

function wypisz_haslo()
{
	document.getElementById("board").innerHTML = catchword1;
}

window.onload = start;

var letters = ["A", "Ą", "B", "C", "Ć","D", "E",
				"Ę", "F", "G", "H","I", "J","K",
				"L", "Ł","M", "N", "Ń", "O", "Ó", 
				"P", "Q", "R", "S", "Ś", "T", "U",
				"V","W", "X","Y", "Z", "Ż", "Ź"];

function start()
{

	var content = "";

	for(i=0; i<=34; i++)
	{
		var element = "let" + i;
		content = content + '<div class="letter" onclick="check('+i+')" id="'+element+'">'+ letters[i] +'</div>';
		if( (i+1) % 7 == 0) content = content + '<div style="clear:both;"></div>'
	}

	document.getElementById("alphabet").innerHTML = content;

	wypisz_haslo();
}

String.prototype.ustawZnak = function(miejsce, znak)
{
	if (miejsce > this.length - 1)
		return this.toString();
	else 
		return this.substr(0, miejsce) + znak + this.substr(miejsce+1);
}

function check(nr)
{

	var trafiona = false;

	for(i=0; i<length; i++)
	{
		if (catchword.charAt(i) == letters[nr])
		{
			catchword1 = catchword1.ustawZnak(i,letters[nr]);
			trafiona =true;
		}
	}

	if(trafiona == true)
	{
		yes.play();
		var element = "let" + nr;
		document.getElementById(element).style.background = "#030";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00c000";
		document.getElementById(element).style.cursor = "default";

		wypisz_haslo();
	}
	else
	{
		no.play();
		var element = "let" + nr;
		document.getElementById(element).style.background = "#300";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #c00000";
		document.getElementById(element).style.cursor = "default";
		document.getElementById(element).setAttribute("onclick",";");

		//skucha
		ile_skuch++;
		var obraz = "img/s"+ ile_skuch + ".jpg";
		document.getElementById("gallows").innerHTML = '<img src="'+obraz+'" alt="" />';
	}

	//wygrana
	if(catchword == catchword1)
		document.getElementById("alphabet").innerHTML = "Tak jest! Podano prawidłowe hasło: " + catchword 
		+ '<br /><br /><span class="reset" onclick="location.reload();">JESZCZE RAZ?</span>';

	//przegrana
	if (ile_skuch >= 9)
		document.getElementById("alphabet").innerHTML = "Przegrana!" +'<br /><br /><span class="reset" onclick="location.reload();">CHCESZ SPRÓBOWAĆ SWOICH SIŁ JESZCZE RAZ?</span>';

}
