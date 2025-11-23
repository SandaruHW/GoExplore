import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const registerValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

export const validateEmail = (email) => {
  return loginValidationSchema
    .pick(['email'])
    .validate({ email })
    .then(() => null)
    .catch((err) => err.message);
};

export const validatePassword = (password) => {
  return loginValidationSchema
    .pick(['password'])
    .validate({ password })
    .then(() => null)
    .catch((err) => err.message);
};

export const validatePasswordStrength = (password) => {
  if (!password) return { strength: 'none', message: '' };

  let strength = 'weak';
  let score = 0;

  if (password.length >= 6) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z\d]/.test(password)) score++;

  if (score >= 4) strength = 'strong';
  else if (score >= 3) strength = 'medium';

  const messages = {
    weak: 'Weak password',
    medium: 'Medium password strength',
    strong: 'Strong password',
  };

  return { strength, message: messages[strength] };
};
