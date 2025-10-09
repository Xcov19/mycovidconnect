import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import MaindHOC from "../components/MainHOC";
import { submitHospitalRegistration, validateHospitalForm, getStates, getHospitalTypes } from "../services/hospitalRegistrationService";

/**
 * Hospital Registration Component
 * A responsive form page for hospital registrations
 */
class HospitalRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        hospitalName: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        hospitalType: "",
        totalBeds: "",
        icuBeds: "",
        ventilatorBeds: "",
        oxygenBeds: "",
        emergencyContact: "",
        website: "",
        description: ""
      },
      isSubmitting: false,
      submitStatus: null
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isSubmitting: true, submitStatus: null });

    // Validate form data
    const validation = validateHospitalForm(this.state.formData);
    if (!validation.isValid) {
      this.setState({ 
        isSubmitting: false, 
        submitStatus: 'error',
        validationErrors: validation.errors
      });
      return;
    }

    try {
      // Submit to API
      const result = await submitHospitalRegistration(this.state.formData);
      
      if (result.success) {
        this.setState({ 
          isSubmitting: false, 
          submitStatus: 'success',
          formData: {
            hospitalName: "",
            contactPerson: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            hospitalType: "",
            totalBeds: "",
            icuBeds: "",
            ventilatorBeds: "",
            oxygenBeds: "",
            emergencyContact: "",
            website: "",
            description: ""
          }
        });
      } else {
        this.setState({ 
          isSubmitting: false, 
          submitStatus: 'error' 
        });
      }
    } catch (error) {
      this.setState({ 
        isSubmitting: false, 
        submitStatus: 'error' 
      });
    }
  };

  render() {
    const { formData, isSubmitting, submitStatus } = this.state;

    return (
      <>
        <MetaTags>
          <title>Hospital Registration - MyCovidConnect</title>
          <meta
            name="description"
            content="Register your hospital with MyCovidConnect to help patients find healthcare facilities"
          />
          <meta
            name="keywords"
            content="hospital registration, healthcare facilities, covid-19, medical services"
          />
        </MetaTags>
        
        <div className="hospital-registration">
          <div className="container">
            <div className="registration-header">
              <h1>Hospital Registration</h1>
              <p>Join MyCovidConnect to help patients find your healthcare facility</p>
            </div>

            <div className="registration-form-container">
              <form onSubmit={this.handleSubmit} className="hospital-form">
                {/* Basic Information */}
                <div className="form-section">
                  <h3>Basic Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="hospitalName">Hospital Name *</label>
                      <input
                        type="text"
                        id="hospitalName"
                        name="hospitalName"
                        value={formData.hospitalName}
                        onChange={this.handleInputChange}
                        required
                        placeholder="Enter hospital name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="hospitalType">Hospital Type *</label>
                      <select
                        id="hospitalType"
                        name="hospitalType"
                        value={formData.hospitalType}
                        onChange={this.handleInputChange}
                        required
                      >
                        <option value="">Select hospital type</option>
                        {getHospitalTypes().map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Hospital Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={this.handleInputChange}
                      rows="3"
                      placeholder="Brief description of your hospital and services"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="form-section">
                  <h3>Contact Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="contactPerson">Contact Person *</label>
                      <input
                        type="text"
                        id="contactPerson"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={this.handleInputChange}
                        required
                        placeholder="Full name of contact person"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={this.handleInputChange}
                        required
                        placeholder="contact@hospital.com"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={this.handleInputChange}
                        required
                        placeholder="+91-XXXXXXXXXX"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="emergencyContact">Emergency Contact</label>
                      <input
                        type="tel"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={this.handleInputChange}
                        placeholder="Emergency contact number"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={this.handleInputChange}
                      placeholder="https://www.hospital.com"
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div className="form-section">
                  <h3>Address Information</h3>
                  <div className="form-group">
                    <label htmlFor="address">Address *</label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={this.handleInputChange}
                      required
                      rows="2"
                      placeholder="Complete address of the hospital"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={this.handleInputChange}
                        required
                        placeholder="City name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="state">State *</label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={this.handleInputChange}
                        required
                      >
                        <option value="">Select state</option>
                        {getStates().map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="pincode">Pincode *</label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={this.handleInputChange}
                        required
                        placeholder="123456"
                        pattern="[0-9]{6}"
                        title="Please enter a valid 6-digit pincode"
                      />
                    </div>
                  </div>
                </div>

                {/* Capacity Information */}
                <div className="form-section">
                  <h3>Hospital Capacity</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="totalBeds">Total Beds *</label>
                      <input
                        type="number"
                        id="totalBeds"
                        name="totalBeds"
                        value={formData.totalBeds}
                        onChange={this.handleInputChange}
                        required
                        min="1"
                        placeholder="Total number of beds"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="icuBeds">ICU Beds</label>
                      <input
                        type="number"
                        id="icuBeds"
                        name="icuBeds"
                        value={formData.icuBeds}
                        onChange={this.handleInputChange}
                        min="0"
                        placeholder="Number of ICU beds"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="ventilatorBeds">Ventilator Beds</label>
                      <input
                        type="number"
                        id="ventilatorBeds"
                        name="ventilatorBeds"
                        value={formData.ventilatorBeds}
                        onChange={this.handleInputChange}
                        min="0"
                        placeholder="Number of ventilator beds"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="oxygenBeds">Oxygen Beds</label>
                      <input
                        type="number"
                        id="oxygenBeds"
                        name="oxygenBeds"
                        value={formData.oxygenBeds}
                        onChange={this.handleInputChange}
                        min="0"
                        placeholder="Number of oxygen beds"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Section */}
                <div className="form-section submit-section">
                  {submitStatus === 'success' && (
                    <div className="alert alert-success">
                      <i className="fas fa-check-circle"></i>
                      Thank you! Your hospital registration has been submitted successfully. 
                      We will review your application and contact you soon.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="alert alert-error">
                      <i className="fas fa-exclamation-circle"></i>
                      There was an error submitting your registration. Please try again.
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Submit Registration
                      </>
                    )}
                  </button>
                  
                  <p className="form-note">
                    * Required fields. All information will be verified before approval.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MaindHOC(HospitalRegistration);
