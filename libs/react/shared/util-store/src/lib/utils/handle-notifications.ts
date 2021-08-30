import { ConfirmationMessageDto } from '@dm/shared/auth-models';
import { ErrorDto } from '@dm/shared/data-access';
import { AxiosError } from 'axios';

// TODO: create notification library
function getErrorPayload(error: AxiosError) {
  return {
    error: {
      response: error.response,
      code: error.code,
      isAxiosError: error.isAxiosError,
      request: error.request,
      config: error.config,
    },
  };
}

export function requestFailure(error: AxiosError): ErrorDto {
  console.log(error.response?.data || error);
  return error.response?.data;
}

export function successMessage(message: ConfirmationMessageDto) {
  console.log(message.text);
}
