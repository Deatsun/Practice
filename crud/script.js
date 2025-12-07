const persons = [];

let szID = null;

const nameInput = document.getElementById("nev");
const ageInput = document.getElementById("kor");
const posiInput = document.getElementById("pozicio");
const sallaryInput = document.getElementById("ber");

// ---- Functions --------

    // -Clear data

function clear(){
    nameInput.value = "";
    ageInput.value = "";
    posiInput.value = "";
    sallaryInput.value = "";

    nameInput.classList.remove("error");
    ageInput.classList.remove("error");
    posiInput.classList.remove("error");
    sallaryInput.classList.remove("error");

    nameInput.placeholder = "";
    ageInput.placeholder = "";
    posiInput.placeholder = "";
    sallaryInput.placeholder = "";

    szID = null;
}

    // -Error data
function errorData(input,message){
    input.value = "";
    input.classList.add("error");
    input.placeholder = message;
}

    // -Delete
function deletePpl(id){
    const index = persons.findIndex(function(people){
        return people.id === id;
    })
    if(index !== -1){
        persons.splice(index,1);
        writeit();
    };
}

    // -Edit
function editPpl(id){
    const kember = persons.find(function(ember){
        return ember.id === id;
    })
    if(!kember){
        return;
    }
    nameInput.value = s.name;
    ageInput.value = s.age;
    posiInput.value = s.posi;
    sallaryInput.value = s.sallary;
    szID = id;
};

