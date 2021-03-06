/* AppMode: The enumerated type for AppMode. */

const AppMode = {
    LOGIN: "LoginMode",
    ROUNDS: "RoundsMode",
    ROUNDS_LOGROUND: "RoundsMode-LogRound",
    ROUNDS_EDITROUND: "RoundsMode-EditRound",
    COURSES: "CoursesMode",
    COURSES_LOGCOURSE: "CoursesMode-LogCourse",
    COURSES_EDITCOURSE: "CoursesMode-EditCourse",
    DELIVERABLES: "DeliverablesMode",
    DELIVERABLES_EDITDELIVERABLE: "DeliverablesMode-EditDeliverable",
    DELIVERABLES_LOGDELIVERABLE: "DeliverablesMode-LogDeliverable",
    PROGRAMS: "ProgramsMode",
    PROGRAMS_LOGPROGRAM: "ProgramsMode-LogProgram",
    PROGRAMS_EDITPROGRAM: "ProgramsMode-EditProgram",
    INSTRUCTOR_DASHBOARD: "Instructor Dashboard",
    COURSE_INFO: "Course Info"
};

Object.freeze(AppMode); //This ensures that the object is immutable.

export default AppMode;