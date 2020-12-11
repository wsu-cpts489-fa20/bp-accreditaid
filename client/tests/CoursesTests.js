import { Selector, ClientFunction, t } from 'testcafe';

fixture `AccreditAid Courses Tests`
    .page `http://127.0.0.1:8081/index.html`;

const getLocalStorageItem = ClientFunction(prop => {
    return localStorage.getItem(prop);
});

export async function LoginAndGoToCourses() {
    await t
        .typeText('#emailInput', 'test.admin@wsu.edu')
        .typeText('#password', 'Password1234')
        .click('#login')
        .click("#program-edit-0")
        .click("#edit-courses")
}

// Tests if courses table is visible.
test("CoursesTableTest", async t => {
    await t
        .setNativeDialogHandler(() => true);
    await LoginAndGoToCourses();
    await t
        .expect(Selector('#courses-table').visible).eql(true)
        
});

// Test creating new course.
test('TestCreateNewCourse', async t => {
    await t
        .setNativeDialogHandler(() => true);
    await LoginAndGoToCourses();
    await t
        .wait(300)
        .click("#create-course-floating-button")
        .wait(500)
        .expect(Selector("#course-form").visible).eql(true)
        .typeText('#course-name', 'Web Development')
        .typeText('#course-number', "489")
        .typeText('#course-prefix', 'CPTS')
        .typeText('#course-credits', '5')
        .typeText("#course-prereqs", "None")
        .typeText("#course-instructorname", "Micah Priddis")
        .typeText("#course-instructoremail", "micah.priddis@wsu.edu")
        .click("#course-submit")
        .wait(1000)
        .expect(Selector('#courses-table').visible).eql(true)
        .expect(Selector('#courses-table').find('td').withText('Web Development').visible).eql(true)
        .wait(500);
});

// Test deletion of the Program.
test('TestDeletingCourse', async t => {


    await t
        .setNativeDialogHandler(() => true);
    await LoginAndGoToCourses();
    await t
        .click(Selector('#courses-table').find('td').withText('Web Development').sibling('td').find('button').nth(1))
        .wait(500)
        .expect(Selector('#course-form').visible).eql(true)
        .click("#delete-course")
        .click("#confirm-delete")
        .wait(500)

        .expect(Selector('#courses-table').visible).eql(true)
        .expect(Selector('#courses-table').find('td').withText('Web Development').visible).eql(false)
        .wait(500);


    
});