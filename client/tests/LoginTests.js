import { Selector, ClientFunction } from 'testcafe';

fixture `Accredit Aid Login Tests`
    .page `http://127.0.0.1:8081/index.html`;

const getLocalStorageItem = ClientFunction(prop => {
    return localStorage.getItem(prop);
});

// Test that checks if login works.
test('Login', async t => {
    await t
        .typeText('#emailInput', 'mykhailo.bykhovtsev@wsu.edu')
        .typeText('#password', 'Qwerty512_32')
        .click('#login')
        .wait(500)
        .expect(Selector('#programs-table').visible).eql(true)
        .wait(1000);
});

// Test that checks if login works.
test('LoginFailed', async t => {
    await t
        .typeText('#emailInput', 'mykhailo@gmail.com')
        .typeText('#password', 'Qdsgsdg')
        .click('#login')
        .wait(500)
        .expect(Selector('#programs-table').visible).eql(false)
        .expect(Selector('#emailInput').visible).eql(true)
        .wait(1000);
});