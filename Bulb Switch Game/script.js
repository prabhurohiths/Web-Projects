const work = () =>{
    let y = document.getElementById('title');
    for(i=1;i<6;i++){
       let x = document.getElementById('lightid'.concat(i));

       if(x.src.match('On')){
        x.src="./Images/Off.jpg";
        y.innerHTML = "LIGHT OFF";
        y.style.color = "Red";
       }
       else{
        x.src="./Images/On.jpg";
        y.innerHTML = "LIGHT ON";
        y.style.color = "Green";
    }
  }
}


