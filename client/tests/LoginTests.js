import { Selector, ClientFunction } from 'testcafe';

fixture `Accredit Aid Login Tests`
    .page `http://127.0.0.1:8081/index.html`;

const getLocalStorageItem = ClientFunction(prop => {
    return localStorage.getItem(prop);
});

// Test that checks if login works.
test('Login', async t => {
    await t
        .typeText('#emailInput', 'test.admin@wsu.edu')
        .typeText('#password', 'Password1234')
        .typeText('#password', 'Aaaaaaa8')
        .click('#login')
        .wait(500)
        .expect(Selector('#programs-table').visible).eql(true)
        .wait(1000);
});

// Test that checks if login works.
test('LoginFailed', async t => {
    await t
        .typeText('#emailInput', 'test.admin@wsu.edu')
        .typeText('#password', 'NotTheRightPassword')
        .click('#login')
        .wait(500)
        .expect(Selector('#programs-table').visible).eql(false)
        .expect(Selector('#emailInput').visible).eql(true)
        .wait(1000);
});