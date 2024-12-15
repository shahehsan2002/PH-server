import { Course } from "./course.model"

const createCourseIntoDB = async () => {
    const result = await Course.create();
    return result;
}

const getAllCoursesFromDB = async () => {
    const result = await Course.find();
    return result;
}

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB
}