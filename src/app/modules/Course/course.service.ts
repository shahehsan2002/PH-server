import { Course } from "./course.model"

const createCourseIntoDB = async () => {
    const result = await Course.create();
    return result;
}


export const CourseServices = {
    createCourseIntoDB
}