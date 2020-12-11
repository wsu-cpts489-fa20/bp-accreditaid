import { Selector, ClientFunction, t } from 'testcafe';

fixture `AccreditAid Courses Tests`
    .page `http://127.0.0.1:8081/index.html`;

const getLocalStorageItem = ClientFunction(prop => {
    return localStorage.getItem(prop);
});

export async function LoginAndGoToCourses() {
    await t
        .typeText('#emailInput', 'test.instructor@wsu.edu')
        .typeText('#password', 'Password1234')
        .click('#login')
}

// Tests if course is in table
test("CoursesTableTest", async t => {
    await t
        .setNativeDialogHandler(() => true);
    await LoginAndGoToCourses();
    await t
        .expect(Selector('#courses-table').visible).eql(true)
        .expect(Selector('#courses-table').find('td').withText('Course2').visible).eql(true)     
});

// Tests if course info can be updated
test("CourseInfoTest1", async t => {
    await t
        .setNativeDialogHandler(() => true);
    await LoginAndGoToCourses();
    await t
        .expect(Selector('#courses-table').visible).eql(true)
        .expect(Selector('#courses-table').find('td').withText('Course2').visible).eql(true)
        .click(Selector('#courses-table').find('td').withText('Course2').sibling('td').find('button').nth(0))
        .expect(Selector('#navigation-div').visible).eql(true)
        .expect(Selector('#course-students').value).notEql("50")
        .typeText('#course-students', '50', { replace: true })
        .click(Selector('#course-submit'))
});


// Tests if course info can be updated again to demonstrate the change previously
test("CourseInfoTest2", async t => {
    await t
        .setNativeDialogHandler(() => true);
    await LoginAndGoToCourses();
    await t
        .expect(Selector('#courses-table').visible).eql(true)
        .expect(Selector('#courses-table').find('td').withText('Course2').visible).eql(true)
        .click(Selector('#courses-table').find('td').withText('Course2').sibling('td').find('button').nth(0))
        .expect(Selector('#navigation-div').visible).eql(true)
        .expect(Selector('#course-students').value).notEql("100")
        .typeText('#course-students', '100', { replace: true })
        .click(Selector('#course-submit'))
        
});