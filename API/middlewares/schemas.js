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

const createValidationRule = (field, validations, prefix = '') => {
  return validations.map(validation => validation.withMessage(validation.builder.fields[0] + ' ' + validation.message).bail());
};

const validationRules = {
  authorization: () => [
    header('authorization')
      .isString()
      .withMessage('Authorization header must be a string')
      .matches(new RegExp('^' + process.env.TOKEN_TYPE + ' [a-f0-9]{' + process.env.TOKEN_LENGTH + '}$'))
      .withMessage('Authorization header must be in the correct format')
  ],
  email_address: prefix => createValidationRule(
    'email_address',
    [
      body(prefix + 'email_address')
        .isEmail()
        .withMessage('Email address must be valid')
        .isLength({ max: parseInt(process.env.USER_EMAIL_ADDRESS_MAX_LENGTH, 10) })
        .withMessage('Email address must be at most ' + process.env.USER_EMAIL_ADDRESS_MAX_LENGTH + ' characters')
    ],
    prefix
  ),
  password: prefix => createValidationRule(
    'password',
    [
      body(prefix + 'password')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: parseInt(process.env.USER_PASSWORD_MIN_LENGTH, 10) })
        .withMessage('Password must be at least ' + process.env.USER_PASSWORD_MIN_LENGTH + ' characters')
    ],
    prefix
  ),
  old_password: prefix => createValidationRule(
    'old_password',
    [
      body(prefix + 'old_password')
        .isString()
        .withMessage('Old password must be a string')
        .isLength({ min: parseInt(process.env.USER_PASSWORD_MIN_LENGTH, 10) })
        .withMessage('Old password must be at least ' + process.env.USER_PASSWORD_MIN_LENGTH + ' characters')
    ],
    prefix
  ),
  first_name: prefix => createValidationRule(
    'first_name',
    [
      body(prefix + 'first_name')
        .isString()
        .withMessage('First name must be a string')
        .isLength({
          min: parseInt(process.env.USER_FIRST_NAME_MIN_LENGTH, 10),
          max: parseInt(process.env.USER_FIRST_NAME_MAX_LENGTH, 10)
        })
        .withMessage('First name must be at least ' + process.env.USER_FIRST_NAME_MIN_LENGTH + ' characters and at most ' + process.env.USER_FIRST_NAME_MAX_LENGTH + ' characters')
    ],
    prefix
  ),
  last_name: prefix => createValidationRule(
    'last_name',
    [
      body(prefix + 'last_name')
        .isString()
        .withMessage('Last name must be a string')
        .isLength({
          min: parseInt(process.env.USER_LAST_NAME_MIN_LENGTH, 10),
          max: parseInt(process.env.USER_LAST_NAME_MAX_LENGTH, 10)
        })
        .withMessage('Last name must be at least ' + process.env.USER_LAST_NAME_MIN_LENGTH + ' characters and at most ' + process.env.USER_LAST_NAME_MAX_LENGTH + ' characters')
    ],
    prefix
  ),
  name: prefix => createValidationRule(
    'name',
    [
      body(prefix + 'name')
        .isString()
        .withMessage('Name must be a string')
    ],
    prefix
  ),
};

export const authorization = [...validationRules.authorization(''), handleValidationErrors];
export const email_address = (prefix = '') => [...validationRules.email_address(prefix), handleValidationErrors];
export const password = (prefix = '') => [...validationRules.password(prefix), handleValidationErrors];
export const old_password = (prefix = '') => [...validationRules.old_password(prefix), handleValidationErrors];
export const first_name = (prefix = '') => [...validationRules.first_name(prefix), handleValidationErrors];
export const last_name = (prefix = '') => [...validationRules.last_name(prefix), handleValidationErrors];
export const name = (prefix = '') => [...validationRules.name(prefix), handleValidationErrors];
