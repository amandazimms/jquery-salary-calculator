console.log("js");
$( document ).ready( onReady );

function onReady(){
  $( '#submit-button' ).on( 'click', submit );
  console.log('jq');
} 

let salaries = [];




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

  //convert salary to dollar format, stored in new var so we also keep salary as a plain number to use later
  let salaryDisplay = (Number(salary)).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD', });

  let newRow = `
  <div class="employee-data"><p id="first-name-output">${firstName}</p></div>
  <div class="employee-data"><p id="last-name-output">${lastName}</p></div>
  <div class="employee-data"><p id="id-output">${id}</p></div>
  <div class="employee-data"><p id="job-title-output">${title}</p></div>
  <div class="employee-data"><p id="salary-output">${salaryDisplay}</p></div>
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

  //convert salary sum to dollar format
  salariesSum = (salariesSum).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD', });

  $('#total-salaries').html('Total Monthly: ' + salariesSum);

  //If the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.
  if (salariesSum > 20000)
  $('#total-salaries').css('background-color', 'red');
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