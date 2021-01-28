import React from 'react';
import { render, cleanup, screen, unmount, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Introduction from '../../components/wizard/pension/Introduction';
import TaxResident from '../../components/wizard/pension/TaxResident';
import Nationality from '../../components/wizard/pension/Nationality';
import MaritalStatus from '../../components/wizard/pension/MaritalStatus';
import Gender from '../../components/wizard/pension/Gender';
import FullLegalName from '../../components/wizard/pension/FullLegalName';
import NationalInsurance from '../../components/wizard/pension/NationalInsurance';

/**
 Testing pension first six questions.  

 ACTIVE: active state means the step has not been completed.  The state will become inactive after the step is completed.

 NEXT: the jouney calls a next function each time a step is complete, we can measure success each time next is called.

 MUI: be aware we are currently using a third party Material UI which doesn't use form elements in the standard method.
      this means you should rean up on how MUI elements work in order the test them. 
**/

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

/** Inroduction **/
test('renders pension setup. check that title and button text is as expected', async () => {
  const { getByTestId } = render(<Introduction />);
  const title = getByTestId('title');
  const nextButton = getByTestId('nextButton');

  expect(title).toHaveTextContent('Pension Setup');
  expect(nextButton).toHaveTextContent('OKAY, ASK ME');
});

/** Tax Resident **/
test('renders tax resident, changes checkbox and calls expected functions. Checks active state.', () => {
  const nextCallBack = jest.fn();
  const noCallBack = jest.fn();
  const { container } = render(<TaxResident next={ nextCallBack } handleNotUkTaxResident={ noCallBack } />);
  const activeWrapper = container.querySelector('.question-box');
  const checkboxNo = container.querySelector('#no');
  const checkboxYes = container.querySelector('#yes');
  let checkboxYesActive = checkboxYes.querySelector('.MuiButtonBase-root');
  let checkboxNoActive = checkboxNo.querySelector('.MuiButtonBase-root');

  expect(checkboxYesActive).not.toHaveClass('Mui-checked'); // yes not selected
  expect(checkboxNoActive).not.toHaveClass('Mui-checked'); // no not selected
  
  fireEvent.click(checkboxNo);
  checkboxYesActive = checkboxYes.querySelector('.MuiButtonBase-root');
  checkboxNoActive = checkboxNo.querySelector('.MuiButtonBase-root');

  expect(checkboxYesActive).not.toHaveClass('Mui-checked'); // yes not selected
  expect(checkboxNoActive).toHaveClass('Mui-checked'); // no selected
  expect(noCallBack).toHaveBeenCalledTimes(1);
  expect(nextCallBack).toHaveBeenCalledTimes(0);
  expect(activeWrapper).toHaveClass('active');
  
  fireEvent.click(checkboxYes);
  checkboxYesActive = checkboxYes.querySelector('.MuiButtonBase-root');
  checkboxNoActive = checkboxNo.querySelector('.MuiButtonBase-root');

  expect(checkboxYesActive).toHaveClass('Mui-checked'); // yes selected
  expect(checkboxNoActive).not.toHaveClass('Mui-checked'); // no not selected
  expect(noCallBack).toHaveBeenCalledTimes(1);
  expect(nextCallBack).toHaveBeenCalledTimes(1);
  expect(activeWrapper).not.toHaveClass('active');
})

/** Full legal name **/
test('renders Full Legal Name, checks entries and executes next after validation. Checks active state.', () => {
  const nextCallBack = jest.fn();
  
  const { container } = render(<FullLegalName fname="John" lname="Smith" next={ nextCallBack } />);
  const activeWrapper = container.querySelector('.question-box');
  const selectTitle = container.querySelector('.MuiSelect-nativeInput');
  const selectFirstName = container.querySelector('#first-name');
  const selectLastName = container.querySelector('#last-name');

  expect(activeWrapper).not.toHaveClass('active');
  expect(selectTitle.value).toBe('MR');
  expect(selectFirstName.value).toBe('John');
  expect(selectLastName.value).toBe('Smith');

  // Next has been initiated allowing the user to move on
  expect(nextCallBack).toHaveBeenCalledTimes(1);
  // the wrapper is not active so user can progress
  expect(activeWrapper).not.toHaveClass('active');
});

// Full Legal Name missing values, values added afterwards
test('renders Full Legal Name with missing values, values are then added. Checks active state.', () => {
  const nextCallBack = jest.fn();

  const { container } = render(<FullLegalName fname="" lname="" next={ nextCallBack } />);
  const activeWrapper = container.querySelector('.question-box');
  const selectTitle = container.querySelector('.MuiSelect-nativeInput');
  const selectFirstName = container.querySelector('#first-name');
  const selectLastName = container.querySelector('#last-name');

  expect(activeWrapper).toHaveClass('active');
  expect(selectTitle.value).toBe('MR');
  expect(selectFirstName.value).toBe('');
  expect(selectLastName.value).toBe('');

  // Next has not been initiated preventing the user to move on
  expect(nextCallBack).toHaveBeenCalledTimes(0);

  fireEvent.change(selectTitle, { target: { value: 'DR' } });
  fireEvent.change(selectFirstName, { target: { value: 'John' } });
  fireEvent.change(selectLastName, { target: { value: 'Smith' } });

  expect(selectTitle.value).toBe('DR');
  expect(selectFirstName.value).toBe('John');
  expect(selectLastName.value).toBe('Smith');

  fireEvent.mouseDown(screen.getByLabelText("Title"));
  fireEvent.click(screen.getByText("Mr"));
  fireEvent.keyDown(document.activeElement, {
    key: "Escape",
    code: "Escape"
  });

  // Next has been initiated allowing the user to move on
  expect(nextCallBack).toHaveBeenCalledTimes(1);
  // the wrapper is not active so user can progress
  expect(activeWrapper).not.toHaveClass('active');
});


/** Nationality **/
test("renders nationality renders without a value.  Checks active state. Select is activated and value added. No active state", async () => {
  const nextCallBack = jest.fn();
  const nationalities = [
    {"value":"BRITISH","displayName":"British"},
    {"value":"AFGAN","displayName":"Afghanistan"},
    {"value":"ALBANIAN","displayName":"Albanian"},
    {"value":"ALGERIAN","displayName":"Algerian"}
  ];
  const { container } = render(<Nationality nationalities={ nationalities } nationality={ null } next={ nextCallBack }  />);
  const activeWrapper = container.querySelector('.question-box');

  expect(activeWrapper).toHaveClass('active');

  fireEvent.mouseDown(screen.getByLabelText("Nationality"));
  fireEvent.click(screen.getByText("British"));
  fireEvent.keyDown(document.activeElement, {
    key: "Escape",
    code: "Escape"
  });

  // Nationality selected so user can proceed to next step
  expect(activeWrapper).not.toHaveClass('active');
});


/** Marital Status **/
test('renders martial status. All selections are working. Checks active state.', () => {
  const nextCallBack = jest.fn();

  // use an empty string to test the component
  const maritalStatus = '';
  const { container } = render(<MaritalStatus maritalStatus={ maritalStatus } next={ nextCallBack }  />);
  const activeWrapper = container.querySelector('.question-box');
  const selectSingle = container.querySelector('input[value="SINGLE"]');
  const selectMarried = container.querySelector('input[value="MARRIED"]');
  const selectDivorsed = container.querySelector('input[value="DIVORCED"]');
  const selectWidowed = container.querySelector('input[value="WIDOWED"]');

  // next shouldn't have been called
  expect(nextCallBack).not.toHaveBeenCalled();

  // the wrapper is still active
  expect(activeWrapper).toHaveClass('active');

  // click radio Single
  fireEvent.click(selectSingle);
  expect(nextCallBack).toHaveBeenCalledTimes(2);
  // the wrapper is not active so user can progress
  expect(activeWrapper).not.toHaveClass('active');

  // click radio Married
  fireEvent.click(selectMarried);
  expect(nextCallBack).toHaveBeenCalledTimes(3);
  // the wrapper is not active so user can progress
  expect(activeWrapper).not.toHaveClass('active');

  // click radio Divorsed
  fireEvent.click(selectDivorsed);
  expect(nextCallBack).toHaveBeenCalledTimes(4);
  // the wrapper is not active so user can progress
  expect(activeWrapper).not.toHaveClass('active');

  // click radio Widowed
  fireEvent.click(selectWidowed);
  expect(nextCallBack).toHaveBeenCalledTimes(5);
  // the wrapper is not active so user can progress
  expect(activeWrapper).not.toHaveClass('active');
});

/** Gender **/
test('renders gender. Checks active state.', () => {
  const nextCallBack = jest.fn();
  // use an empty string to test the component
  const gender = '';

  const { container } = render(<Gender gender={ gender } next={ nextCallBack }  />);
  const activeWrapper = container.querySelector('.question-box');
  const selectMale = container.querySelector('input[value="MALE"]');
  const selectFemale = container.querySelector('input[value="FEMALE"]');

  // next shouldn't have been called
  expect(nextCallBack).not.toHaveBeenCalled();

  // the wrapper is still active
  expect(activeWrapper).toHaveClass('active');

  // click radio Male
  fireEvent.click(selectMale);
  expect(nextCallBack).toHaveBeenCalledTimes(2);
  // the wrapper is not active so user can progress
  expect(activeWrapper).not.toHaveClass('active');

  // click radio Female
  fireEvent.click(selectFemale);
  expect(nextCallBack).toHaveBeenCalledTimes(3);
  // the wrapper is not active so user can progress
  expect(activeWrapper).not.toHaveClass('active');
});

/** National Insurance **/
// National Insurance value not available
test('renders national Insurance without updating it', () => {
  const nextCallBack = jest.fn();

  const { container } = render(<NationalInsurance next={ nextCallBack }  />);
  const activeWrapper = container.querySelector('.question-box');
  const selectNationalInsurance = container.querySelector('#national-insurance');

  // the value is empty
  expect(selectNationalInsurance.value).toBe('');

  // the wrapper is active so user cannot progress
  expect(activeWrapper).toHaveClass('active');
});

// National Insurance value already available
test('renders national Insurance with correct value', () => {
  const inputValue = 'NW-234242-A';
  const nextCallBack = jest.fn();

  const { container, getByTestId } = render(<NationalInsurance insurance={ inputValue } next={ nextCallBack }  />);
  const activeWrapper = container.querySelector('.question-box');
  const selectNationalInsurance = container.querySelector('#national-insurance');

   // the value is valid 
  expect(selectNationalInsurance.value).toBe(inputValue);

  // the wrapper is not active so user can progress
  expect(activeWrapper).not.toHaveClass('active');

  // correct value is added, the next button will appear
  const nextButton = getByTestId('nextButton');
  expect(nextButton).toHaveTextContent('Next');
});

