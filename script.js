const passwordDisplay=document.querySelector("[passwordDisplay]")
const msgcopy=document.querySelector("[msg-copy]")
const copybutton=document.querySelector("[copybutton]")
const uppercase=document.querySelector("#uppercase")
const lowercase=document.querySelector("#lowercase")
const number=document.querySelector("#numbers")
const symbol=document.querySelector("#symbols")
const indicator=document.querySelector("[indicator]")
const inputslider=document.querySelector("[inputslider]")
const lengthNumber=document.querySelector("[lengthNumber]")
const generatepass=document.querySelector("[generatepass]")
const allCheckbox = document.querySelectorAll("input[type=checkbox");

const sym = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let password="";
let passLength=10;
let checkCount=0;
handleslider();
setindicator("#ccc");
console.log(allCheckbox)


function handleslider(){
    inputslider.value=passLength;
    lengthNumber.innerText=passLength;
    const min = inputslider.min;
    console.log(min)
  const max = inputslider.max;
  inputslider.style.backgroundSize =((passLength -min) * 100) / (max - min) + "% 100%";
    

}
function setindicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`


}
function getrandominteger(min,max){
   return Math.floor(Math.random()*(max-min)+min)
}

function getrandomnumber(){
    return getrandominteger(0,9);
}
function getrandomuppercase(){
    return String.fromCharCode(getrandominteger(65,90));
}

function getrandomlowercase(){
    return String.fromCharCode(getrandominteger(97,123));
}
function getrandomsymobl(){
    const rndnum= getrandominteger(0,sym.length);
    return sym.charAt(rndnum);
}

function calstrength(){
    let hasnumber    =false;
    let hasuppercase=false;
    let haslowercase=false;
    let hassymbol=false;
    
    if(uppercase.checked) hasuppercase=true;
    if(lowercase.checked) haslowercase=true;
    if(number.checked) hasnumber=true;
    if(symbol.checked) hassymbol=true;

    if(hasuppercase && haslowercase && (hasnumber|| hassymbol) && passLength>=8){
        setindicator("#0f0")
    }
    else if((hasuppercase ||haslowercase) && (hasnumber|| hassymbol) && passLength>=6){
        setindicator("#ff0")
    }
    else{
        setindicator("f00")
    }
}

async function copycontent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        msgcopy.innerText="copied";

    }
    catch(e){ 
        msgcopy.innerText="failed";
    }

    msgcopy.classList.add("active")
    setTimeout(()=>{
        msgcopy.classList.remove("active")
    },2000);

    

}
copybutton.addEventListener("click", () => {
    if (passwordDisplay.value) copyContent();
  })

inputslider.addEventListener('input',(e)=>{
    passLength=e.target.value;
    
    handleslider();
})

function handlecheckbox(){
    console.log("cheak cou")
    checkCount = 0;
    allCheckbox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
        console.log(checkCount)
    });

   

    if(passLength<checkCount){
        passLength=checkCount;
        handleslider();
    }
}

allCheckbox.forEach( (checkbox)=>{
     checkbox.addEventListener('change',handlecheckbox)
})
 
copybutton.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copycontent();
    }
})
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


generatepass.addEventListener("click",()=>{

    console.log("enterwd")

    if(checkCount==0){

        return;
    }
    console.log("hello")

    if(passLength<checkCount){
        passLength=checkCount;
        handleslider();
        console.log("hello")
    }
    console.log("hello")
    // to find password

    let funArr=[];
    password="";
    
    if(uppercase.checked){
        funArr.push(getrandomuppercase);
    }
    if(lowercase.checked){
        funArr.push(getrandomlowercase);
    }

    if(number.checked){
        funArr.push(getrandomnumber);
    }
    if(symbol.checked){
        funArr.push(getrandomsymobl);
    }
    // compalsory addition
    for(let i=0;i<funArr.length;i++){
        password+=funArr[i]();
    }
    console.log("hello2")
    // remaining words
    for(let i=0;i<(passLength-funArr.length);i++){
        let randomNum=getrandominteger(0,funArr.length);
        password+=funArr[randomNum]();

    }
    console.log("hello3")
    // now need to shuffle
    password=shufflePassword(Array.from(password));

    // to display password on screen
    passwordDisplay.value=password;
    // now cal strength
    calstrength();



})