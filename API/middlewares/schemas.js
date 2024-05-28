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

const createValidationRule = (field, validations, isOptional = false, prefix = '') => {
  return validations.map(validation => {
    if (isOptional) {
      validation = validation.optional();
    }
    return validation.withMessage(validation.builder.fields[0] + ' ' + validation.message).bail();
  });
};

const validationRules = {
  header_authorization: () => [
    header('authorization')
      .isString()
      .withMessage('Authorization header must be a string')
      .matches(new RegExp('^' + process.env.TOKEN_TYPE + ' [a-f0-9]{' + process.env.TOKEN_LENGTH + '}$'))
      .withMessage('Authorization header must be in the correct format')
  ],
  body_email_address: (prefix, isOptional = false) => createValidationRule(
    'email_address',
    [
      body(prefix + 'email_address')
        .isEmail()
        .withMessage('Email address must be valid')
        .isLength({ max: parseInt(process.env.USER_EMAIL_ADDRESS_MAX_LENGTH, 10) })
        .withMessage('Email address must be at most ' + process.env.USER_EMAIL_ADDRESS_MAX_LENGTH + ' characters')
    ],
    isOptional,
    prefix
  ),
  body_password: (prefix, isOptional = false) => createValidationRule(
    'password',
    [
      body(prefix + 'password')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: parseInt(process.env.USER_PASSWORD_MIN_LENGTH, 10) })
        .withMessage('Password must be at least ' + process.env.USER_PASSWORD_MIN_LENGTH + ' characters')
    ],
    isOptional,
    prefix
  ),
  body_old_password: (prefix, isOptional = false) => createValidationRule(
    'old_password',
    [
      body(prefix + 'old_password')
        .isString()
        .withMessage('Old password must be a string')
        .isLength({ min: parseInt(process.env.USER_PASSWORD_MIN_LENGTH, 10) })
        .withMessage('Old password must be at least ' + process.env.USER_PASSWORD_MIN_LENGTH + ' characters')
    ],
    isOptional,
    prefix
  ),
  body_first_name: (prefix, isOptional = false) => createValidationRule(
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
    isOptional,
    prefix
  ),
  body_last_name: (prefix, isOptional = false) => createValidationRule(
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
    isOptional,
    prefix
  ),
  body_name: (prefix, isOptional = false) => createValidationRule(
    'name',
    [
      body(prefix + 'name')
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 1 })
        .withMessage('Name must be at least 1 character')
    ],
    isOptional,
    prefix
  ),
  body_code: (prefix, isOptional = false) => createValidationRule(
    'code',
    [
      body(prefix + 'code')
        .isString()
        .withMessage('Code must be a string')
        .matches(new RegExp('^FR[0-9]{5}$'))
        .withMessage('Code must be in the correct format')
    ],
    isOptional,
    prefix
  ),
  body_organization_only: (prefix, isOptional = false) => createValidationRule(
    'organization_only',
    [
      body(prefix + 'organization_only')
        .isBoolean()
        .withMessage('Organization only must be a boolean')
    ],
    isOptional,
    prefix
  ),
  params_name: (prefix, isOptional = false) => createValidationRule(
    'name',
    [
      body(prefix + 'name')
        .isString()
        .withMessage('Category name must be a string')
        .isLength({ min: 1 })
        .withMessage('Category name must be at least 1 character')
    ],
    isOptional,
    prefix
  ),
};

export const header_authorization = [...validationRules.header_authorization(), handleValidationErrors];
export const body_email_address = (prefix = '', isOptional = false) => [...validationRules.body_email_address(prefix, isOptional), handleValidationErrors];
export const body_password = (prefix = '', isOptional = false) => [...validationRules.body_password(prefix, isOptional), handleValidationErrors];
export const body_old_password = (prefix = '', isOptional = false) => [...validationRules.body_old_password(prefix, isOptional), handleValidationErrors];
export const body_first_name = (prefix = '', isOptional = false) => [...validationRules.body_first_name(prefix, isOptional), handleValidationErrors];
export const body_last_name = (prefix = '', isOptional = false) => [...validationRules.body_last_name(prefix, isOptional), handleValidationErrors];
export const body_name = (prefix = '', isOptional = false) => [...validationRules.body_name(prefix, isOptional), handleValidationErrors];
export const body_code = (prefix = '', isOptional = false) => [...validationRules.body_code(prefix, isOptional), handleValidationErrors];
export const body_organization_only = (prefix = '', isOptional = false) => [...validationRules.body_organization_only(prefix, isOptional), handleValidationErrors];
export const params_name = (prefix = '', isOptional = false) => [...validationRules.params_name(prefix, isOptional), handleValidationErrors];
