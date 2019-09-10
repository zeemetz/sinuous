//global variable
var canvas, context;
var redDot = new Array(); 
var redDotCount;

var currX, currY;

var score=0;

var isLose = false;

// Define
var screenHeight = 1024;
var screenWidth = 728;

var width = document.width;
var height = document.height;

//utility function
function log(string)
{
	console.log(string);
}

function clearScreen()
{
	canvas.width = canvas.width;
}

// on ready
document.onreadystatechange = function()
{
	if(document.readyState == "complete")
	{
		document.getElementById('screen').style.cursor = 'none';
		main();
	}
}

//Sinuous Function

function drawDot(x,y,r,color)
{
	// var cat = new Image();
	// cat.src = "asset/meteor.png";
	// cat.onload = function() 
	// {
	// 	context.drawImage(cat, x, y, r, r);
	// };
	context.fillStyle=color;
	context.beginPath();
	context.arc(x, y, r, Math.PI*2, false);
	context.closePath();
	context.fill();
}

function drawScore()
{
	context.fillStyle="white";
	context.font = "bold 10px sans-serif";
	context.fillText(score, 10, 10);
}

function rand(limit)
{
	return Math.ceil(Math.random()*limit);
}

function attachDot()
{
	for( var i = 0 ; i < 10 ; i ++ )
	{
		if(redDotCount%3==0)
			redDot[redDotCount+i] = {"x" : screenWidth, "y" : rand(screenHeight) , "r" : rand(2)};
		else
			redDot[redDotCount+i] = {"x" : rand(screenWidth), "y" : 0 , "r" : rand(2)};
	}
	redDotCount+=10;
}

function init()
{
	redDotCount = 100;
	for( var i = 0 ; i < redDotCount ; i ++ )
		redDot[i] = {"x" : rand(screenWidth), "y" : rand(screenHeight) , "r" : rand(2)};
}

function detachDot(index)
{
	if(index%3==0)
		redDot[index] = {"x" : screenWidth, "y" : rand(screenHeight) , "r" : rand(2)};
	else
		redDot[index] = {"x" : rand(screenWidth), "y" : 0 , "r" : rand(2)};
}

function isCollideWithRedDot(x1,y1,r1)
{
	for(var i in redDot)
	{
		// circle-circle collition detection (x2-x1)^2 + (y1-y2)^2 <= (r1+r2)^2
		x2 = redDot[i].x;
		y2 = redDot[i].y;
		r2 = redDot[i].r;

		if( (x2-x1)*(x2-x1) + (y1-y2)*(y1-y2) < (r1+r2)*(r1+r2) )
			return true;
	}
}

function loop()
{
	if(isLose)
		return;

	log(redDotCount);
	clearScreen();
	
	for(var i in redDot)
	{
		drawDot(redDot[i].x, redDot[i].y, redDot[i].r, "red");
		redDot[i].x--;
		redDot[i].y++;

		if(redDot[i].x<0 || redDot[i].y>screenHeight)
		{
			detachDot(i);
		}
	}

	drawDot(currX,currY,2,"green");
	isLose = isCollideWithRedDot(currX,currY,2);
	drawScore();
}

document.onmousemove = function(e)
{
	currX = Math.floor(e.x);
	currY = Math.floor(e.y);
	score++;
}


// main function
function main()
{
	if(document.readyState == "complete")
	{

		canvas = document.getElementById("screen");
		context = canvas.getContext("2d");

		init();
		window.setInterval(loop,40);
		window.setInterval(attachDot,5000);
	}
}

