
/////////////////////////////////////////video-middle.js/////////////////////////////////////////
//console.log(settingsGlobal)




for ( category of m3u8.category){
	div = document.createElement('div')
	div.setAttribute("class", "cat");
	div.setAttribute("onclick", "showCat('"+category+"')");
	div.innerText = category;
	document.querySelector('#category').appendChild(div);
}




function showCat(check) {
  document.querySelector('#list').innerHTML = ``
  html = ``;
  //check = e.innerText;
  time = Math.floor(Date.now() / 1000);
  for (const [key, value] of Object.entries(m3u8.channels)) {
    if (value.category == check) {
		circle = ``;
		ico  = ``;
		if (value.rec > 0) circle = ` <div class="circle" ></div>`
		if (value.ico !== undefined ) ico = ` <img src="${value.ico}"> `
			 
	    all = ''
        all+='<div class="parent2">'
		title = value.title;
        all += ` <div class="headCh">
                  <div class="img">
                    ${ico}
                  </div>
                  <div class="title">
				   ${title}
				   ${circle}
				  </div>
				  <div class="tv" onclick="tv('${value.url}','${value.ico}','${value.title}')">
				   <span class="material-icons icons">
                     smart_display
                    </span>
				  </div>
                </div>
                <div class="progs" >`
      if (value.prog !== undefined) {
        
		arpr = [];
        arpr2 = [];
        //console.log(value.prog)
        for (prog of value.prog) {
          if (prog.start < time && time < prog.stop) {
            startTime = timestampToDate(prog.start)
			percent = Math.round((time - prog.start) * 100 / (prog.stop - prog.start)) 
			timeLeft = Math.round((prog.stop - Date.now() / 1000) / 60);			
			arpr.push(` 
			<div class="pr playing">
                  <div class="time">${startTime}</div>
                  <div class="info">${prog.title}</div>  
				  <div class="progressBlock">
				     <div class="timeLeft"> +${timeLeft}</div>
                     <div class="progressLine">
                        <div style="width: ${percent}%;" class="progress"></div>
                     </div>
                  </div>			 
               </div>
               
			  `)
            // console.log(prog.title + ' is live ' + startTime + '  '+percent)
          } else if (prog.start > time && time < prog.stop) {      
            startTime = timestampToDate(prog.start)
            arpr.push(` 
            <div class="pr">
                  <div class="time">${startTime}</div>
                  <div class="info">${prog.title}</div>  
            </div>
              `)
            //console.log(prog.title + ' is future ' + startTime)
          } else {
            startTime = timestampToDate(prog.start)
            //console.log(prog.title + ' is rec ' + startTime)
            arpr2.push(` 
            <div class="pr rec">
                  <div class="time">${startTime}</div>
                  <div class="info"> ${prog.title}</div>    
            </div>
              `)

          }
        } 
		if (arpr == 0) arpr.push(arpr2.pop()) ;
        str = arpr.slice(0, 7).join("\n");		
        
      }else{
		  str = ` 
            <div class="pr rec">
                  <div class="time">00 00 </div>
                  <div class="info">Нет программы</div>    
            </div>
              `
	  }
	    all+= str;
        all+=`</div>
               </div>`
        html+=all;
    }
  }
  
  document.querySelector('#list').innerHTML = html;
}

function timestampToDate(timestamp) {
    var date = new Date(timestamp * 1000);
    return   date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

