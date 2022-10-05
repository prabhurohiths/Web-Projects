console.log('hello world');




function updatedate()
{
    let date =new Date();
 
let months=["Jan" ,"Feb" ,"March" ,"April" , "May" ,"June" , "July", "August" , "Sept" ,"Oct" ,"Nov", "Dec"]
let month=months[date.getMonth()]
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day=days[date.getDay()]
var str=  day + "," +  date.getDate() + "-" + month + "-" +  date.getFullYear()
let element=document.getElementById('update')
element.innerHTML=str;

}
function updatetime()
{
    let date1= new Date();
    let currenthours= date1.getHours()
    let currentminutes = date1.getMinutes()
    let currentseconds= date1.getSeconds()
    let timeofDay = (currenthours<12)? "AM" : "PM"
    if( currenthours>12)
    currenthours= currenthours-12
    if( currenthours==0)
    currenthours= 12
    if(currenthours<10)
    currenthours='0' + currenthours
    if(currentminutes<10)
    currentminutes='0' + currentminutes
    if(currentseconds<10)
    currentseconds='0' + currentseconds
    var str1= currenthours + ":" + currentminutes + ":" + currentseconds + " " + timeofDay
   let element1= document.getElementById('time')
   element1.innerHTML=str1;
}


 
// onload="updatedate() ; updatetime() ; setInterval('updatedate()',1000) ;setInterval('updatetime()' ,1000)"