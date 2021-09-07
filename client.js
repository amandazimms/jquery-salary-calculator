console.log("js");
$( document ).ready( onReady );

function onReady(){
  $( '#submit-button' ).on( 'click', submit );
  console.log('jq');
} 


// A 'Submit' button should collect the form information, store the information to calculate monthly costs, append information
// // to the DOM and clear the input fields. Using the stored information, calculate monthly costs and append this to the to DOM.
// // If the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.


function submit() {
  console.log('submit');
  
  displayInputValueInOutput('#employee-first-name', '#first-name-output');
  displayInputValueInOutput('#employee-last-name', '#last-name-output');
  displayInputValueInOutput('#employee-id', '#id-output');
  displayInputValueInOutput('#employee-title', '#job-title-output');
  displayInputValueInOutput('#employee-salary', '#salary-output');

}

function displayInputValueInOutput(inputField, outputArea) {
  //function that displays the value of an input field in an output area

  //.html seems to accomplish .empty and .append in one step. 
  $(outputArea).html( $(inputField).val() ); 
  $(inputField).val('');
}

// Create a delete button that removes an employee from the DOM. For Base mode, it does **not** need to remove that Employee's 
// //salary from the reported total. -->




// //todo update readme
//todo put this in scripts folder, jQ in vendors folder, css in styles folder