$(document).ready(function(){
	var canvas = document.getElementById('canvas1');
	var context = canvas.getContext('2d');
	var Method='free';
	var radius=10;
	var imgsel;
	var DrawOn = document.getElementById('DrawOn');
	var DrawOn_style = getComputedStyle(DrawOn);

	canvas.width = parseInt(DrawOn_style.getPropertyValue('width'));
	canvas.height = parseInt(DrawOn_style.getPropertyValue('height'));

	var temp_canvas = document.createElement('canvas');
	var temp_context = temp_canvas.getContext('2d');

	temp_canvas.id = 'temp_canvas';
	temp_canvas.width = canvas.width;
	temp_canvas.height = canvas.height;	
	temp_context.lineWidth=radius*2;
	DrawOn.appendChild(temp_canvas);

	var textarea = document.createElement('textarea');
	textarea.id='TextBoxs';
	DrawOn.appendChild(textarea);	

	var temp_context_text=document.createElement('div');
	temp_context_text.style.display='none';
	DrawOn.appendChild(temp_context_text);
		
	$('#DrawMethod div').on('click',function()
	{
		Method=$(this).attr('id');
		console.log(Method);
	})
	var mouse = {x: 0, y: 0};
	var mouseStart = {x: 0, y: 0};

	textarea.addEventListener('mouseup',function(e)
	{
		temp_canvas.removeEventListener('mousemove',TextCreate,false);
	},false);	

	temp_canvas.addEventListener('mousemove', function(e) 
	{
		mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
		mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
	}, false);
	
	temp_canvas.addEventListener('mousedown', function(e) 
	{
		mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
		mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
		
		mouseStart.x = mouse.x;
		mouseStart.y = mouse.y;
		
		if(Method=='free')
		{
			temp_canvas.addEventListener('mousemove', Draw, false);
			Draw();
		}
		if(Method=='circle')
		{
			temp_canvas.addEventListener('mousemove', Circle, false);
			Circle();
		}
		if(Method=='rect')
		{
			temp_canvas.addEventListener('mousemove', Rect, false);
			Rect();
		}
		if(Method=='octagon')
		{
			temp_canvas.addEventListener('mousemove',Octagon,false);
			Octagon();
		}
		if(Method=='line')
		{
			temp_canvas.addEventListener('mousemove', Line, false);
			Line();
		}
		if(Method=='text')
		{
			temp_canvas.addEventListener('mousemove', TextCreate, false);
		}
		if(Method=='eraser')
		{
			temp_canvas.addEventListener('mousemove',Erase,false);
			Erase();
		}
	}, false);

	temp_canvas.addEventListener('mouseup', function() 
	{	
		temp_canvas.removeEventListener('mousemove', Draw, false);
		temp_canvas.removeEventListener('mousemove', Circle, false);
		temp_canvas.removeEventListener('mousemove', Rect, false);
		temp_canvas.removeEventListener('mousemove', Octagon, false);
		temp_canvas.removeEventListener('mousemove', Line, false);
		temp_canvas.removeEventListener('mousemove',Erase,false);
		if (Method=='text')
		{
		temp_canvas.removeEventListener('mousemove', TextCreate, false);
			
			var line_width = textarea.value.split('\n'); 
			var lines_made =[];

			for (var i = 0; i < line_width.length; i++)
			{
				var characters=line_width[i].length;

				for(var k=0;k<characters;k++)
				{
					var text_sel=document.createTextNode(line_width[i][k]);
					temp_context_text.appendChild(text_sel);

					temp_context_text.style.position='absolute';
					temp_context_text.style.visibility='hidden';
					temp_context_text.style.display='block';

					var width=temp_context_text.offsetWidth;
					var height=temp_context_text.offsetHeight;

					temp_context_text.style.position='';
					temp_context_text.style.visibility='';
					temp_context_text.style.display='none';

					if(width>parseInt(textarea.style.width))
					{
						break;
					}
				}
				lines_made.push(temp_context_text.textContent);
				temp_context_text.innerHTML='';
			}
			var sel_font_size;
			var sel_font_family;
			var GetCompStyle=getComputedStyle(textarea);
			var GetFontSize=document.getElementById("font_size").value; 
			if(GetFontSize=='1')
			{
				sel_font_size='12px';
			}
			if(GetFontSize=='2')
			{
				sel_font_size='18px';
			}
			if (GetFontSize=='3')
			{
				sel_font_size='22px';
			}
			if (GetFontSize=='4')
			{
				sel_font_size='28px';
			}
			if (GetFontSize=='5')
			{
				sel_font_size='33px';
			}
			if (GetFontSize=='6')
			{
				sel_font_size='42px';
			}
			if (GetFontSize=='7')
			{
				sel_font_size='100px';
			}

			var GetFontFamily=document.getElementById("font_selector").value;
			if(GetFontFamily == '1')
			{
				sel_font_family='Calibri';
			}
			if(GetFontFamily == '2')
			{
				sel_font_family='Arial';
			}
			if(GetFontFamily == '3')
			{
				sel_font_family='Brush Script MT';
			}
			if(GetFontFamily == '4')
			{
				sel_font_family='Comic Sans MS';
			}
			if(GetFontFamily == '5')
			{
				sel_font_family='Courier New';
			}
			if(GetFontFamily == '6')
			{
				sel_font_family='Gigi';
			}
			temp_context_text.font= sel_font_size + ' ' + sel_font_family;
			temp_context_text.textBaseline= 'top';

			for (var j=0;j<lines_made.length;j++)
			{
				var newlinesmade=lines_made[j];
				temp_context.font = sel_font_size + ' ' + sel_font_family;  
				temp_context.fillText 
				(
					newlinesmade,
					parseInt(textarea.style.left),
					parseInt(textarea.style.top) + j*parseInt(GetFontSize)
				);
			}
		}
		context.drawImage(temp_canvas, 0, 0,canvas.width, canvas.height);
		temp_context.clearRect(0, 0, temp_canvas.width, temp_canvas.height);	
		temp_context.beginPath();
		context.beginPath();
		textarea.style.display='none';
		textarea.value='';

	}, false);

var Draw = function() 
{
temp_context.globalCompositeOperation="source-over";
temp_context.lineTo(mouse.x,mouse.y);
temp_context.stroke();
temp_context.beginPath();
temp_context.arc(mouse.x,mouse.y,radius,0,Math.PI*2);
temp_context.fill();
temp_context.beginPath();
temp_context.moveTo(mouse.x,mouse.y);
};

var Circle=function()
{
	temp_context.clearRect(0, 0, temp_canvas.width, temp_canvas.height);
	
	var x = (mouse.x + mouseStart.x) / 2;
	var y = (mouse.y + mouseStart.y) / 2;
	
	var radius = Math.max(
		Math.abs(mouse.x - mouseStart.x),
		Math.abs(mouse.y - mouseStart.y)
	) / 2;
	
	temp_context.beginPath();
	temp_context.arc(x, y, radius, 0, Math.PI*2, false);
	temp_context.fill();
	temp_context.closePath();
};
var Rect=function()
{

	temp_context.clearRect(0, 0, temp_canvas.width, temp_canvas.height);
	var x = Math.min(mouse.x, mouseStart.x);
	var y = Math.min(mouse.y, mouseStart.y);
	var width = Math.abs(mouse.x - mouseStart.x);
	var height = Math.abs(mouse.y - mouseStart.y);
	temp_context.fillRect(x, y, width, height);

};
var Octagon=function()
{
temp_context.clearRect(0,0,temp_canvas.width,temp_canvas.height);
var numberOfSides = 8,
        angle = 2 * Math.PI / numberOfSides, 
x = Math.min(mouse.x, mouseStart.x);
y = Math.min(mouse.y, mouseStart.y);
var width=Math.abs(mouse.x- mouseStart.x);
var height =Math.abs (mouse.y - mouseStart.y);
    temp_context.beginPath();
    temp_context.moveTo (x +  width, y +height/8);          
    for (var i = 1; i < numberOfSides; i++) {
        temp_context.lineTo(x + width* Math.cos(i * angle),  
        y + height * Math.sin(i * angle));
    }
    temp_context.closePath();          
    temp_context.lineWidth = radius*2;
    temp_context.fill();
};
var Line=function()
{
    temp_context.clearRect(0, 0, temp_canvas.width, temp_canvas.height);
    temp_context.beginPath();
    temp_context.moveTo(mouseStart.x, mouseStart.y);
    temp_context.lineTo(mouse.x, mouse.y);
    temp_context.stroke();
    temp_context.closePath();
};
var TextCreate=function()
{
    temp_context.clearRect(0, 0, temp_canvas.width, temp_canvas.height);
    
    var x = Math.min(mouse.x, mouseStart.x);
    var y = Math.min(mouse.y, mouseStart.y);

    var width = Math.abs(mouse.x - mouseStart.x);
    var height = Math.abs(mouse.y - mouseStart.y);
     
    textarea.style.left = x + 'px';
    textarea.style.top = y + 'px';
    textarea.style.width = width + 'px';
    textarea.style.height = height + 'px';
    textarea.style.display = 'block';
};
var Erase=function()
{
context.globalCompositeOperation='destination-out';
context.lineTo(mouse.x,mouse.y);
context.stroke();
context.beginPath();
context.arc(mouse.x,mouse.y,radius,0,Math.PI*2);
context.fill();
context.beginPath();
context.moveTo(mouse.x,mouse.y);
context.globalCompositeOperation='source-over';
};	 
var swatches = document.getElementsByClassName('swatch');
for(var i=0,n=swatches.length;i<n;i++)
{
	swatches[i].addEventListener('click',setSwatch);
}

window.setColour=function(colour)
{
	temp_context.fillStyle=colour;
	temp_context.strokeStyle=colour;
	var active=document.getElementsByClassName('active')[0];
	if (active)
	{
		active.className='swatch';
	}
}

function setSwatch(c)
{
	var swatch=c.target;
	setColour(swatch.style.color);
	swatch.className+=' active';
}

$('#SelectorDialog div a img').on('click',function()
	{
		imgsel=$(this).attr('id');
		console.log(imgsel);
		if (imgsel=='Img1')
		{
			var img1=document.getElementById("Img1");

			context.clearRect(0, 0, canvas.width, canvas.height);	
			context.drawImage(img1,0,0,canvas.width, canvas.height);

		}
		if (imgsel=='Img2')
		{
			var img2=document.getElementById("Img2");
			context.clearRect(0, 0, canvas.width, canvas.height);	
			context.drawImage(img2,0,0,canvas.width, canvas.height);

		}
		if (imgsel=='Img3')
		{
			var img3=document.getElementById("Img3");
			context.clearRect(0, 0, canvas.width, canvas.height);	
			context.drawImage(img3,0,0,canvas.width, canvas.height);

		}
		if (imgsel=='Img4')
		{
			var img4=document.getElementById("Img4");
			context.clearRect(0, 0, canvas.width, canvas.height);	
			context.drawImage(img4,0,0,canvas.width, canvas.height);
		}
		})

$('#URLButton').on('click',function()
	{
		imgsel=$(this).attr('id');
		console.log(imgsel);
		if (imgsel=='URLButton')
		{			
			var imageU = prompt("Enter the URL of the image");
			if (imageU!=null)
			{
				context.clearRect(0, 0, canvas.width, canvas.height);
				var Imagebyurl=new Image;
				Imagebyurl.src=imageU;
				Imagebyurl.onload=function()
				{
				context.drawImage(Imagebyurl,0,0,canvas.width, canvas.height);
				}
			}
			else
			{
				alert("Please add valid URL")
			}
		}
	})

var setRad = function(newRAD)
{
	if (newRAD<minRad)
		newRAD=minRad;
	else if (newRAD>maxRad)
		newRAD=maxRad;
		radius=newRAD;
		temp_context.lineWidth=radius*2;
		context.lineWidth=radius*2;
	radSpan.innerHTML=radius;
}

var minRad=5,
	maxRad=100,
	interval=5,
	defaultRad=10,
	radSpan=document.getElementById('radval')
	decRad=document.getElementById('decrad')
	incRad=document.getElementById('incrad')

decrad.addEventListener('click',function()
{
setRad(radius-interval);
})
incRad.addEventListener('click',function()
{
setRad(radius+interval);
})

setRad(defaultRad);
});