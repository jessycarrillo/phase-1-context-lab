function createEmployeeRecord(attributes){
    const employeeInfo = {
        firstName: attributes[0],
        familyName: attributes[1],
        title: attributes[2],
        payPerHour: attributes[3],
        timeInEvents: [], 
        timeOutEvents:[] 
    }
    return employeeInfo;
}

function createTimeInEvent(dateStamp) {
    const [date, time] = dateStamp.split(' ');
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(time),
        date: date
    };
    this.timeInEvents.push(timeInEvent);
    return this;
}
function createTimeOutEvent(dateStamp) {
    const [date, time] = dateStamp.split(' ');
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(time),
        date: date
    };
    this.timeOutEvents.push(timeOutEvent);
    return this;
}
function hoursWorkedOnDate(dateStamp) {
    let timeInEvent = this.timeInEvents.find(value => value.date === dateStamp);
    let timeOutEvent = this.timeOutEvents.find(value => value.date === dateStamp);
    return (timeOutEvent.hour - timeInEvent.hour)/100
 } 

 function wagesEarnedOnDate(dateStamp){
    return this.payPerHour * hoursWorkedOnDate.call(this, dateStamp)
}

function findEmployeeByFirstName(collection, firstNameString) {
    const employee = collection.find(({ firstName }) => firstName === firstNameString);
    return employee; 
}
function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce(function (total, employee) {
        return total + allWagesFor.call(employee);
    }, 0);
    return totalPayroll;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
  
  }
