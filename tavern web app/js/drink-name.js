
function drinkGen() {
		rnd = Math.floor(Math.random() * nm1.length);
		rnd2 = Math.floor(Math.random() * nm2.length);
		rnd3 = Math.floor(Math.random() * nm3.length);
		if(rnd2 < 6){
			while(rnd3 > 3){
				rnd3 = Math.floor(Math.random() * nm3.length);
			}
		}
		var name = nm1[rnd] + " " + nm2[rnd2] + " " + nm3[rnd3];
		document.getElementById('drink-name').value = name;
}