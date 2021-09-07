console.log("js");
$( document ).ready( onReady );

function onReady(){
  $( '#submit-button' ).on( 'click', submit );
  console.log('jq');
} 

let salaries = [];

// A 'Submit' button should collect the form information, store the information to calculate monthly costs, append information
// // to the DOM and clear the input fields. Using the stored information, calculate monthly costs and append this to the to DOM.
// // If the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.


function submit() {
  console.log('submit');
  
  addNewEmployee();

  // displayInputValueInOutput('#employee-first-name', '#first-name-output');
  // displayInputValueInOutput('#employee-last-name', '#last-name-output');
  // displayInputValueInOutput('#employee-id', '#id-output');
  // displayInputValueInOutput('#employee-title', '#job-title-output');
  // displayInputValueInOutput('#employee-salary', '#salary-output');

}

function addNewEmployee(){
  //create another row
  let firstName = $('#employee-first-name').val();
  let lastName = $('#employee-last-name').val();
  let id = $('#employee-id').val();
  let title = $('#employee-title').val();
  let salary = $('#employee-salary').val();

  let newRow = `
  <div class="employee-data"><p id="first-name-output">${firstName}</p></div>
  <div class="employee-data"><p id="last-name-output">${lastName}</p></div>
  <div class="employee-data"><p id="id-output">${id}</p></div>
  <div class="employee-data"><p id="job-title-output">${title}</p></div>
  <div class="employee-data"><p id="salary-output">${salary}</p></div>
  <div class="employee-data"><button id="delete-button">delete</button></div>
    `
  $('.employees-container').append(newRow);

  $('#employee-first-name').val('');
  $('#employee-last-name').val('');
  $('#employee-id').val('');
  $('#employee-title').val('');
  $('#employee-salary').val('');


  //todo separation of concerns - different function?
  //store salary and display total
  salaries.push(salary);

  let salariesSum = 0;
  for (const salary of salaries)
    salariesSum+= Number(salary);


  let totalDisplay = $('#total-salaries');

  $(totalDisplay).html('Total Monthly: ' + salariesSum);
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