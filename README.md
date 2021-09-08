# Salary Calculator


## Description

*Duraton: 2-day Sprint*

This app allows you to input employee information, including first and last name, employee ID, job title, and annual salary. As employees are added, the monthly total cost of paying their salaries is updated, and indicates in red when the maximum of $20k is reached. Employees can be removed with a delete button; total then updates as expected.

Employees are stored as objects inside an array, which isn't strictly necessary for the scope of this, but would definitely be useful if the project was built out further. Employee IDs are validated at the time of input, eliminating some edge cases this app would not support (beginning with zero, same ID as other employees, no number entered) - however, these all seemed like probable real life limitations for an employee ID system as well. The DOM is styled with CSS Grid, and alternating row colors were accomplished with 'nth child' CSS, which updates dynamically as employees are added and deleted. 


## Screenshot

![Screenshot](salary-calc-screenshot)


## Usage

* Fill in input fields: names, ID, title, and salary
* Click Submit
  * Employee is now saved within the app, and their info is displayed on the grid below
  * Monthly total is now calculated
* Repeat first two steps until all desired employees are entered
* If you need to remove an employee, click the delete button next to their salary
  * Monthly total and grid are refreshed
* If total monthly cost exceeds $20,000, it will display in red


## Built With

Javascript, jQuery, HTML, CSS (including CSS Grid)


## Acknowledgement 

Thanks to [Prime](https://github.com/PrimeAcademy/ "Prime") and our instructor [Dev](https://github.com/devjanaprime/ "Dev") for setting up the parameters of the assignment and providing inspiring stretch goals! Thank you also to my Ionian cohort buddies for keeping the slack channel alive with posts while we work on our first solo challenge.


