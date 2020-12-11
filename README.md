# AcreditAid

AcreditAid is a webapp designed to assist university program administrators, instructors, and ABET course evaluators with tracking the fullfillment of ABET course requirements.

## Tech stack
AcreditAid is built on the MERN stack. Deliverables are stored in S3.


### Milestone 4
#### Summary of work done
  - Created EvaluatorView table to display the PI's from each SO and how they were fullfilled by the instructor
  - Removed write permissions from the accountype "ABET Evaluator"
  - Added modal for instructors to invite Evaluators to acreditaid
  
  
### Example of work done
  - https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/b886dec0889ce5ab85bf29b0ef7ff6b9ec530c3a/client/src/components/CoursesPage/EvaluatorView.jsx
  - https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/b886dec0889ce5ab85bf29b0ef7ff6b9ec530c3a/client/src/components/CourseInfo/ViewDeliverable.jsx
  
### Gif of tests running
  - https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/master/client/tests/EvaluatorTests.gif

### Milestone 3
#### Summary of work done
  - Created Instructor page to display dashboard of assigned courses for instructor 
  - Created Courseinfo page to display all info for course
  - Added "Course Overview", "Materials", "Readings", "Deliverables", and "Course Files tabs
  - Each tab contains information about the course, including files such as the syllabus or course deliverables
  - Added Student Outcomes and Perfomance indicators to the Creates/View/Edit for for the Program
  - Added Deliverables view for a course for the instrucor's side
  - Added Delverables addition for a course for the admin's side
  - Updated styling to be consitent and better
  - Added ability to add labels to deliverables
  - Added adminDeliverables, email, instructor tests
  - Updated Program's tests to reflect additions of SOs and PIs inputs
  - Added ability to import SOs and PIs from a CSV file 
  - Implemented system for files to be uploaded to the server and routed to an s3 bucket. Created controls to view and delete file as well.
  
#### Example of work done
  -  https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/master/client/src/components/CoursesPage/Deliverables.js
  -  https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/master/client/src/components/CoursesPage/LabelsForm.js
  -  https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/master/client/src/components/ProgramsPage/PerformanceIndicator.js
  -  https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/master/server/routes/api/s3.js
  -  https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/master/client/src/components/CourseInfo/CourseFilesTab.jsx

#### Gif of tests running
  - https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/master/client/tests/InstructorTests.gif
  - https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/master/client/tests/Milestone3ProgramTests.gif


### Milestone 2
#### Summary of work done
  - Created ProgramsPage to display all of the programs created by admins
  - Created ProgramForm for admins to add and edit programs
  - Created CoursesPage to display all of the courses created by admins
  - Created CoursesForm for admins to add and edit programs
  - Created an email page for admins to send email invites to instructors
  - Fixed the deployment process so that the react code is built on deployment to the server
  - Developed the backend routes further to allow the CRUD operations used above
  
#### Example of work done
- https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/master/client/src/components/ProgramsPage/Programs.js
- https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/master/server/routes/api/programs.js

#### Gif of tests running
https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/master/client/tests/Milestone2Tests.gif
