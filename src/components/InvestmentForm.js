import { useState, useReducer } from 'react';
const InvestmentFormFields = {
    principal_amt: {
        label: "Principal Amount: Initial Investment",
        info: "The amount of money you're starting with.",
        type: "text",
        id: "principal_amt",
        name: "principal_amt",
        className: "input-style",
        validation: {
            mandatory: true,
            min: 1000,
        }
    },
    annual_growth_rate: {
        label: "Annual Interest Rate: (%)",
        info: "The annual interest rate for this investment or savings account.",
        type: "text",
        id: "annual_growth_rate",
        name: "annual_growth_rate",
        className: "input-style",
        validation: {
            mandatory: true,
        }
    },
    investment_period: {
        label: "Investment Period: Time Horizon (Years)",
        info: "The number of years your money will be invested.",
        type: "text",
        id: "investment_period",
        name: "investment_period",
        className: "input-style",
        validation: {
            mandatory: true,
        }
    },
    compounding_frequency: {
        label: "Interest Frequency ( in Months )",
        info: "How often the interest is calculated and added to your investment.",
        type: "text",
        id: "compounding_frequency",
        name: "compounding_frequency",
        className: "input-style",
        validation: {
            mandatory: true,
        }
    },
    tax_rate: {
        label: "Tax Rate: Tax Rate on Gains (%)",
        info: "The percentage of your investment gains that you'll pay in taxes.",
        type: "text",
        id: "tax_rate",
        name: "tax_rate",
        className: "input-style",
    },
    expected_return_rate: {
        label: "Expected Return Rate: Expected Annual Return (%)",
        info: "The average rate of return you anticipate on your investment.",
        type: "text",
        id: "expected_return_rate",
        name: "expected_return_rate",
        className: "input-style",
        validation: {
            mandatory: true,
        }
    },
}

const InvestmentForm = (props) => {

    const reducer = (state, action) => {
        return { ...state, ...action };
    };
    const [error, setError] = useReducer(reducer, {
        principal_amt: '',
        annual_growth_rate: '',
        investment_period: '',
        expected_return_rate: '',
        tax_rate: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const data = Object.fromEntries(form.entries());

        let vCount = 0;
        Object.keys(InvestmentFormFields).map((key) => {
            const field = InvestmentFormFields[key];
            if (field.validation?.mandatory && !data[field.name]) {
                vCount++;
                setError({
                    [key]: field.label + ' is required',
                });
            } else {
                const value = parseFloat(data[field.name]);

                if (field.validation?.min && value < field.validation.min) {
                    vCount++;
                    setError({
                        [key]: field.label + ' should be greater than ' + field.validation.min
                    });
                } else {
                    setError({
                        [key]: ''
                    })
                }

            }
        });

        if (vCount > 0) {
            return;
        }

        props.data({
            principal_amt: data.principal_amt,
            annual_growth_rate: data.annual_growth_rate,
            investment_period: data.investment_period,
            expected_return_rate: data.expected_return_rate,
            tax_rate: data.tax_rate
        });

        // reset the form
        e.target.reset();
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="md:col-span-2 text-red-400 text-sm"></div>
                    {
                        Object.keys(InvestmentFormFields).map((key) => {
                            const field = InvestmentFormFields[key];
                            return (
                                <div key={field.id} className="form-control">
                                    <label htmlFor={field.id}>
                                        {field.label}
                                        {
                                            field?.info ? (
                                                <span className="info-icon" title={field.info}>
                                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                                </span>

                                            ) : ('')
                                        }
                                    </label>
                                    <input type={field.type} id={field.id} name={field.name} className={field.className} />
                                    <span className="text-red-400 text-sm">{error[key]}</span>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="flex justify-center mt-5">
                    <button type="submit" className="btn px-14">Calculate</button>
                </div>
            </form>
        </>
    )
}

export {
    InvestmentForm
}