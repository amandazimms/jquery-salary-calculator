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
  let firstName = $('#employee-first-name').val();
  let lastName = $('#employee-last-name').val();
  //employee ID will also be used as the class for each div. Meta!
  let id = $('#employee-id').val().toString();
  let title = $('#employee-title').val();
  let salary = $('#employee-salary').val();

  //convert salary to dollar format, stored in new var so we also keep salary as a plain number to use later
  let salaryDisplay = (Number(salary)).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD', });

  //todo : more readable and easier to store the whole new row in its own div, and tag that with 'id'
  //then when deleting, can just remove that parent div. But I was finding this more difficult 
  //to do without messing up the css grid. 
  let newRow = `
    <div class=${id}><p>${firstName}</p></div>
    <div class=${id}><p>${lastName}</p></div>
    <div class=${id}><p>${id}</p></div>
    <div class=${id}><p>${title}</p></div>
    <div class=${id}><p>${salaryDisplay}</p></div>
    <div class=${id}><button onclick="deleteEmployee(${id})">delete</button></div>
    `;



  $('.employees-container').append(newRow);

  //todo disallow two employees with same ID
  //todo disallow employee ID beginning with zero

  
  //todo remove region tags
  //#region stuff thats in my way
  //clear values
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

  let salariesMonthly = salariesSum/12;
  //convert salary sum to dollar format, stored in new var so we also keep salariesMonthly as a plain number to use later
  let salariesMonthlyDisplay = (salariesMonthly).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD', });

  $('#total-salaries').html('Total Monthly: ' + salariesMonthlyDisplay);

  //If the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.
  if (salariesMonthly > 20000)
    $('#total-salaries').css('background-color', 'red');
  //#endregion
}

function deleteEmployee(id){
  console.log('delete', id);
  $('.'+id).remove();
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