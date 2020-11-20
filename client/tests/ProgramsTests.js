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
        .wait(1000);
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
        .click("#submit-changes")
        .wait(1000)
        .expect(Selector('#programs-table').visible).eql(true)
        .expect(Selector('#programs-table').find('td').withText('Test program 1').visible).eql(true)
        .wait(500);
});

// Test deletion of the Program.
test('TestDeletingProgram', async t => {
    await t
        .setNativeDialogHandler(() => true);
    await Login();
    await t
        .click(Selector('#programs-table').find('td').withText('Test program 1').sibling('td').find('button').nth(0))
        .wait(500)
        .expect(Selector('#program-div').visible).eql(true)
        .expect(Selector('#program-name').value).eql("Test program 1")
        .click("#delete-program")
        .click("#confirm-delete")
        .wait(500)

        .expect(Selector('#programs-table').visible).eql(true)
        .expect(Selector('#programs-table').find('td').withText('Test program 1').visible).eql(false)
        .wait(500);
});