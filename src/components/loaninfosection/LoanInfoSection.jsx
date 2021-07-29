import { Grid, Paper } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/contextStore";

const LoanInfoSection = () => {
  const { amount, tenure, interestRate } = useContext(StoreContext);
  const [loanEmi, setLoanEmi] = useState();
  const [totalPayable, setTotalPayable] = useState();
  const [totalPayment, setTotalPayment] = useState();

  useEffect(() => {
    console.log(amount);
    console.log(tenure);
    console.log(interestRate);
    let interest=interestRate/1200;
    let term=tenure*12;
    let top = Math.pow((1+interest),term);
    let bottom = top - 1;
    let ratio = top/bottom;
    const emi =amount*interest*ratio;

    const totalPayment = emi * term;
    setTotalPayment(totalPayment);
    setTotalPayable(totalPayment - amount);
    setLoanEmi(emi);
  }, [amount, tenure, interestRate]);

  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <Paper elevation={3}>
            <h3>Loan Emi</h3>
            <h3>{loanEmi ? Math.round(loanEmi) : 0}</h3>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3}>
            <h3>Total Interest Payable</h3>
            <h3>Rs.{ totalPayable? Math.round(totalPayable) : 0}</h3>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <h3>Total Payment(Principal + interest)</h3>
            <h3>Rs. { totalPayment? Math.round(totalPayment):0}</h3>
          </Paper>
        </Grid>
      </Grid>

      
    </div>
  );
};

export default LoanInfoSection;
