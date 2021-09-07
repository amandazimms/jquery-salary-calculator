console.log("js");
$( document ).ready( onReady );

function onReady(){
  $( '#submit-button' ).on( 'click', addNewEmployee );
  console.log('jq');
} 

function addNewEmployee(){
  let firstName = $('#employee-first-name').val();
  let lastName = $('#employee-last-name').val();
  let id = $('#employee-id').val().toString(); //note: employee ID will also be used as the class for each div (for this employee). Meta!
  let title = $('#employee-title').val();
  let salary = $('#employee-salary').val();

  //convert salary to dollar format, stored in new var so we also keep salary as a plain number to use later
  let salaryDisplay = (Number(salary)).toLocaleString('en-US', {
    style: 'currency',
currency: 'USD', });

  if (idChecker(id)) { //run the following only if the idChecker comes back good
    
    //todo : may be more readable and easier to store the whole new row in its own parent div, and tag that with class 'id'
    //then when deleting, can just remove that parent div. But I was finding this more difficult to do without messing up the css grid. 
    let newRow = `
      <div class=${id}><p>${firstName}</p></div>
      <div class=${id}><p>${lastName}</p></div>
      <div class="${id} employee-id"><p>${id}</p></div>
      <div class=${id}><p>${title}</p></div>
      <div class="${id} salary"><p>${salaryDisplay}</p></div> 
      <div class=${id}><button onclick="deleteEmployee(${id})">delete</button></div>
      `;

    $('.employees-container').append(newRow); //add the new row to the css grid container

    //for each element with the 'employee-input' class (all of the input fields)
    $('.employee-input').each(function(){
      $(this).val(''); //clear the field
    });
    
    displayMonthlyTotalSalary(); //update total monthly salary, now that there's new data
  } 

  else { //if idChecker came back false 
    alert("Invalid Employee ID: make sure employee ID does NOT begin with zero, and is unique to this employee");
  }
}

function idChecker(id){
  let employeeIDs = [];  //make an array of all employee IDs, so we can check for duplicates

  //for each element with the 'employee-id' class (all of the employees IDs)
  $('.employee-id').each(function(){
    employeeIDs.push( $(this).text()); //push 'this' (each of those elements) 's text value into the IDs array
  });
  
  //if id begins with zero, or id is already present in the array of (other) employee IDs
  if (id.toString()[0] === "0" || employeeIDs.includes(id) ) {
    return false;
  }
  else
    return true;
}


function displayMonthlyTotalSalary(){
  //todo not sure if updating the entire salaries array this often may be an issue with performance
  // in a real scenario; in that case a global salaries[] variable might be better
  let salaries = [];
  let salariesSum = 0;

  //for each element with the 'salary' class (all of the employees salaries)
  $('.salary').each(function(){
    //since we previously converted salary to a nice currency number for display, now need to convert it back to a plain number
    let salaryAsNumber = Number($(this).text().replace(/[^0-9.-]+/g,""));

    salaries.push( salaryAsNumber);//push 'this' (each of those elements) 's text value into the salaries array
    salariesSum+= salaryAsNumber;//add to sum
  });

  let salariesMonthly = salariesSum/12; //convert from yearly to monthly

  //convert salary sum to dollar format, stored in new var so we also keep salariesMonthly as a plain number to use later
  let salariesMonthlyDisplay = (salariesMonthly).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD', });

      console.log(salariesMonthly);

  $('#total-salaries').html('Total Monthly: ' + salariesMonthlyDisplay); //display on DOM

  if (salariesMonthly > 20000)  //If the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.
    $('#total-salaries').css('background-color', 'red');
  else //need to add an else for when the too-expensive people get deleted: change it back!
    $('#total-salaries').css('background-color', 'white'); //todo - better to first store the original BG color, and set this to that here, in case it isn't white.
}


function deleteEmployee(id){  
  //use . for class selector; for multiple classes, '.classA.classB'
  $('.'+id).remove();
  
  //now that we have updated data, recalculate and display total
  displayMonthlyTotalSalary();
}

//todo put this in scripts folder, jQ in vendors folder, css in styles folder