import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './OfferedCourse.validation';
import { OfferedCourseController } from './OfferedCourse.controller';

const router = express.Router();

router.get('/', OfferedCourseController.getAllOfferedCourses);

router.get('/:id', OfferedCourseController.getSingleOfferedCourses);

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse
);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourse
);

router.delete('/:id', OfferedCourseController.deleteOfferedCourse);

export const offeredCourseRoutes = router;
