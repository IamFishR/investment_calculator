


function calculateInvestmentOverTime(principal, annualInterestRate, investmentPeriod, expectedReturnRate, tax) {
    const futureValues = [];
    let currentPrincipal = parseFloat(principal);

    for (let year = 1; year <= parseInt(investmentPeriod); year++) {
        // Calculate the interest for the current year
        const interest = currentPrincipal * (parseFloat(annualInterestRate) / 100);

        // Calculate the total value at the end of the year
        const totalValue = currentPrincipal + interest;

        // Store the result for this year
        futureValues.push({
            year,
            principal: currentPrincipal.toFixed(2),
            interest: interest.toFixed(2) + ' (' + annualInterestRate + '%)',
            totalValue: totalValue.toFixed(2),
            expectedReturn: (totalValue * (parseFloat(expectedReturnRate) / 100)).toFixed(2) + ' (' + expectedReturnRate + '%)',
            principalamtOnExpectedReturn: (totalValue * (1 + (parseFloat(expectedReturnRate) / 100))).toFixed(2),
        });

        // Update the principal for the next year with the total value
        currentPrincipal = totalValue;

        // on last year calculate the tax
        if (year === parseInt(investmentPeriod)) {
            const taxAmount = (totalValue - principal) * (parseFloat(tax) / 100);
            futureValues[year - 1].taxAmount = taxAmount.toFixed(2) + ' (' + tax + '%)';
            futureValues[year - 1].totalValue = (totalValue - taxAmount).toFixed(2);

            // calculate the total profit and expected return
            const totalProfit = (totalValue - principal).toFixed(2);
            futureValues[year - 1].totalProfit = totalProfit;
        }
    }

    return futureValues;
}


const InvestmentList = (props) => {

    const investmentTable = calculateInvestmentOverTime(
        props.investmentTable.principal_amt,
        props.investmentTable.annual_growth_rate,
        props.investmentTable.investment_period,
        props.investmentTable.expected_return_rate,
        props.investmentTable.tax_rate || 0
    );

    return (
        investmentTable.length > 0 ? (
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left text-white">Year</th>
                        <th className="text-left text-white">Amount</th>
                        <th className="text-left text-white">Interest</th>
                        <th className="text-left text-white">Total</th>
                        <th className="text-left text-white">Expected Return</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        investmentTable.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-left text-white">{item.year}</td>
                                    <td className="text-left text-white">{item.principal}</td>
                                    <td className="text-left text-white">{item.interest}</td>
                                    <td className="text-left text-white">{item.totalValue}</td>
                                    <td className="text-left text-white">{item.principalamtOnExpectedReturn}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        ) : (
            <p className="text-white">No data</p>
        )

    )
}

export {
    InvestmentList
}