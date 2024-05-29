import 'dotenv/config';

import {
  body, header, query, validationResult,
} from 'express-validator';

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .send({ errors: errors.array() });
  }
  return next();
}

function createValidationRule(validations, isOptional = false) {
  return validations.map((validation) => {
    let validationCopy = validation;

    if (isOptional) {
      validationCopy = validationCopy.optional();
    }

    return validationCopy
      .withMessage(`${validationCopy.builder.fields[0]} ${validationCopy.builder.message}`)
      .bail();
  });
}

const validationRules = {
  headerAuthorization: (prefix, isOptional = false) => createValidationRule(
    [
      header(`${prefix}authorization`)
        .isString()
        .withMessage('Authorization header must be a string')
        .matches(new RegExp(`^${process.env.TOKEN_TYPE} [a-f0-9]{${process.env.TOKEN_LENGTH}}$`))
        .withMessage('Authorization header must be in the correct format'),
    ],
    isOptional,
  ),
  bodyEmailAddress: (prefix, isOptional = false) => createValidationRule(
    [
      body(`${prefix}email_address`)
        .isEmail()
        .withMessage('Email address must be valid')
        .isLength({ max: parseInt(process.env.USER_EMAIL_ADDRESS_MAX_LENGTH, 10) })
        .withMessage(`Email address must be at most ${process.env.USER_EMAIL_ADDRESS_MAX_LENGTH} characters`),
    ],
    isOptional,
  ),
  bodyPassword: (prefix, isOptional = false) => createValidationRule(
    [
      body(`${prefix}password`)
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: parseInt(process.env.USER_PASSWORD_MIN_LENGTH, 10) })
        .withMessage(`Password must be at least ${process.env.USER_PASSWORD_MIN_LENGTH} characters`),
    ],
    isOptional,
  ),
  bodyOldPassword: (prefix, isOptional = false) => createValidationRule(
    [
      body(`${prefix}old_password`)
        .isString()
        .withMessage('Old password must be a string')
        .isLength({ min: parseInt(process.env.USER_PASSWORD_MIN_LENGTH, 10) })
        .withMessage(`Old password must be at least ${process.env.USER_PASSWORD_MIN_LENGTH} characters`),
    ],
    isOptional,
  ),
  bodyFirstName: (prefix, isOptional = false) => createValidationRule(
    [
      body(`${prefix}first_name`)
        .isString()
        .withMessage('First name must be a string')
        .isLength({
          min: parseInt(process.env.USER_FIRST_NAME_MIN_LENGTH, 10),
          max: parseInt(process.env.USER_FIRST_NAME_MAX_LENGTH, 10),
        })
        .withMessage(`First name must be at least ${process.env.USER_FIRST_NAME_MIN_LENGTH} characters and at most ${process.env.USER_FIRST_NAME_MAX_LENGTH} characters`),
    ],
    isOptional,
  ),
  bodyLastName: (prefix, isOptional = false) => createValidationRule(
    [
      body(`${prefix}last_name`)
        .isString()
        .withMessage('Last name must be a string')
        .isLength({
          min: parseInt(process.env.USER_LAST_NAME_MIN_LENGTH, 10),
          max: parseInt(process.env.USER_LAST_NAME_MAX_LENGTH, 10),
        })
        .withMessage(`Last name must be at least ${process.env.USER_LAST_NAME_MIN_LENGTH} characters and at most ${process.env.USER_LAST_NAME_MAX_LENGTH} characters`),
    ],
    isOptional,
  ),
  bodyName: (prefix, isOptional = false) => createValidationRule(
    [
      body(`${prefix}name`)
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 1 })
        .withMessage('Name must be at least 1 character'),
    ],
    isOptional,
  ),
  bodyCode: (prefix, isOptional = false) => createValidationRule(
    [
      body(`${prefix}code`)
        .isString()
        .withMessage('Code must be a string')
        .matches(/^FR[0-9]{5}$/)
        .withMessage('Code must be in the correct format'),
    ],
    isOptional,
  ),
  bodyOrganizationOnly: (prefix, isOptional = false) => createValidationRule(
    [
      body(`${prefix}organization_only`)
        .isBoolean()
        .withMessage('Organization only must be a boolean'),
    ],
    isOptional,
  ),
  bodyEndOfLifeDate: (prefix, isOptional = false) => createValidationRule(
    [
      body(`${prefix}end_of_life_date`)
        .isDate()
        .withMessage('End of life date must be a date')
        .custom((value) => {
          if (new Date(value) < new Date()) {
            throw new Error('End of life date must be in the future');
          }
          return true;
        }),
    ],
    isOptional,
  ),
  queryEmailAddress: (prefix, isOptional = false) => createValidationRule(
    [
      query(`${prefix}email_address`)
        .isEmail()
        .withMessage('Email address must be valid')
        .isLength({ max: parseInt(process.env.USER_EMAIL_ADDRESS_MAX_LENGTH, 10) })
        .withMessage(`Email address must be at most ${process.env.USER_EMAIL_ADDRESS_MAX_LENGTH} characters`),
    ],
    isOptional,
  ),
  queryName: (prefix, isOptional = false) => createValidationRule(
    [
      query(`${prefix}name`)
        .isString()
        .withMessage('Category name must be a string')
        .isLength({ min: 1 })
        .withMessage('Category name must be at least 1 character'),
    ],
    isOptional,
  ),
};

export const headerAuthorization = (prefix = '', isOptional = false) => [...validationRules.headerAuthorization(prefix, isOptional), handleValidationErrors];
export const bodyEmailAddress = (prefix = '', isOptional = false) => [...validationRules.bodyEmailAddress(prefix, isOptional), handleValidationErrors];
export const bodyPassword = (prefix = '', isOptional = false) => [...validationRules.bodyPassword(prefix, isOptional), handleValidationErrors];
export const bodyOldPassword = (prefix = '', isOptional = false) => [...validationRules.bodyOldPassword(prefix, isOptional), handleValidationErrors];
export const bodyFirstName = (prefix = '', isOptional = false) => [...validationRules.bodyFirstName(prefix, isOptional), handleValidationErrors];
export const bodyLastName = (prefix = '', isOptional = false) => [...validationRules.bodyLastName(prefix, isOptional), handleValidationErrors];
export const bodyName = (prefix = '', isOptional = false) => [...validationRules.bodyName(prefix, isOptional), handleValidationErrors];
export const bodyCode = (prefix = '', isOptional = false) => [...validationRules.bodyCode(prefix, isOptional), handleValidationErrors];
export const bodyOrganizationOnly = (prefix = '', isOptional = false) => [...validationRules.bodyOrganizationOnly(prefix, isOptional), handleValidationErrors];
export const bodyEndOfLifeDate = (prefix = '', isOptional = false) => [...validationRules.bodyEndOfLifeDate(prefix, isOptional), handleValidationErrors];
export const queryEmailAddress = (prefix = '', isOptional = false) => [...validationRules.queryEmailAddress(prefix, isOptional), handleValidationErrors];
export const queryName = (prefix = '', isOptional = false) => [...validationRules.queryName(prefix, isOptional), handleValidationErrors];
