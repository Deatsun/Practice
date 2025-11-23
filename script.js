//tomb
let emberek = [];

//szerkesztes mod
let sziD = null;

//DOM cache
const nevInpet = document.getElementById("nev");
const korInput = document.getElementById("kor");
const poziInput = document.getElementById("pozicio");
const berInput = document.getElementById("ber");



}

// fuggvenyek

//hiba
function hibaE(input,message){
    input.value = "";
    input.class.add("error");
    input.placeholder = message;
};

//kiurit
function kiurit(){
    nevInpet.value = "";
    korInput.value = "";
    poziInput.value = "";
    berInput.value = "";

    nevInpet.classList.remove("error");
    korInput.classList.remove("error");
    poziInput.classList.remove("error");
    berInput.classList.remove("error");

    nevInpet.placeholder = "";
    korInput.placeholder = "";
    poziInput.placeholder = "";
    berInput.placeholder = "";

    sziD = null;
};

//torles
function torolE(id){
    const index = emberek.findIndex(function(ember){
        return ember.id === id;
    });
    if(index !== -1){
        emberek.splice(index,1);
        kiir();
    };
};

//szerkesztes
function szerkesztE(id){
    const kember = emberek.find(function(ember){
        return ember.id === id;
    });
    if(!kember){
        return;
    };
    nevInpet.value = kember.nev;
    korInput.value = kember.kor;
    poziInput.value = kember.pozi;
    berInput.value = kember.ber;
    sziD = id;
    
};

//kiir
function kiir(){
    const torzs = document.getElementById("torzs");
    torzs.innerHTML = "";

    emberek.forEach(function(ember){
        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        const td5 = document.createElement("td");

        td1.textContent = ember.nev;
        td2.textContent = ember.kor;
        td3.textContent = ember.pozi;
        td4.textContent = ember.ber;

        //torles
        const torles = document.createElement("button");
        torles.textContent = "Törlés";

        torles.addEventListener("click",function(){
            torolE(ember.id);
        });
        td5.appendChild(torles);

        //szerkesztes
        const szerkesztes = document.createElement("button");
        szerkesztes.textContent = "Szerkesztes";

        szerkesztes.addEventListener("click",function(){
            szerkesztE(ember.id);
        });
        td5.appendChild(szerkesztes);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        torzs.appendChild(tr);
    });
};

//click
document.getElementById("kuldes").addEventListener("click",function(){
    let nevVal = nevInpet.value.trim();
    let korVal = Number(korInput.value.trim());
    let poziVal = poziInput.value.trim();
    let berVal = Number(berInput.value.trim());

    if(!nevVal){
        hibaE(nevInpet,"Add meg a neved!");
        return;
    };
    if(isNaN(korVal) || korVal < 18 ||korVal > 70){
        hibaE(korInput,"min:18 - max:70");
        return;
    };
    if(!poziVal){
        hibaE(poziInput,"Add meg a poziciot!");
        return;
    }
    if(isNaN(berVal) || berVal <= 0 || berVal > 10000000){
        hibaE(berInput,"Helytelen osszeget adtal meg!");
        return;
    };

    if(sziD === null){
        const ujEmber = {
            id:Date.now(),
            nev:nevVal,
            kor:korVal,
            pozi:poziVal,
            ber:berVal
        };
        emberek.push(ujEmber);
    }
    else{
        const index = emberek.findIndex(function(ember){
            return ember.id === sziD;
        });
        if(index !== -1){
            emberek[index].nev = nevVal;
            emberek[index].kor = korVal;
            emberek[index].pozi = poziVal;
            emberek[index].ber = berVal;
            
        };
    };
    kiir();
    kiurit();
});