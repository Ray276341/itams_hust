import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string().required(),
  // .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email is not valid'),
  password: Yup.string().required(),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //   'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  // ),
});

export const signupValidationSchema = loginValidationSchema.concat(
  Yup.object({
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null], 'Password not match'),
    accept: Yup.boolean().isTrue(),
  }),
);

export const resetPasswordValidationSchema = Yup.object({
  currentPassword: Yup.string().matches(/.*\S.*/, 'Password is not null'),
  newPassword: Yup.string().required(),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //   'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  // ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('newPassword'), null],
    'Password not match',
  ),
});
