/**
 * Hospital Registration Service
 * Handles API calls for hospital registration
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

/**
 * Submit hospital registration form
 * @param {Object} formData - Hospital registration form data
 * @returns {Promise<Object>} - API response
 */
export const submitHospitalRegistration = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/hospitals/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers if needed
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Hospital registration error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Validate hospital registration form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Validation result
 */
export const validateHospitalForm = (formData) => {
  const errors = {};

  // Required field validation
  if (!formData.hospitalName?.trim()) {
    errors.hospitalName = 'Hospital name is required';
  }

  if (!formData.contactPerson?.trim()) {
    errors.contactPerson = 'Contact person is required';
  }

  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!formData.address?.trim()) {
    errors.address = 'Address is required';
  }

  if (!formData.city?.trim()) {
    errors.city = 'City is required';
  }

  if (!formData.state?.trim()) {
    errors.state = 'State is required';
  }

  if (!formData.pincode?.trim()) {
    errors.pincode = 'Pincode is required';
  } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
    errors.pincode = 'Pincode must be 6 digits';
  }

  if (!formData.hospitalType?.trim()) {
    errors.hospitalType = 'Hospital type is required';
  }

  if (!formData.totalBeds || formData.totalBeds < 1) {
    errors.totalBeds = 'Total beds must be at least 1';
  }

  // Optional field validation
  if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
    errors.website = 'Please enter a valid website URL';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Get list of states (for dropdown)
 * @returns {Array} - List of Indian states
 */
export const getStates = () => [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
  'Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep',
  'Puducherry'
];

/**
 * Get list of hospital types
 * @returns {Array} - List of hospital types
 */
export const getHospitalTypes = () => [
  { value: 'government', label: 'Government Hospital' },
  { value: 'private', label: 'Private Hospital' },
  { value: 'charitable', label: 'Charitable Hospital' },
  { value: 'clinic', label: 'Clinic' },
  { value: 'diagnostic', label: 'Diagnostic Center' },
  { value: 'nursing_home', label: 'Nursing Home' },
  { value: 'specialty', label: 'Specialty Hospital' },
  { value: 'multispecialty', label: 'Multispecialty Hospital' },
];
