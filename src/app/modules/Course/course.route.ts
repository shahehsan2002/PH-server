import express from 'express';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// Create course route
router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse
);

// Get single course route
router.get('/:id', CourseControllers.getSingleCourse);

// Get all course route
router.get('/', CourseControllers.getAllCourses);

// Update course route
router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse
);

// Delete course route
router.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoutes = router;
