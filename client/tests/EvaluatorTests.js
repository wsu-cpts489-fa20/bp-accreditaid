import { Selector, ClientFunction, t } from 'testcafe';


fixture `AccreditAid Courses Tests`.page `http://127.0.0.1:8081/index.html`;


export async function LoginAndGoToCourses() {
    await t
        .typeText('#emailInput', 'test.eval@wsu.edu')
        .typeText('#password', 'Password1234')
        .click('#login')
}

// Tests if Programs table is visible.
test("testEvalLogin", async t => {
    await t
        .setNativeDialogHandler(() => true);
    await LoginAndGoToCourses();
    await t
        .expect(Selector('#programs-table').visible).eql(true)
        
});

// Tests if student outcomes are visible
test("testSOsVisibleToEval", async t => {
    await t
        .setNativeDialogHandler(() => true);
    await LoginAndGoToCourses();
    await t
        .expect(Selector('#programs-table').visible).eql(true)
        .click("#program-edit-0")
        .expect(Selector('#StudentOutcomesList').visible).eql(true)
        
});

// Tests if evaluator can view the courses table
test("testCoursesVisibleToEval", async t => {
    await t
        .setNativeDialogHandler(() => true);
    await LoginAndGoToCourses();
    await t
        .expect(Selector('#programs-table').visible).eql(true)
        .click("#program-edit-0")
        .click("#edit-courses")
        .expect(Selector('#courses-table').visible).eql(true)
        
});

// Tests if evaluator can view the eval table
test("testEvalView", async t => {
    await t
        .setNativeDialogHandler(() => true);
    await LoginAndGoToCourses();
    await t
        .expect(Selector('#programs-table').visible).eql(true)
        .click("#program-edit-0")
        .click("#edit-courses")
        .click("#eval-tab")
        .expect(Selector('#eval-table').visible).eql(true)
        
});


// Tests if evaluator can view the courses table
test("testCourseInfoPage", async t => {
    await t
        .setNativeDialogHandler(() => true);
    await LoginAndGoToCourses();
    await t
        .expect(Selector('#programs-table').visible).eql(true)
        .click("#program-edit-0")
        .click("#edit-courses")
        .click("#course-edit-0")
        .expect(Selector('#course-form').visible).eql(true)
        
});