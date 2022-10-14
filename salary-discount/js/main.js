//Add event to the 'Calculate' button to start the calculation process.
document.querySelector("#calculate").addEventListener('click', function(){
    
    //Get values from inputs
    let salary = Number(document.querySelector('#salary').value);
    let bonifications = Number(document.querySelector('#bonifications').value);
    let extrahours = Number(document.querySelector('#extrahours').value);

    //Validate that salary isn't zero
    if(salary == 0 ){
        document.querySelector('.error p').innerHTML = "Please input a valid salary."
        document.querySelector('#error').style.display= "block";
        document.querySelector('#results').style.display= "block";
        document.querySelector('#details').style.display= "none";
        return;
    }

    //*** SFS = Seguro Familiar de Salud / AFP: Administradora de Fondos de Pensiones / TSS = Tesoreria de Seguridad Social (AFP+AFP) / ISR = Impuesto Sobre La Renta ***

    //Add up Salary and Bonifications given the fact that they count for all calculations. Extra Hours only count for ISR calculations.
    let salaryBonifications = salary + bonifications;

    //Inputs pass validation, make calculations.
    //SFS & AFP calculations
    let sfs = salaryBonifications * 0.0304;
    let afp = salaryBonifications * 0.0287;
    let tssDeductions = sfs + afp;
    
    
    //ISR Calculations

    //Add up Extra Hours to Salary + Bonifications since Extra Hours do count for ISR Calculations.
    let totalSalaryExtra = salaryBonifications + extrahours;
    
    let deductedSalary = totalSalaryExtra - tssDeductions;
    let yearly = deductedSalary * 12;
    let isr = 0;

    if(yearly >= 416220.01 & yearly <= 624329){
        isr = ((yearly - 416220.01)*0.15)/12;
    }

    if(yearly >= 624329.01 & yearly <= 867123){
        isr = (((yearly - 624329.01)*0.20)+31216)/12;
    }

    if(yearly >= 867123.01){
        isr = (((yearly - 867123.01)*0.25)+79776)/12;
    }

    //Monthly Salary = Total Salary + Bonuses with All Deductions.
    let totalDeductions = tssDeductions + isr;
    let monthlySalary = totalSalaryExtra - totalDeductions;
    
    //Set up money formatter to inject information in currency format.
    let currency = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    //Inject results into HTML
    document.querySelector('#sal').innerHTML = `RD${currency.format(salary+bonifications+extrahours)}`;
    document.querySelector('#afp').innerHTML = `RD${currency.format(afp)}`;
    document.querySelector('#sfs').innerHTML = `RD${currency.format(sfs)}`;
    document.querySelector('#isr').innerHTML = `RD${currency.format(isr)}`;
    document.querySelector('#tdeductions').innerHTML = `RD${currency.format(totalDeductions)}`;
    document.querySelector('#salarym').innerHTML = `RD${currency.format(monthlySalary)}`;
    document.querySelector('#salarybw').innerHTML = `RD${currency.format(monthlySalary/2)}`;

    //Display Results
    document.querySelector('#error').style.display= "none";
    document.querySelector('#results').style.display= "block";
    document.querySelector('#details').style.display= "block";    
})