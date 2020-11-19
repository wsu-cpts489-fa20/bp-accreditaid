/* AppMode: The enumerated type for AppMode. */

const AppMode = {
    LOGIN: "LoginMode",
    FEED: "FeedMode",
    ROUNDS: "RoundsMode",
    ROUNDS_LOGROUND: "RoundsMode-LogRound",
    ROUNDS_EDITROUND: "RoundsMode-EditRound",
    COURSES: "CoursesMode",
    COURSES_LOGCOURSE: "CoursesMode-LogCourse",
    COURSES_EDITCOURSE: "CoursesMode-EditCourse",
};

Object.freeze(AppMode); //This ensures that the object is immutable.

export default AppMode;