// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword(pass) {
  var passwordText = document.querySelector("#password");

  passwordText.value = pass;

}

/**************************** Array creation functions ****************************/
// Make an array of lowercase letters
function makeLowerArray(){
  var letterArray = [];
  for(var i = 0; i < 26; i++){
    // lowercase letters have an ascii index of 97 - 122
    letterArray[i] = String.fromCharCode(97 + i);
  }
  return(letterArray);
}

// Make an array of uppercase letters
function makeUpperArray(){
  var letterArray = [];
  for(var i = 0; i < 26; i++){
    // uppercase letters have an ascii index of 65 - 90
    letterArray[i] = String.fromCharCode(65 + i);
  }
  return(letterArray);
}

// Make an array of numbers (as strings to easier add to the password)
function makeNumArray(){
  var numArray = [];
  for(var i = 0; i < 10; i++){
    // numbers have an ascii index of 48 - 57
    numArray[i] = String.fromCharCode(48 + i);
  }
  return(numArray);
}

// Make an array of special characters
function makeSpecialArray(){
  var specialArray = [];
  for(var i = 0; i < 15; i++){
    // first set of special characters have an ascii index of 33 - 47
    specialArray[i] = String.fromCharCode(33 + i);
  }
  for(var i = 15; i < 22; i++){
    // second set of special characters have an ascii index of 58 - 64
    specialArray[i] = String.fromCharCode(58 + (i-15));
  }
  for(var i = 22; i < 29; i++){
    // third set of special characters have an ascii index of 91 - 96
    specialArray[i] = String.fromCharCode(91 + (i-23));
  }
  for(var i = 29; i < 33; i++){
    // fourth set of special characters have an ascii index of 123 - 126
    specialArray[i] = String.fromCharCode(123 + (i-29));
  }
  return(specialArray);
}

/**************************** grab random character functions ****************************/
// Get a random lowercase letter
function getLower(){
  var letter = makeLowerArray();
  var randLet = Math.floor(Math.random()*letter.length);
  return(letter[randLet]);
}

// Get a random uppercase letter
function getUpper(){
  var letter = makeUpperArray();
  var randLet = Math.floor(Math.random()*letter.length);
  return(letter[randLet]);

}

// Get a random number
function getNum(){
  var num = makeNumArray();
  var randNum = Math.floor(Math.random()*num.length);
  return(num[randNum]);
}

// Get a random special character
function getSpecial(){
  var special = makeSpecialArray();
  var randChar = Math.floor(Math.random()*special.length);
  return(special[randChar]);
}

/**************************** Password creation functions ****************************/
// Get the type of character to be added
function collectType(low, high, num, spec){
  var correctChoice = false;
  while(!correctChoice){
    var randChoice = Math.floor(Math.random()*4);
    if(randChoice === 0 && low){
      correctChoice = true;
    }
    if(randChoice === 1 && high){
      correctChoice = true;
    }
    if(randChoice === 2 && num){
      correctChoice = true;
    }
    if(randChoice === 3 && spec){
      correctChoice = true;
    }
  }
  return(randChoice);
}

// Get the character of the chosen type
function collectChar(choice){
  var addChar;
  if(choice === 0){
    addChar = getLower();
  }
  else if(choice === 1){
    addChar = getUpper();
  }
  else if(choice === 2){
    addChar = getNum();
  }
  else{
    addChar = getSpecial();
  }
  return(addChar);
}

// Build a password of the specified length and character types
function buildPass(length, lower, upper, number, special){
  var pass = "";
  for(var i = 0; i < length; i++){
    pass = pass + collectChar(collectType(lower, upper, number, special));
  }
  return(pass);
}

/**************************** Array check function ****************************/
// Check if the string contains all the requested elements
function passCheck(pass, lower, upper, number, special){
  var checksOut = false;
  var hasLower = false;
  var hasUpper = false;
  var hasNumber = false;
  var hasSpecial = false;

  for(var i = 0; i < pass.length; i++){
    
    /* Uncomment this if you want to assume the password doesn't contain character types that you wanted omitted
    if((lower === hasLower) && (upper === hasUpper) && (number === hasNumber) && (special === hasSpecial)){
      break;
    }
    */

    for(var j = 0; j < 26; j++){
      if(pass[i] === makeLowerArray()[j]){
        hasLower = true;
        break;
      }

    }
    for(var k = 0; k < 26; k++){
      if(pass[i] === makeUpperArray()[k]){
        hasUpper = true;
        break;
      }
    }
    for(var j = 0; j < 10; j++){
      if(pass[i] === makeNumArray()[j]){
        hasNumber = true;
        break;
      }
    }
    for(var j = 0; j < 33; j++){
      if(pass[i] === makeSpecialArray()[j]){
        hasSpecial = true;
        break;
      }
    }
  }

  if((lower === hasLower) && (upper === hasUpper) && (number === hasNumber) && (special === hasSpecial)){
    checksOut = true;
  }

  return(checksOut);
}

// Main function that gets the user's requirements when button is clicked
function clickGen(){

  var passLength = prompt("How long would you like the password? (between 8 and 128 characters)");

  if(passLength > 7 && passLength < 129){
    var choiceLower = confirm("Would you like to include lowercase letters?");

    var choiceUpper = confirm("Would you like to include capital letters?");

    var choiceNum = confirm("Would you like to include numbers?");

    var choiceSpecial = confirm("Would you like to include special characters?");

    if(choiceLower || choiceUpper || choiceNum || choiceSpecial){
      var password = "";
      do{
        var typesMatch = false;
        password = buildPass(passLength, choiceLower, choiceUpper, choiceNum, choiceSpecial);
        typesMatch = passCheck(password, choiceLower, choiceUpper, choiceNum, choiceSpecial);
      }while(typesMatch === false);

      writePassword(password);
    }
    // If they didn't select at least 1 type of character to add
    else{
      alert("I'm sorry, but you need to select at least one option");
      writePassword("Your Secure Password would be here if you actually wanted one");
    }
  }
  // If they didn't select a proper password size
  else{
    alert("I'm sorry, we need a number input from 8-128 only");
    writePassword("Your Secure Password would be here if you followed directions");
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", clickGen);