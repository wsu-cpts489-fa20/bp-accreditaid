/* AppMode: The enumerated type for AppMode. */

const UserType = {
    INSTRUCTOR: 'Instructor',
    ADMIN: 'College Admin',
    ACREDITADMIN: 'ABET Evaluator'
};

Object.freeze(UserType); //This ensures that the object is immutable.

export default UserType;