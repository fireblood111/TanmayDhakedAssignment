const express = require('express');
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

 const CalculateTax = (amt) => {
    var tax = 0;
    if(amt <= 400000)
        return amt;
    else 
    {
        tax = tax + 3750;
        if(amt > 300000)
        {
            if(amt < 800001)
            {
                tax = tax + (amt-300000)/10;
                return tax;
            }
            else if(amt > 800000)
            {
                tax = tax + 50000;
                if(amt < 10000001)
                {
                    tax = tax + (amt-800000)/4;
                    return tax;
                }
                else if(amt > 10000000)
                {
                    tax = tax +  2300000;
                    tax = tax + (amt-10000000)*3/10;
                }
            }
        }
    }
    return tax;
 }

 const calculateGrossIncome = (amt) => {
    if(amt <= 300000)
        return amt;
    var gross = 0;
    var calc = 0;
    var n = amt;

    if(amt - 150000 >=0 )
    {
        gross += 150000;
        calc = amt-150000;
        amt = calc;
        calc = 0;
        if(amt - 146250 >= 0)
        {
            gross +=150000;
            calc = amt-146250;
            amt = calc ;
            calc = 0;
            if(amt - 450000 >=0)
            {
                gross += 500000;
                calc = amt-450000;
                amt = calc;
                calc = 0;
                if(amt - 6900000 >= 0)
                {
                    gross += 9200000;
                    calc = amt-6900000;
                    amt = calc;
                    calc = 0;

                    if(n-amt >= 0)
                    {
                        gross += (n-amt)*10/7;
                    }

                }
                else
                {
                    gross += amt*4/3;
                }

            }
            else
            {
                gross += amt*10/9;
            }
        }
    }
    return gross;
 }

app.post('/',(req,res)=>{
    var amt = req.body.income;
    var ans = CalculateTax(amt);
    let rest1  = JSON.stringify(ans);
    res.send("Tax is : " + rest1);
})

app.post('/gross',(req,res)=>{
    var amt = req.body.netIncome;
    var ans = calculateGrossIncome(amt);
    let rest1 = JSON.stringify(ans);
    res.send("Gross Income is : " + rest1);
})


app.listen(3000,()=>{
    console.log("Port running on 3000");
})