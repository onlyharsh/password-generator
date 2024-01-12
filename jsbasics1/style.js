const inputSlider=document.querySelector("[data-lengthSlider]")
const lengthDisplay=document.querySelector("[data-lengthNumber]")
const passwordDisplay=document.querySelector("[data-passwordDisplay]")
const copyBtn=document.querySelector("[data-copy]")
const copyMsg=document.querySelector("[data-copyMsg]")
const upperCaseCheck=document.querySelector("#uppercase")
const lowerCaseCheck=document.querySelector("#lowercase")
const numbersCheck=document.querySelector("#numbers")
const symbolsCheck=document.querySelector("#symbols")
const indicator=document.querySelector("[data-indicator]")
const generateBtn=document.querySelector(".generate-button")
const allCheckBox=document.querySelectorAll("input[type=checkbox]")
const addComment=document.querySelector(".comment")
const symbols='`~!@#$%^&*(){}[]:",.'
let password="";
let passwordLength=10;
let checkCount=0;

handleSlider();
setIndicator("#ffffff")
function handleSlider(){
   inputSlider.value=passwordLength;
   lengthDisplay.textContent=passwordLength;
   
   const min=inputSlider.min;
   const max=inputSlider.max;
   inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%"
}
function setIndicator(color){
   indicator.style.backgroundColor=color;
   indicator.style.boxShadow=`0px 0px 12px 1px ${color}`
}
function getRndInteger(min,max){
   return Math.floor(Math.random()*(max-min))+min;
}
function generateRandomNumber(){
   return getRndInteger(0,9);
}
function generateLowerCase(){
   return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase(){
   return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol(){
   return symbols[getRndInteger(0,symbols.length)];
}
function modifycomment(color) {
   let com = "";
   if (color === "#e71d36") {
     com = "Your password is strong!!";
     addComment.innerText = com;
   }
   else if (color==="#2ec4b6"){
      com="Your password is moderate!!"
      addComment.innerText = com;
   }
   else {
      com="Your password is weak!!"
      addComment.innerText = com;
   }
   
 }
function calcStrength(){
   let hasUpper=false;
   let hasLower=false;
   let hasNum=false;
   let hasSym=false;

   if (upperCaseCheck.checked)hasUpper=true;
   if (lowerCaseCheck.checked)hasLower=true;
   if (numbersCheck.checked)hasNum=true;
   if (symbolsCheck.checked)hasSym=true;
   if (hasUpper && hasLower && hasNum && hasSym && passwordLength>=7){
     setIndicator("#e71d36");
     modifycomment("#e71d36");

   }
   else if ((hasUpper || hasLower) && (hasNum || hasSym ) && passwordLength>=5 ){
      setIndicator("#2ec4b6");
      modifycomment("#2ec4b6");
   }
   else {
      setIndicator("#ff9f1c");
      modifycomment("ff9f1c")
   }
}

async function copycontent(){
   try{
      navigator.clipboard.writeText(passwordDisplay.value)
      copyMsg.innerText="copied";
   }
   catch(e){
     copyMsg.innerText="failed";
   }
   copyMsg.classList.add("active");
   setTimeout(()=>{
      copyMsg.classList.remove("active")
   },2000);

}

function handleCheckBoxChange(){
   checkCount=0;
   allCheckBox.forEach((checkbox)=>{
      if (checkbox.checked)checkCount++;
   });

   // special
   if (passwordLength<checkCount){
      passwordLength=checkCount;
      handleSlider();
   }

}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})
inputSlider.addEventListener('input',(e)=>{
   passwordLength=e.target.value;
   handleSlider();
})

copyBtn.addEventListener('click',()=>{
   if (passwordDisplay.value){
      copycontent();
   }
})
 console.log(checkCount);

generateBtn.addEventListener('click',()=>{
   //none of checkbox are selected
   if (checkCount<=0)return ;
   if (passwordLength<checkCount){
      passwordLength=checkCount;
      handleSlider();
   }
   
// remove old password...
password="";
// let's put all elements demanded by user
// if (upperCaseCheck.checked){
//    password+=generateUpperCase();
// }
// if (lowerCaseCheck.checked){
//    password+=generateLowerCase();
// }
// if (numbersCheck.checked){
//    password+=generateRandomNumber();
// }
// if (symbolsCheck.checked){
//    password+=generateSymbol();
// }

let funcArr=[];
if (upperCaseCheck.checked)
    funcArr.push(generateUpperCase);

if (lowerCaseCheck.checked)
    funcArr.push(generateLowerCase);

if (numbersCheck.checked){
   funcArr.push(generateRandomNumber)
}
if (symbolsCheck.checked){
   funcArr.push(generateSymbol);
}
for (let i=0;i<funcArr.length;i++){
   password+=funcArr[i]();
}
for (let i=0;i<passwordLength-funcArr.length;i++){
   let randIndex=getRndInteger(0,funcArr.length);
   password+=funcArr[randIndex]();
}

// shuffle password
 password=shufflePassword(Array.from(password));
passwordDisplay.value=password;
calcStrength();

})

function  shufflePassword(array){
 // Fisher Yates Method

 for (let i=array.length-1;i>0;i--){
   const j=Math.floor(Math.random()*(i+1));
   const temp=array[i];
   array[i]=array[j];
   array[j]=temp;
 }
 let str="";
 array.forEach((el)=>(str+=el))
 return str;
}