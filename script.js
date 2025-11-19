//tomb
const emberek = [];

//szerkesztes
let szID = null;

//DOM cache
const nevInput = document.getElementById("nev");
const korInput = document.getElementById("kor");
const poziInput = document.getElementById("pozicio");
const berInput = document.getElementById("ber");

// ------------- Fuggvenyek ------------

    //kiurit
    function kiurit(){
        nevInput.value = "";
        korInput.value = "";
        poziInput.value = "";
        berInput.value = "";

        nevInput.classList.remove("error");
        korInput.classList.remove("error");
        poziInput.classList.remove("error");
        berInput.classList.remove("error");

        nevInput.placeholder = "";
        korInput.placeholder = "";
        poziInput.placeholder = "";
        berInput.placeholder = "";

        szID = null;
    }

    //hiba
    function hibaEmber(input,message){
        input.value = "";
        input.classList.add("error");
        input.placeholder = message;
    }

    //Torles
    function torolEmber(id){
        const index = emberek.findIndex(function(ember){
            return ember.id === id;
        });
        if(index !== -1){
            emberek.splice(index,1);
            kiir();
        };
    }

    //Szerkesztes
    function szerkesztEmber(id){
        const kember = emberek.find(function(ember){
            return ember.id === id;
        });
        if(!kember){
            return;
        };

        nevInput.value = kember.nev;
        korInput.value = kember.kor;
        poziInput.value = kember.pozi;
        berInput.value = kember.ber;

        szID = id;
    }

    //kiiratas
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

            //torles gomb
            const torles = document.createElement("button");
            torles.textContent = "Törlés";

            torles.addEventListener("click", function(){
                torolEmber(ember.id);
            });
            td5.appendChild(torles);

            //szerkesztes
            const szerkesztes = document.createElement("button");
            szerkesztes.textContent = "Szerkesztés";

            szerkesztes.addEventListener("click", function(){
                szerkesztEmber(ember.id);
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

// ---Click---
document.getElementById("kuldes").addEventListener("click", function(){
    let nevVal = nevInput.value.trim();
    let korVal = Number(korInput.value);
    let poziVal = poziInput.value.trim();
    let berVal = Number(berInput.value);

    if(!nevVal){
        hibaEmber(nevInput,"Add meg a neved!");
        return;
    };
    if(isNaN(korVal) ||korVal < 18 || korVal > 70){
        hibaEmber(korInput,"min:18 - max:70");
        return;
    };
    if(!poziVal){
        hibaEmber(poziInput,"Add meg a pozíciót!");
        return;
    }
    if(isNaN(berVal) || berVal <= 0 || berVal > 10000000){
        hibaEmber(berInput,"Helytelen fizetési adatot adtál meg!");
        return;
    };

    if(szID === null){
        const ujEmber = {
            id: Date.now(),
            nev:nevVal,
            kor:korVal,
            pozi:poziVal,
            ber:berVal
        };
        emberek.push(ujEmber);
    }
    else{
        const index = emberek.findIndex(function(ember){
            return ember.id === szID;
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
