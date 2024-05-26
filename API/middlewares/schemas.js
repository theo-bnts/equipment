import { validationResult, header, body } from 'express-validator';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .send({ errors: errors.array() });
  }
  next();
};

const rules = {
  authorization: [
    header('authorization')
      .isString()
      .withMessage('Authorization header must be a string')
      .matches(new RegExp('^' + process.env.TOKEN_TYPE + ' [a-f0-9]{' + process.env.TOKEN_LENGTH + '}$'))
      .withMessage('Authorization header must be in the correct format')
  ],
  email_address: [
    body('email_address')
      .isEmail()
      .withMessage('Email address must be valid')
      .isLength({ max: parseInt(process.env.USER_EMAIL_ADDRESS_MAX_LENGTH, 10) })
      .withMessage(`Email address must be at most ${process.env.USER_EMAIL_ADDRESS_MAX_LENGTH} characters`)
  ],
  password: [
    body('password')
      .isString()
      .withMessage('Password must be a string')
      .isLength({ min: parseInt(process.env.USER_PASSWORD_MIN_LENGTH, 10) })
      .withMessage(`Password must be at least ${process.env.USER_PASSWORD_MIN_LENGTH} characters`)
  ],
  old_password: [
    body('old_password')
      .isString()
      .withMessage('Old password must be a string')
      .isLength({ min: parseInt(process.env.USER_PASSWORD_MIN_LENGTH, 10) })
      .withMessage(`Old password must be at least ${process.env.USER_PASSWORD_MIN_LENGTH} characters`)
  ],
  first_name: [
    body('first_name')
      .isString()
      .withMessage('First name must be a string')
      .isLength({
        min: parseInt(process.env.USER_FIRST_NAME_MIN_LENGTH, 10),
        max: parseInt(process.env.USER_FIRST_NAME_MAX_LENGTH, 10)
      })
      .withMessage(`First name must be at most ${process.env.USER_FIRST_NAME_MAX_LENGTH} characters`)
  ],
  last_name: [
    body('last_name')
      .isString()
      .withMessage('Last name must be a string')
      .isLength({
        min: parseInt(process.env.USER_LAST_NAME_MIN_LENGTH, 10),
        max: parseInt(process.env.USER_LAST_NAME_MAX_LENGTH, 10)
      })
      .withMessage(`Last name must be at most ${process.env.USER_LAST_NAME_MAX_LENGTH} characters`)
  ],
  role: [
    body('role')
      .isObject()
      .withMessage('Role must be an object'),
    body('role.name')
      .isString()
      .withMessage('Role name must be a string'),
  ],
};

export const authorization = [...rules.authorization, handleValidationErrors];
export const email_address = [...rules.email_address, handleValidationErrors];
export const password = [...rules.password, handleValidationErrors];
export const old_password = [...rules.old_password, handleValidationErrors];
export const first_name = [...rules.first_name, handleValidationErrors];
export const last_name = [...rules.last_name, handleValidationErrors];
export const role = [...rules.role, handleValidationErrors];
