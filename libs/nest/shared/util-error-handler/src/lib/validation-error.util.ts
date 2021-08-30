import { ErrorDto } from '@dm/shared/data-access';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

export const dmValidationPipe = new ValidationPipe({
  transform: true,
  disableErrorMessages: false,
  exceptionFactory: (errors) => {
    const errorDto: ErrorDto = {
      statusCode: 400,
      error: 'Bad Request',
      fieldErrors: errors.map((error) => ({
        field: error.property,
        codes: Object.keys(error.constraints),
        messages: Object.values(error.constraints),
      })),
    };

    return new BadRequestException(errorDto);
  },
});
