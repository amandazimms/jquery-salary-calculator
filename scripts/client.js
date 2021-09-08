$( document ).ready( onReady );

let originalBGforTotalDisplay; //I don't like that this is global, but couldn't think of an alternative for now
let employees = []; 

function onReady(){
  $( '#submit-button' ).on( 'click', addNewEmployee );

  originalBGforTotalDisplay = $('#total-salaries').css('background-color');
} 

function addNewEmployee(){
  let firstNameInVal = $('#employee-first-name').val();
  let lastNameVal = $('#employee-last-name').val();
  let idVal = $('#employee-id').val().toString(); //note: employee ID will also be used as the class for each div (for this employee). Meta!
  let titleVal = $('#employee-title').val();
  let salaryVal = $('#employee-salary').val();

  if (idChecker(idVal)) { //run the following only if the idChecker comes back good
    
    //declare new employee
    let newEmployee = {
      firstName: firstNameInVal,
      lastName: lastNameVal,
      id: idVal,
      title: titleVal,
      salary: salaryVal
    }
    
    //add to array of employees
    employees.push(newEmployee);
    console.log(employees);
    
    //convert salary to dollar format
    salaryVal = (Number(salaryVal)).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD', });

    //todo : may be more readable and easier to store the whole new row in its own parent div, and tag that with class 'id'
    //then when deleting, can just remove that parent div. But I was finding this more difficult to do without messing up the css grid. 
    let newRow = `
      <div class="${idVal} employee-data grid-child"><p>${firstNameInVal}</p></div>
      <div class="${idVal} employee-data grid-child"><p>${lastNameVal}</p></div>
      <div class="${idVal} employee-data grid-child employee-id "><p>${idVal}</p></div>
      <div class="${idVal} employee-data grid-child"><p>${titleVal}</p></div>
      <div class="${idVal} employee-data grid-child salary "><p>${salaryVal}</p></div> 
      <div class="${idVal} employee-data grid-child"><button onclick="deleteEmployee(${idVal})">delete</button></div>
      `;

    $('.employees-container').append(newRow); //add the new row to the css grid container

    //for each element with the 'employee-input' class (all of the input fields)
    $('.employee-input').each(function(){
      $(this).val(''); //clear the field
    });
    
    displayMonthlyTotalSalary(); //update total monthly salary, now that there's new data
  } 
}

function idChecker(id){ //makes sure a valid ID is entered

  for (const employee of employees){ //loop through array of employee objects
    if (employee.id === id) { //if this id matches an existing id
      alert("Invalid Employee ID: please make sure ID is unique to this employee");
      return false;
    }
  }
  if ( id.toString()[0] === "0" ) { //if ID begins with zero
    alert("Invalid Employee ID: please make sure ID does not begin with zero.");
    return false;
  } 
  else if ( !Number(id) || id.toString().length === 0) { //if it's fails this, it's NaN (contains letters), or isn't entered (these two have overlap, so were combined)
    alert("Invalid Employee ID: please make sure you entered an ID, and that it only contains numbers.")
    return false;
  } 
  else
    return true;
}


function displayMonthlyTotalSalary(){
  let salariesSum = 0;

  for (const employee of employees){ //loop through array of employee objects
    salariesSum+= Number(employee.salary); //get the employee salary and add to sum
  }
  let salariesMonthly = salariesSum / 12; //convert from yearly to monthly

  if (salariesMonthly > 20000)  //If the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.
    $('#total-salaries').css('background-color', 'rgb(177, 65, 71)');
  else //for when the too-expensive people get deleted: change it back to not-red
    $('#total-salaries').css('background-color', originalBGforTotalDisplay);

  //convert salary sum to dollar format, stored in new var so we also keep salariesMonthly as a plain number to use later
  salariesMonthly = (salariesMonthly).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD', });

  $('#total-salaries').html('Total Monthly: ' + salariesMonthly); //display on DOM
}

function deleteEmployee(id){  
  //remove employee from DOM: use . for class selector; for multiple classes, '.classA.classB'
  $('.'+id).remove();

  //remove employee object from array of employees
  for (let i = 0; i< employees.length; i++){ //loop through array of employee objects
    if (Number(employees[i].id) === id) {
      employees.splice(i, 1);
    }
  }
  console.log(employees);
  
  //now that we have updated data, recalculate and display total
  displayMonthlyTotalSalary();
}

