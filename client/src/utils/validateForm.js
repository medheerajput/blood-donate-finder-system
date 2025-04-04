// utils/validateForm.js

export const validateUserForm = ({
    name,
    email,
    phone,
    password,
    pincode,
    country,
    state,
    city,
    blood,
  }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!name || name.trim().length < 3) {
      return "Name must be at least 3 characters long";
    }
  
    if (!email || !emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
  
    if (!phone || phone.toString().length !== 10) {
      return "Phone number must be exactly 10 digits";
    }
  
    if (!password || password.length < 4) {
      return "Password must be at least 4 characters long";
    }
  
    if (!pincode) return "Pincode is required";
    if (!country) return "Country is required";
    if (!state) return "State is required";
    if (!city) return "City is required";
    if (!blood) return "Blood group is required";
  
    return null; // ✅ Everything passed
  };
  