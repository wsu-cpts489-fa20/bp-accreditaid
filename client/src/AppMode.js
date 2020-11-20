/* AppMode: The enumerated type for AppMode. */

const AppMode = {
    LOGIN: "LoginMode",
    FEED: "FeedMode",
    ROUNDS: "RoundsMode",
    ROUNDS_LOGROUND: "RoundsMode-LogRound",
    ROUNDS_EDITROUND: "RoundsMode-EditRound",
    PROGRAMS: "ProgramsMode",
    PROGRAMS_LOGPROGRAM: "ProgramsMode-LogProgram",
    PROGRAMS_EDITPROGRAM: "ProgramsMode-EditProgram",
    COURSES: "CoursesMode"
};

Object.freeze(AppMode); //This ensures that the object is immutable.

export default AppMode;