//tomb letrehozasa
const emberek = [];

//szerkesztes mod vagy objektum hozzaadasa
let szID = null;

//DOM cache
const nevInput = document.getElementById("nev");
const korInput = document.getElementById("kor");
const poziInput = document.getElementById("pozicio");
const berInput = document.getElementById("ber");

// fuggvenyek -------------

    //-input kiuritese
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

    //-Hiba
    function hibaE(input,message){
        input.value = "";
        input.classList.add("error");
        input.placeholder = message;
    }

    //-Torles
    function torolE(id){
        const i = emberek.findIndex(function(e){
            return e.id === id;
        });
        if(i !== -1){
            emberek.splice(i,1);
            kiir();
        };
    }

    //-Szerkesztes
    function szerkesztE(id){
        const kember = emberek.find(function(e){
            return id === e.id;
        });
        if(!kember){
            return;
        }
        nevInput.value = kember.nev;
        korInput.value = kember.kor;
        poziInput.value = kember.pozi;
        berInput.value = kember.ber;

        szID = id;
    };

    //-kiiratas
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
                torolE(ember.id);
            });
            td5.appendChild(torles);

            //szerkesztes gomb
            const szerkesztes = document.createElement("button");
            szerkesztes.textContent = "Szerkesztés";

            szerkesztes.addEventListener("click", function(){
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

    // click esemeny
    document.getElementById("kuldes").addEventListener("click", function(){

        let nevVal = nevInput.value.trim();
        let korVal = Number(korInput.value.trim());
        let poziVal = poziInput.value.trim();
        let berVal = Number(berInput.value.trim());

        if(!nevVal){
            hibaE(nevInput,"Add meg a neved!");
            return;
        };
        if(isNaN(korVal) ||korVal < 18 || korVal > 70){
            hibaE(korInput,"min:18 - max:70!");
            return;
        };
        if(!poziVal){
            hibaE(poziInput,"Add meg a pozíciót!");
            return;
        };
        if(isNaN(berVal) || berVal <= 0 || berVal > 10000000){
            hibaE(berInput,"Helytelen összeget adtál meg!")
            return;
        };

        if(szID === null){
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
            const i = emberek.findIndex(function(e){
                return e.id === szID;
            });
            if(i !== -1){
                emberek[i].nev = nevVal;
                emberek[i].kor = korVal;
                emberek[i].pozi = poziVal;
                emberek[i].ber = berVal;
            };
        };
        kiir();
        kiurit();
    });

