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

    return validationCopy.bail();
  });
}

const validationRules = {
  headerAuthorization: (prefix, isOptional = false) => createValidationRule(
    [
      header(`${prefix}authorization`)
        .isString()
        .withMessage('AUTHORIZATION_HEADER_MUST_BE_A_STRING')
        .matches(new RegExp(`^${process.env.TOKEN_TYPE} [a-f0-9]{${process.env.TOKEN_LENGTH}}$`))
        .withMessage('AUTHORIZATION_HEADER_HAS_WRONG_FORMAT'),
    ],
    isOptional,
  ),
  bodyEmailAddress: (prefix, isOptional = false) => createValidationRule(
    [
      body(`${prefix}email_address`)
        .isEmail()
        .withMessage('EMAIL_ADDRESS_HAS_WRONG_FORMAT')
        .isLength({ max: parseInt(process.env.USER_EMAIL_ADDRESS_MAX_LENGTH, 10) })
        .withMessage('EMAIL_ADDRESS_TOO_LONG'),
    ],
    isOptional,
  ),
  bodyPassword: (prefix, isOptional = false) => createValidationRule(
    [
      body(`${prefix}password`)
        .isString()
        .withMessage('PASSWORD_MUST_BE_A_STRING')
        .isLength({ min: parseInt(process.env.USER_PASSWORD_MIN_LENGTH, 10) })
        .withMessage('PASSWORD_TOO_SHORT'),
    ],
    isOptional,
  ),
  bodyOldPassword: (prefix, isOptional = false) => createValidationRule(
    [
      body(`${prefix}old_password`)
        .isString()
        .withMessage('OLD_PASSWORD_MUST_BE_A_STRING')
        .isLength({ min: parseInt(process.env.USER_PASSWORD_MIN_LENGTH, 10) })
        .withMessage('OLD_PASSWORD_TOO_SHORT'),
    ],
    isOptional,
  ),
  bodyFirstName: (prefix, isOptional = false) => createValidationRule(
    [
      body(`${prefix}first_name`)
        .isString()
        .withMessage('FIRST_NAME_MUST_BE_A_STRING')
        .isLength({
          min: parseInt(process.env.USER_FIRST_NAME_MIN_LENGTH, 10),
          max: parseInt(process.env.USER_FIRST_NAME_MAX_LENGTH, 10),
        })
        .withMessage('FIRST_NAME_TOO_SHORT_OR_TOO_LONG'),
    ],
    isOptional,
  ),
  bodyLastName: (prefix, isOptional = false) => createValidationRule(
    [
      body(`${prefix}last_name`)
        .isString()
        .withMessage('LAST_NAME_MUST_BE_A_STRING')
        .isLength({
          min: parseInt(process.env.USER_LAST_NAME_MIN_LENGTH, 10),
          max: parseInt(process.env.USER_LAST_NAME_MAX_LENGTH, 10),
        })
        .withMessage('LAST_NAME_TOO_SHORT_OR_TOO_LONG'),
    ],
    isOptional,
  ),
  bodyName: (prefix, isOptional = false) => createValidationRule(
    [
      body(`${prefix}name`)
        .isString()
        .withMessage('NAME_MUST_BE_A_STRING')
        .isLength({ min: 1 })
        .withMessage('NAME_TOO_SHORT'),
    ],
    isOptional,
  ),
  bodyCode: (prefix, isOptional = false) => createValidationRule(
    [
      body(`${prefix}code`)
        .isString()
        .withMessage('CODE_MUST_BE_A_STRING')
        .matches(/^FR[0-9]{5}$/)
        .withMessage('CODE_HAS_WRONG_FORMAT'),
    ],
    isOptional,
  ),
  bodyOrganizationOnly: (prefix, isOptional = false) => createValidationRule(
    [
      body(`${prefix}organization_only`)
        .isBoolean()
        .withMessage('ORGANIZATION_ONLY_MUST_BE_A_BOOLEAN'),
    ],
    isOptional,
  ),
  bodyEndOfLifeDate: (prefix, isOptional = false) => createValidationRule(
    [
      body(`${prefix}end_of_life_date`)
        .isDate()
        .withMessage('END_OF_LIFE_DATE_MUST_BE_A_DATE')
        .custom((value) => {
          if (new Date(value) < new Date()) {
            throw new Error('END_OF_LIFE_DATE_MUST_BE_IN_THE_FUTURE');
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
        .withMessage('EMAIL_ADDRESS_HAS_WRONG_FORMAT')
        .isLength({ max: parseInt(process.env.USER_EMAIL_ADDRESS_MAX_LENGTH, 10) })
        .withMessage('EMAIL_ADDRESS_TOO_LONG'),
    ],
    isOptional,
  ),
  queryName: (prefix, isOptional = false) => createValidationRule(
    [
      query(`${prefix}name`)
        .isString()
        .withMessage('NAME_MUST_BE_A_STRING')
        .isLength({ min: 1 })
        .withMessage('NAME_TOO_SHORT'),
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
