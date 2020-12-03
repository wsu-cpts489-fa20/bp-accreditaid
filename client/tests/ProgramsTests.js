import { Selector, ClientFunction, t } from 'testcafe';

fixture `AccreditAid Programs Tests`
    .page `http://127.0.0.1:8081/index.html`;

const getLocalStorageItem = ClientFunction(prop => {
    return localStorage.getItem(prop);
});

export async function Login() {
    await t
        .typeText('#emailInput', 'mykhailo.bykhovtsev@wsu.edu')
        .typeText('#password', 'Qwerty512_32')
        .click('#login');
}

// Tests if program table is visible.
test('ProgramTableTest', async t => {
    await t
        .setNativeDialogHandler(() => true);
    await Login();
    await t
        .wait(500)
        .expect(Selector('#programs-table').visible).eql(true)
        .wait(500);
});


// Test creating new Program.
test('TestCreateNewProgram', async t => {
    await t
        .setNativeDialogHandler(() => true);
    await Login();
    await t
        .expect(Selector('#programs-table').find('td').withText('Test program 1').visible).eql(false)
        .click("#create-program-floating-button")
        .wait(500)
        .expect(Selector('#program-div').visible).eql(true)
        .typeText('#program-name', 'Test program 1')
        .typeText('#program-department', 'Dep 1')
        .typeText('#program-college', 'College 1')
        .typeText('#program-credits', '30')

        // Add 3 Student outcomes
        .typeText('#outcomes-input', 'Analyze a complex computing problem and apply principles of computing and other relevant disciplines to identify solutions.')
        .click("#add-outcome")
        .typeText('#outcomes-input', 'Be silly and not attend lectures')
        .click("#add-outcome")
        .typeText('#outcomes-input', "Communicate effectively in a variety of professional contexts.")
        .click("#add-outcome")

        // Add three performance indicators to first outcome
        .typeText('#outcome-0-indicator-input', 'Decomposes a real-world scenario or problem statement into set of subproblems that need to be addressed in order to solve the original problem.')
        .click("#add-0-indicator")
        .typeText('#outcome-0-indicator-input', 'Identifies constraints and requirements of a problem.')
        .click("#add-0-indicator")
        .typeText('#outcome-0-indicator-input', 'Formulates computing problems in such a way that they can be addressed through approaches and methods appropriate to the discipline.')
        .click("#add-0-indicator")

        // Add one performance indicator to second outcome
        .typeText('#outcome-1-indicator-input', 'Does not attend lectures.')
        .click("#add-1-indicator")
        .wait(500)

        // Submit changes and check if data are present in the table
        .click("#submit-changes")
        .wait(500)
        .expect(Selector('#programs-table').visible).eql(true)
        .expect(Selector('#programs-table').find('td').withText('Test program 1').visible).eql(true)
        .wait(500);
});

// Test editing of the Program.
test('TestEditingProgram', async t => {
    await t
        .setNativeDialogHandler(() => true);
    await Login();
    await t
        // Go into editing/viewing mode of table entry with given text and check if data are correct.
        .click(Selector('#programs-table').find('td').withText('Test program 1').sibling('td').find('button').nth(0))
        .wait(500)
        .expect(Selector('#program-div').visible).eql(true)
        .expect(Selector('#program-name').value).eql("Test program 1")
        .typeText('#program-name', 'Test program 2', { replace: true })

        // Check if performance indicators are correct and match text from previous test
        .expect(Selector('#outcome-1-indicator-0').visible).eql(true)
        .expect(Selector('#outcome-1-indicator-0').textContent).eql("Does not attend lectures.")
        .expect(Selector('#outcome-2').textContent).eql("Communicate effectively in a variety of professional contexts.")

        // Delete first indicator from second student outcome and check if it is deleted
        .click("#outcome-1-indicator-0-delete")
        .expect(Selector('#outcome-1-indicator-0').visible).eql(false)
        .wait(500)

        // Delete second student outcome all together.
        .click("#outcome-1-delete")
        .expect(Selector('#outcome-1').textContent).eql("Communicate effectively in a variety of professional contexts.")
        .wait(500)

        // Add an outcome to the second indicator.
        .typeText('#outcome-1-indicator-input', 'Applies standard rules of grammar, syntax and structure in written and oral work.')
        .click("#add-1-indicator")
        .wait(500)

        // Submit edits and check if changes persisted in table
        .click("#submit-changes")
        .wait(500)
        .expect(Selector('#programs-table').visible).eql(true)
        .expect(Selector('#programs-table').find('td').withText('Test program 2').visible).eql(true)
        .wait(500)

        // Go into entry and verify data changed.
        .click(Selector('#programs-table').find('td').withText('Test program 2').sibling('td').find('button').nth(0))
        .wait(500)
        .expect(Selector('#program-div').visible).eql(true)
        .expect(Selector('#program-name').value).eql("Test program 2")

        .expect(Selector('#outcome-1').textContent).eql("Communicate effectively in a variety of professional contexts.")
        .expect(Selector('#outcome-1-indicator-0').textContent).eql("Applies standard rules of grammar, syntax and structure in written and oral work.")
        .click("#submit-changes")
        .wait(500);
});

// Test deletion of the Program.
test('TestDeletingProgram', async t => {
    await t
        .setNativeDialogHandler(() => true);
    await Login();
    await t
        .click(Selector('#programs-table').find('td').withText('Test program 2').sibling('td').find('button').nth(0))
        .wait(500)
        .expect(Selector('#program-div').visible).eql(true)
        .expect(Selector('#program-name').value).eql("Test program 2")
        .click("#delete-program")
        .click("#confirm-delete")
        .wait(500)

        .expect(Selector('#programs-table').visible).eql(true)
        .expect(Selector('#programs-table').find('td').withText('Test program 2').visible).eql(false)
        .wait(500);
});