# AcreditAid

AcreditAid is a webapp designed to assist university program administrators, instructors, and ABET course evaluators with tracking the fullfillment of ABET course requirements.

## Tech stack
AcreditAid is built on the MERN stack. Deliverables are stored in S3.

### Milestone 3
#### Summary of work done
  -Created Instructor page to display dashboard of assigned courses for instructor 
  -Created Courseinfo page to display all info for course
  -Added "Course Overview", "Materials", "Readings", "Deliverables", and "Course Files tabs
  -Each tab contains information about the course, including files such as the syllabus or course deliverables
  -Implemented system for files to be uploaded to the server and routed to an s3 bucket. Created controls to view and delete file as well.
  
#### Example of work done
https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/master/client/src/components/CourseInfo/CourseInfo.jsx
https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/master/server/routes/api/s3.js

Gif of tests running
https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/master/client/tests/InstructorTests.gif


### Milestone 2
#### Summary of work done
  -Created ProgramsPage to display all of the programs created by admins
  -Created ProgramForm for admins to add and edit programs
  -Created CoursesPage to display all of the courses created by admins
  -Created CoursesForm for admins to add and edit programs
  -Created an email page for admins to send email invites to instructors
  -Fixed the deployment process so that the react code is built on deployment to the server
  -Developed the backend routes further to allow the CRUD operations used above
  
#### Example of work done
https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/master/client/src/components/ProgramsPage/Programs.js
https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/master/server/routes/api/programs.js

Gif of tests running
https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/master/client/tests/Milestone2Tests.gif

### Milestone 3

#### Summary of work done
  TODO

#### Examples of work done
  TODO

Gif of tests running
https://github.com/wsu-cpts489-fa20/bp-accreditaid/blob/master/client/tests/Milestone3ProgramTests.gif
