export const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const usernameRegex = /^[a-zA-Z0-9]{8,20}$/;

export const workshopNameRegex = /^[a-zA-Z0-9\s.,!?-áéíóúÁÉÍÓÚ]{8,100}$/;

export const descriptionRegex = /^[a-zA-Z0-9\s.,!?-áéíóúÁÉÍÓÚ]{8,250}$/;

export const speakerRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{4,40}$/;

export const zoomUrlRegex =
  /^https:\/\/[\w.-]+\.zoom\.us\/j\/\d{9,11}(\?pwd=[\w.-]+)?$/;
