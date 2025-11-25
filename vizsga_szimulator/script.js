//tomb letrehozasa az adatok tarasolasahoz
const hirdetesek = [];

//Szerkesztes mod
let szID = null;

//DOM cache
const poziInput = document.getElementById("pozi");
const cegInput = document.getElementById("ceg");
const fizuInput = document.getElementById("fizu");
const helyInput = document.getElementById("hely");

//Fuggvenyek



    //-Kiurites
    function kiurit(){
        poziInput.value = "";
        cegInput.value = "";
        fizuInput.value = "";
        helyInput.value = "";

        poziInput.classList.remove("error");
        cegInput.classList.remove("error");
        fizuInput.classList.remove("error");
        helyInput.classList.remove("error");

        poziInput.placeholder = "";
        cegInput.placeholder = "";
        fizuInput.placeholder = "";
        helyInput.placeholder = "";

        szID = null;
    }

    //-Hiba eseten
    function hibaHirdertes(input,message){
        input.value = "";
        input.classList.add("error");
        input.placeholder = message;
    }

    //-Torles
    function torolHirdetes(id){
        const index = hirdetesek.findIndex(function(hirdetes){
            return hirdetes.id === id;
        });
        if(index !== -1){
            hirdetesek.splice(index,1);
            kiir();
        };
    };

    //-Szerkesztes
    function szerkesztHirdetes(id){
        const khirdetes = hirdetesek.find(function(hirdetes){
            return hirdetes.id === id;
        })
        if(!khirdetes){
            return;
        }
        poziInput.value = khirdetes.pozi;
        cegInput.value = khirdetes.ceg;
        fizuInput.value = khirdetes.fizu;
        helyInput.value = khirdetes.hely;

        szID = id;
    }

    //kiiratas
    function kiir(){
        const torzs = document.getElementById("torzs");
        torzs.innerHTML = "";

        hirdetesek.forEach(function(hirdetes){
            const tr = document.createElement("tr");

            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const td5 = document.createElement("td"); //Muvelet

            td1.textContent = hirdetes.pozi;
            td2.textContent = hirdetes.ceg;
            td3.textContent = hirdetes.fizu;
            td4.textContent = hirdetes.hely;

            //torles gomb
            const torles = document.createElement("button");
            torles.textContent = "Törlés";

            torles.addEventListener("click", function(){
                torolHirdetes(hirdetes.id);
            });
            td5.appendChild(torles);

            //szerkesztes gomb
            const szerkeszt = document.createElement("button");
            szerkeszt.textContent = "Szerkesztes";

            szerkeszt.addEventListener("click", function(){
                szerkesztHirdetes(hirdetes.id);
            });
            td5.appendChild(szerkeszt);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);

            torzs.appendChild(tr);
        });
    }

    //Click a mentésre
    document.getElementById("mentes").addEventListener("click", function(){
        let poziVal = poziInput.value.trim();
        let cegVal = cegInput.value.trim();
        let fizuVal = Number(fizuInput.value.trim());
        let helyVal = helyInput.value.trim();

        if(!poziVal){
            hibaHirdertes(poziInput,"Add meg a kivant poziciot!");
            return;
        };
        if(!cegVal){
            hibaHirdertes(cegInput,"Add meg a ceg nevet!");
            return;
        };
        if(isNaN(fizuVal) || fizuVal <= 0 || fizuVal > 10000000){
            hibaHirdertes(fizuInput,"Helytelen osszeget adtal meg!");
            return;
        };
        if(!helyVal){
            hibaHirdertes(helyInput,"Add meg a helyszint!");
            return;
        }

        if(szID === null){

                const ujHirdetes = {
            id:Date.now(),
            pozi:poziVal,
            ceg:cegVal,
            fizu:fizuVal,
            hely:helyVal
        };
        hirdetesek.push(ujHirdetes);
        }
        else{
            const index = hirdetesek.findIndex(function(ember){
                return ember.id === szID;
            });
            if(index !== -1){
                hirdetesek[index].pozi = poziVal;
                hirdetesek[index].ceg = cegVal;
                hirdetesek[index].fizu = fizuVal;
                hirdetesek[index].hely = helyVal;
            }  
        }
        kiir();
        kiurit();
    });
