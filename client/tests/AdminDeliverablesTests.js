import { Selector, ClientFunction, t } from 'testcafe';

fixture `AccreditAid Deliverables Tests`
    .page `http://127.0.0.1:8081/index.html`;

const getLocalStorageItem = ClientFunction(prop => {
    return localStorage.getItem(prop);
});

export async function LoginAndGoToDeliverables() {
    await t
        .typeText('#emailInput', 'ase@gmail.com')
        .typeText('#password', 'Aaaaaaa8')
        .click('#login')
        .click('#program-edit-0')
        .click('#edit-courses')
        .click('#deliverables-0')
}

test('DeliverablesTableVisible', async t => {
    await t
        .setNativeDialogHandler(() => true);
    await LoginAndGoToDeliverables();
    await t
        .wait(300)
        .expect(Selector('#deliverables-table').visible).eql(true)        
});

test('TestAddDeliverable', async t => {
    await t
        .setNativeDialogHandler(() => true);
    await LoginAndGoToDeliverables();
    await t
        .wait(300)
        .click('#add-deliverable-button')
        .wait(500)
        .typeText('#deliverable-name', 'Deliverable Name')
        .typeText('#deliverable-description', 'Deliverable Description')
        .click('#deliverables-submit')
        .wait(1000)
        .expect(Selector('#deliverables-table').visible).eql(true)  
        .expect(Selector('#deliverables-table').find('td').withText('Deliverable Name').visible).eql(true)
        .wait(500);
});

test('TestUpdateWorkSampleLabels', async t => {
    await t
        .setNativeDialogHandler(() => true);
    await LoginAndGoToDeliverables();
    await t
        .wait(300)
        .click('#edit-labels-button')
        .wait(500)
        .click('#delete-label-2')
        .click('#delete-label-1')
        .click('#add-label')
        .click('#add-label')
        .click('#add-label')
});

