import { Selector, ClientFunction, t } from 'testcafe';

fixture `AccreditAid Deliverables Tests`
    .page `http://127.0.0.1:8081/index.html`;

const getLocalStorageItem = ClientFunction(prop => {
    return localStorage.getItem(prop);
});

export async function LoginAndGoToDeliverables() {
    await t
        .typeText('#emailInput', 'test.admin@wsu.edu')
        .typeText('#password', 'Password1234')
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
        .typeText('#deliverable-name', 'Deliverable 1')
        .typeText('#deliverable-description', 'This is a deliverable.')
        .click('#deliverables-submit')
        .wait(1000)
        .expect(Selector('#deliverables-table').visible).eql(true)  
        .expect(Selector('#deliverables-table').find('td').withText('Deliverable 1').visible).eql(true)
        .wait(500);
});

test('TestUpdateWorkSampleLabels', async t => {
    await t
        .setNativeDialogHandler(() => true);
    await LoginAndGoToDeliverables();
    await t
        .wait(300)
        .click('#add-deliverable-button')
        .wait(500)
        .typeText('#deliverable-name', 'Deliverable Name')
        .typeText('#deliverable-description', 'Deliverable Description')
        .click('#delete-sample-2')
        .click('#add-sample')
        .click('#add-sample')
        .wait(300)
        .typeText('#performance-samples-2', '-A')
        .typeText('#performance-samples-3', '-B')
        .click('#deliverables-submit')
        .wait(1000)
        .expect(Selector('#deliverables-table').visible).eql(true) 
        .expect(Selector('#deliverables-table').find('td').withText(
            'High, Medium, None-A, None-B').visible).eql(true)
});

test('TestUpdateWorkSampleLabels', async t => {
    await t
        .setNativeDialogHandler(() => true);
    await LoginAndGoToDeliverables();
    await t
        .wait(300)
        .click('#add-deliverable-button')
        .wait(500)
        .typeText('#deliverable-name', 'Deliverable Name')
        .typeText('#deliverable-description', 'Deliverable Description')
        .click('#delete-sample-2')
        .click('#delete-sample-1')
        .click('#delete-sample-0')
        .click('#deliverables-submit')
        .wait(1000)
        .expect(Selector('#deliverables-table').visible).eql(true) 
        .expect(Selector('#deliverables-table').find('td').withText('N/A').visible).eql(true)
});

