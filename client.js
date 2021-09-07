console.log("js");
$( document ).ready( onReady );

function onReady(){
  $( '#submit-button' ).on( 'click', addNewEmployee );
  console.log('jq');
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
    <div class="${id} salary"><p>${salaryDisplay}</p></div>
    <div class=${id}><button onclick="deleteEmployee(${id})">delete</button></div>
    `;

  $('.employees-container').append(newRow);

  //todo disallow two employees with same ID
  //todo disallow employee ID beginning with zero

  //clear values
  $('#employee-first-name').val('');
  $('#employee-last-name').val('');
  $('#employee-id').val('');
  $('#employee-title').val('');
  $('#employee-salary').val('');

  displayMonthlyTotalSalary();
}

function displayMonthlyTotalSalary(){
  //todo not sure if updating the entire salaries array this often may be an issue with performance in a real scenario;
  //in that case a global variable might be better
  let salaries = [];
  let salariesSum = 0;

  //for each element with the 'salary' class
  $('.salary').each(function(){
    //since we previously converted salary to a nice currency number for display, now need to convert it back to a plain number
    let salaryAsNumber = Number($(this).text().replace(/[^0-9.-]+/g,""));

    //push 'this' (each of those elements) 's text value into the salaries array
    console.log('this sal val', salaryAsNumber);
    salaries.push( salaryAsNumber);
    salariesSum+= salaryAsNumber;
    console.log('salaries sum', salariesSum);
  });

  let salariesMonthly = salariesSum/12;
  console.log(salariesMonthly);

  //convert salary sum to dollar format, stored in new var so we also keep salariesMonthly as a plain number to use later
  let salariesMonthlyDisplay = (salariesMonthly).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD', });

      console.log(salariesMonthly);

  $('#total-salaries').html('Total Monthly: ' + salariesMonthlyDisplay);

  //If the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.
  if (salariesMonthly > 20000)
    $('#total-salaries').css('background-color', 'red');
  else //need to add an else for when the too-expensive people get deleted: change it back!
    $('#total-salaries').css('background-color', 'white'); //todo - better to first store the original BG color, and set this to that here, in case it isn't white.

}


function deleteEmployee(id){
  //use . for class selector
  let salaryToBeDeleted = $('.'+id+'.salary').text();
  console.log('salary to be deleted' , salaryToBeDeleted);
  
  //use . for class selector
  $('.'+id).remove();
  
  displayMonthlyTotalSalary();
}

//todo this class not used
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