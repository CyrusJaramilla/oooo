export default function Validation(values) {
    let errors = {};
  
    if (!values.name.trim()) {
      errors.name = "Name is required";
    }
  
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@nvsu\.edu\.ph$/i.test(values.email)) {
      errors.email = "Email must be a valid @nvsu.edu.ph address";
    }
  
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
  
    return errors;
  }
  