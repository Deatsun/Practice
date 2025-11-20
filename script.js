//tomb
const emberek = [];

//szerkesztes eldontese
let szID = null;

//DOM cache
const nevInput = document.getElementById("nev");
const korInput = document.getElementById("kor");
const poziInput = document.getElementById("pozicio");
const berInput = document.getElementById("ber");

//FV---------------
//kiurites
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

// Szerkesztes
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

//torles
function torolEmber(id){
    const i = emberek.findIndex(function(e){
        return e.id === id;
    });
    if(i !== -1){
        emberek.splice(i,1);
        kiir();
    };
}

// hiba
function hibaEmber(input,message){
    input.value = "";
    input.classList.add("error");
    input.placeholder = message;
};

//kiir
function kiir(){
    const torzs = document.getElementById("torzs");
    torzs.innerHTML = "";

    for(let i = 0; i < emberek.length; i++){
        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        const td5 = document.createElement("td");

        td1.textContent = emberek[i].nev;
        td2.textContent = emberek[i].kor;
        td3.textContent = emberek[i].pozi;
        td4.textContent = emberek[i].ber;

        //torles gomb

        const torol = document.createElement("button");
        torol.textContent = "Torles";

        torol.addEventListener("click", function(){
            torolEmber(emberek[i].id);
        });
        td5.appendChild(torol);

        //szerkesztes gomb
        const szerkeszt = document.createElement("button");
        szerkeszt.textContent = "Szerkesztes";

        szerkeszt.addEventListener("click", function(){
            szerkesztEmber(emberek[i].id);
        });
        td5.appendChild(szerkeszt);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        torzs.appendChild(tr);
    };
};

//click
document.getElementById("kuldes").addEventListener("click", function(){
    let nevv = nevInput.value.trim();
    let korv = Number(korInput.value.trim());
    let poziv = poziInput.value.trim();
    let berv = Number(berInput.value.trim());

    if(!nevv){
        hibaEmber(nevInput,"Add meg a neved!");
        return;
    };
    if(isNaN(korv) || korv < 18 || korv > 70){
        hibaEmber(korInput,"hiba");
        return;
    };
    if(!poziv){
        hibaEmber(poziInput,"Hiba");
        return;
    };
    if(isNaN(berv) || berv <= 0 || berv > 100000000){
        hibaEmber(berInput,"Hiba");
        return;
    };

    if(szID === null){
        const uj = {
            id: Date.now(),
            nev:nevv,
            kor:korv,
            pozi:poziv,
            ber:berv
        };
        emberek.push(uj);
    }
    else{
        const i = emberek.findIndex(function(e){
            return e.id === szID;
        });
        if(i !== -1){
            emberek[i].nev = nevv;
            emberek[i].kor = korv;
            emberek[i].pozi = poziv;
            emberek[i].ber = berv;
        };
    };
    kiir();
    kiurit();
});