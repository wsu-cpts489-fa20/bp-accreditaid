import { Selector, ClientFunction, t } from 'testcafe';

fixture `AccreditAid Courses Tests`
    .page `http://127.0.0.1:8081/index.html`;

const getLocalStorageItem = ClientFunction(prop => {
    return localStorage.getItem(prop);
});

export async function LoginAndGoToCoursesInstructor() {
    await t
        .typeText('#emailInput', 'test.instructor@wsu.edu')
        .typeText('#password', 'Password1234')
        .click('#login')
}

export async function LoginAndGoToCoursesAdmin() {
  await t
      .typeText('#emailInput', 'admin@hotmail.com')
      .typeText('#password', 'Sultan100%')
      .click('#login')
}

// Tests if instructor percentage is not equal to zero
test("InstructorPrecentageTest", async t => {
  await t
      .setNativeDialogHandler(() => true);
  await LoginAndGoToCoursesInstructor();
  await t
      .expect(Selector('#courses-table').visible).eql(true)
      .click(Selector('#courses-table').find('td').withText('Sample course').sibling('td').find('button').nth(0))   
      .wait(1000)  
      .click(Selector('#root').find('ul').find('li').withText('Deliverables'))
      .wait(1000)
      .click(Selector('#courses-table').find('button'))
      .wait(1000)
      .click(Selector('.modal').find('.modal-header').find('button'))
      .wait(1000)
      .expect(Selector('#courses-table').find('td').withText('60')).notEql('0')
});

// Tests if admins courses % is not zero
test("InstructorPrecentageTest", async t => {
  await t
      .setNativeDialogHandler(() => true);
  await LoginAndGoToCoursesAdmin();
  await t
      .click(Selector('#programs-table').find('button')) 
      .wait(1000)
      .click(Selector('#root').find('button').withText('View Courses')) 
      .wait(1000) 
      .expect(Selector('#courses-table').find('td').withText('70')).notEql('0')
      .expect(Selector('#courses-table').find('td').withText('50')).notEql('0')     
});

// Tests if programs % completion, Courses, and Instructors is non-zero
test("InstructorPrecentageTest", async t => {
  await t
      .setNativeDialogHandler(() => true);
  await LoginAndGoToCoursesAdmin();
  await t
      .expect(Selector('#programs-table').find('td').withText('4')).notEql('0')   
      .expect(Selector('#programs-table').find('td').withText('2')).notEql('0')
      .expect(Selector('#programs-table').find('td').withText('42.5')).notEql('0') 
});