
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
// Import icons
import { CheckCircle, Lock, Edit2, CreditCard, User, ChevronDown, QrCode } from 'lucide-react';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { items = [], total = 0, clear = () => {} } = useCart() || {}; // Default values to avoid undefined errors
  const [step, setStep] = useState(1);
  const [isFlipped, setIsFlipped] = useState(false);
  const [otp, setOtp] = useState('');
  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    paymentMethod: "visa",
  });
  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    state: "",
  });

  // Compute total locally
  const computedTotal = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const displayTotal = total > 0 ? total : computedTotal;

  useEffect(() => {
    // Debug initial state and total mismatch
    console.log("Cart items:", items); // Log items to verify brand presence
    console.log("Initial cart state:", { items, total, computedTotal });
    if (total !== computedTotal) {
      console.warn(`Total mismatch: CartContext total (${total}) does not match computed total (${computedTotal})`);
    }
    // Placeholder: If brands are missing, fetch them based on item.id
    // Example: Fetch brands from a product catalog or API
    // items.forEach(item => {
    //   if (!item.brand) {
    //     // Fetch brand for item.id and update items
    //   }
    // });
  }, [items, total, computedTotal]);

  const handleCardNumberChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .slice(0, 19);
    setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleExpiryChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = value
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/(\d{2})(?=\d)/, "$1/");
    setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    } else if (name === "name") {
      formattedValue = value.slice(0, 30);
    }
    setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (e) => {
    setCardDetails((prev) => ({ ...prev, paymentMethod: e.target.value }));
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    alert(`✅ Paiement réussi! Total: ${displayTotal.toFixed(2)} MAD avec ${cardDetails.paymentMethod}`);
    clear();
    navigate("/");
  };

  return (
    <div className="payment-page">
      <div className="payment-bg"></div>
      <div className="payment-container">
        <aside className="steps-sidebar">
          <div className="logo-placeholder">
            <User size={24} />
          </div>
          <div className="sidebar-steps-list">
            <div className={`sidebar-step ${step === 1 ? "active" : ""}`}>
              <div className={`sidebar-step-indicator ${step > 1 ? "completed" : ""}`}>
                {step > 1 ? <CheckCircle size={16} /> : <span className="step-number">1</span>}
              </div>
              <p>STEP 1<br />Card Details</p>
            </div>
            <div className={`sidebar-step ${step === 2 ? "active" : ""}`}>
              <div className={`sidebar-step-indicator ${step > 2 ? "completed" : ""}`}>
                {step > 2 ? <CheckCircle size={16} /> : <span className="step-number">2</span>}
              </div>
              <p>STEP 2<br />Form Review</p>
            </div>
            <div className={`sidebar-step ${step === 3 ? "active" : ""}`}>
              <div className={`sidebar-step-indicator ${step > 3 ? "completed" : ""}`}>
                {step > 3 ? <CheckCircle size={16} /> : <span className="step-number">3</span>}
              </div>
              <p>STEP 3<br />Authenticate OTP</p>
            </div>
            <div className={`sidebar-step ${step === 4 ? "active" : ""}`}>
              <div className={`sidebar-step-indicator ${step === 4 ? "current" : ""}`}>
                {step > 4 ? <CheckCircle size={16} /> : <span className="step-number">€</span>}
              </div>
              <p>STEP 4<br />Payment</p>
            </div>
          </div>
          <div className="abstract-design">
            <div className="help-card">
              <div className="help-icon">?</div>
              <p>Having troubles?<br />Contact us</p>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <div className="top-progress-bar">
            <div className={`top-step ${step >= 1 ? "completed" : ""}`}>
              <div className="circle">{step >= 1 ? "✓" : "1"}</div>
              <div className="step-number">STEP 1</div>
              <div className="step-title">Card Details</div>
              <div className={`step-status ${step >= 1 ? "completed" : "pending"}`}>
                {step >= 1 ? "Completed" : "Pending"}
              </div>
            </div>
            <div className={`top-step ${step >= 2 ? "completed" : step === 2 ? "in-progress" : ""}`}>
              <div className="circle">{step >= 2 ? "✓" : "2"}</div>
              <div className="step-number">STEP 2</div>
              <div className="step-title">Form Review</div>
              <div className={`step-status ${step >= 2 ? (step > 2 ? "completed" : "in-progress") : "pending"}`}>
                {step === 2 ? "In Progress" : step > 2 ? "Completed" : "Pending"}
              </div>
            </div>
            <div className={`top-step ${step >= 3 ? (step === 3 ? "in-progress" : "completed") : ""}`}>
              <div className="circle">{step >= 3 ? "✓" : "3"}</div>
              <div className="step-number">STEP 3</div>
              <div className="step-title">Authenticate OTP</div>
              <div className={`step-status ${step >= 3 ? (step === 3 ? "in-progress" : "completed") : "pending"}`}>
                {step === 3 ? "In Progress" : step > 3 ? "Completed" : "Pending"}
              </div>
            </div>
            <div className={`top-step ${step === 4 ? "in-progress" : ""}`}>
              <div className="circle"><QrCode size={16} /></div>
              <div className="step-number">STEP 4</div>
              <div className="step-title">Payment</div>
              <div className={`step-status ${step === 4 ? "in-progress" : "pending"}`}>
                {step === 4 ? "In Progress" : "Pending"}
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="card-box small-card">
              <div className="card-box-header blue-header">
                <CreditCard size={20} />
                <h3>Card Details</h3>
                <span className="status-badge in-progress">In Progress</span>
              </div>
              <div className="card-box-content">
                <div className="payment-card-layout">
                  <div className="card-preview-wrapper">
                    <div className={`card-preview ${isFlipped ? 'flipped' : ''}`}>
                      <div className="card-front">
                        <div className="card-chip"></div>
                        <div className="card-logo">{cardDetails.paymentMethod.toUpperCase()}</div>
                        <div className="card-number">{cardDetails.cardNumber || '**** **** **** ****'}</div>
                        <div className="card-holder">
                          <label>Card Holder</label>
                          <div>{cardDetails.name || 'FULL NAME'}</div>
                        </div>
                        <div className="card-expiry">
                          <label>Expires</label>
                          <div>{cardDetails.expiry || 'MM/YY'}</div>
                        </div>
                      </div>
                      <div className="card-back">
                        <div className="magnetic-strip"></div>
                        <div className="cvv-label">CVV</div>
                        <div className="cvv">{cardDetails.cvv ? '*'.repeat(cardDetails.cvv.length) : '***'}</div>
                        <div className="card-logo-back">{cardDetails.paymentMethod.toUpperCase()}</div>
                      </div>
                    </div>
                  </div>
                  <div className="input-fields-container">
                    <div className="input-group">
                      <select
                        name="paymentMethod"
                        value={cardDetails.paymentMethod}
                        onChange={handlePaymentMethodChange}
                        className="input-field payment-select"
                      >
                        <option value="visa"> 💳Visa</option>
                        <option value="mastercard">🔴🟡MasterCard</option>
                        <option value="amex">💳💎American Express</option>
                         <option value="Paypal">🅿️Paypal</option>
                      </select>
                      <span className="input-label">Card Type</span>
                      <ChevronDown size={18} className="input-icon dropdown-icon" />
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        className="input-field"
                      />
                      <span className="input-label">Card Number</span>
                      <CreditCard size={20} className="input-icon card-number-icon" />
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        name="name"
                        value={cardDetails.name}
                        onChange={handleCardChange}
                        placeholder="Enter Cardholder Name"
                        className="input-field"
                      />
                      <span className="input-label">Cardholder Name</span>
                      <CreditCard size={20} className="input-icon" />
                    </div>
                    <div className="row">
                      <div className="input-group">
                        <input
                          type="text"
                          name="expiry"
                          value={cardDetails.expiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          className="input-field expiry"
                        />
                        <span className="input-label">Expiry Date</span>
                      </div>
                      <div className="input-group">
                        <input
                          type="text"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                          onFocus={() => setIsFlipped(true)}
                          onBlur={() => setIsFlipped(false)}
                          placeholder="CVV"
                          className="input-field cvv"
                        />
                        <span className="input-label">CVV</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nav-buttons-inline">
                <button onClick={prevStep} disabled={step === 1}>Previous</button>
                <button onClick={nextStep}>Next</button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="card-box small-card">
              <div className="card-box-header blue-header">
                <Edit2 size={20} />
                <h3>Form Review</h3>
                <span className="status-badge in-progress">In Progress</span>
              </div>
              <div className="card-box-content">
                <p>Review your billing address and order details.</p>
                <div className="payment-card billing-card">
                  <h4>BILLING ADDRESS</h4>
                  <div className="input-group">
                    <input
                      type="text"
                      name="street"
                      value={billingAddress.street}
                      onChange={handleAddressChange}
                      placeholder="Street Address"
                      className="input-field billing-style"
                    />
                    <span className="input-label">Street Address</span>
                  </div>
                  <div className="row">
                    <div className="input-group">
                      <input
                        type="text"
                        name="city"
                        value={billingAddress.city}
                        onChange={handleAddressChange}
                        placeholder="City"
                        className="input-field billing-style"
                      />
                      <span className="input-label">City</span>
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        name="state"
                        value={billingAddress.state}
                        onChange={handleAddressChange}
                        placeholder="State"
                        className="input-field billing-style"
                      />
                      <span className="input-label">State</span>
                    </div>
                  </div>
                </div>
                <div className="order-summary">
                  <h4>Order Summary</h4>
                  {items.length === 0 ? (
                    <p>No items in cart.</p>
                  ) : (
                    items.map((item) => (
                      <div key={`${item.id}-${item.sizeKg}`} className="summary-item">
                        {item.brand || 'Unknown Brand'} {item.name} ({item.sizeKg}kg) x {item.quantity} - {(item.unitPrice * item.quantity).toFixed(2)} €
                      </div>
                    ))
                  )}
                  <div className="summary-total">Total: {displayTotal.toFixed(2)} €</div>
                </div>
              </div>
              <div className="nav-buttons-inline">
                <button onClick={prevStep}>Previous</button>
                <button onClick={nextStep}>Next</button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="card-box small-card">
              <div className="card-box-header blue-header">
                <Lock size={20} />
                <h3>Authenticate OTP</h3>
                <span className="status-badge in-progress">In Progress</span>
              </div>
              <div className="card-box-content">
                <p>Enter the 6-digit OTP sent to your registered phone/email.</p>
                <div className="input-group">
                  <input
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="******"
                    className="input-field"
                    maxLength={6}
                  />
                  <span className="input-label">OTP</span>
                </div>
              </div>
              <div className="nav-buttons-inline">
                <button onClick={prevStep}>Previous</button>
                <button onClick={nextStep} disabled={otp.length !== 6}>Next</button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="card-box large-card">
              <div className="card-box-header payment-header">
                <span className="step-indicator-large">STEP 4/4</span>
                <div className="payment-header-content">
                  <div className="payment-icon">€</div>
                  <h3>Payment</h3>
                </div>
              </div>
              <div className="payment-details-content">
                <p>Confirm your payment details.</p>
                <div className="card-summary">
                  <h4>Payment Method</h4>
                  <p>{cardDetails.paymentMethod.toUpperCase()} ending in {cardDetails.cardNumber.slice(-4) || '****'}</p>
                  <p>Billing Address: {billingAddress.street || 'Not provided'}, {billingAddress.city || ''}, {billingAddress.state || ''}</p>
                </div>
                <div className="order-summary">
                  <h4>Order Summary</h4>
                  {items.length === 0 ? (
                    <p>No items in cart.</p>
                  ) : (
                    items.map((item) => (
                      <div key={`${item.id}-${item.sizeKg}`} className="summary-item">
                        {item.brand || 'Unknown Brand'} {item.name} ({item.sizeKg}kg) x {item.quantity} - {(item.unitPrice * item.quantity).toFixed(2)} €
                      </div>
                    ))
                  )}
                  <div className="summary-total">Total: {displayTotal.toFixed(2)} €</div>
                </div>
              </div>
              <div className="nav-buttons large-card-nav">
                <button onClick={prevStep} className="prev-btn">← Previous</button>
                <div className="total-box">Total: <strong>{displayTotal.toFixed(2)}€</strong></div>
                <button onClick={handleSubmit} className="next-btn">Confirm Payment →</button>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body, html {
          margin: 0;
          padding: 0;
          min-height: 100%;
          width: 100%;
          overflow-x: hidden;
          background: linear-gradient(200deg, #fdfdfd, #f4f4f4) !important;
        }

        .payment-page {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: auto;
        }
        
        .payment-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          z-index: -1;
          overflow: hidden;
        }

        .payment-bg::before,
        .payment-bg::after {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
        }

        .payment-bg::before {
          bottom: -120px;
          left: -120px;
          background: radial-gradient(circle, rgba(74,108,247,0.25), transparent);
        }

        .payment-bg::after {
          top: -120px;
          right: -120px;
          background: radial-gradient(circle, rgba(34,197,94,0.25), transparent);
        }

        .payment-container {
          display: flex;
          min-height: 100vh;
          font-family: 'Poppins', sans-serif;
          padding: 100px 100px 400px 100px;
          justify-content: center;
          gap: 90px;
          position: relative;
          z-index: 0;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .payment-container {
            flex-direction: column;
            padding: 20px;
          }
          .steps-sidebar {
            width: 100%;
            position: relative;
            top: 0;
          }
          .main-content {
            max-width: 100%;
          }
          .payment-card-layout {
            flex-direction: column;
          }
          .input-fields-container {
            margin-top: 20px;
          }
        }
        
        .steps-sidebar {
          width: 280px;
          background: white;
          border-radius: 24px;
          padding: 30px 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          height: fit-content;
          position: sticky;
          top: 40px;
          z-index: 1;
          transition: box-shadow 0.3s ease;
        }
        
        .steps-sidebar:hover {
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }
        
        .logo-placeholder {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #4a6cf7, #1b4ef5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 24px;
          box-shadow: 0 4px 10px rgba(74,108,247,0.3);
          transition: transform 0.3s ease;
          border: 3px solid rgba(255, 255, 255, 0.3);
          cursor: pointer;
        }

        .logo-placeholder svg {
          width: 50%;
          height: 50%;
          color: white;
        }

        .logo-placeholder::before {
          content: '';
          position: absolute;
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.2);
          background: transparent;
        }
        
        .logo-placeholder:hover {
          transform: scale(1.1);
        }
        
        .sidebar-steps-list {
          width: 100%;
          padding: 0 30px;
          display: flex;
          flex-direction: column;
          gap: 25px;
          position: relative;
          color: #4b5563;
        }
        
        .sidebar-steps-list::before {
          content: '';
          position: absolute;
          left: 50px;
          top: 30px;
          bottom: 30px;
          width: 3px;
          background: linear-gradient(to bottom, #0e36ffff, #c1c2c5ff);
          z-index: 0;
          border-radius: 2px;
          box-shadow: 0 2px 4px rgba(74, 108, 247, 0.2);
        }
        
        .sidebar-step {
          display: flex;
          align-items: center;
          gap: 15px;
          color: #8c8989ff;
          font-weight: 500;
          position: relative;
          z-index: 1;
          transition: color 0.3s ease;
        }
        
        .sidebar-step.active {
          color: #4000ffff;
          font-weight: 600;
        }
        
        .sidebar-step-indicator {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #bcbcbcff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          border: 2px solid #bcb0b0ff;
          transition: all 0.3s ease;
        }
        
        .sidebar-step-indicator.completed {
          background: #22c55e;
          color: white;
          border-color: #22c55e;
        }
        
        .sidebar-step-indicator.current {
          background: #1b4ef5;
          color: white;
          border-color: #1b4ef5;
        }
        
        .sidebar-step p {
          margin: 0;
          font-size: 14px;
          line-height: 1.4;
          transition: color 0.3s ease;
        }
        
        .abstract-design {
          width: 100%;
          height: 120px;
          background: linear-gradient(135deg, #4a6cf7 0%, #1b4ef5 100%);
          background-size: 200% 200%;
          animation: gradientAnimation 5s ease infinite;
          border-bottom-left-radius: 24px;
          border-bottom-right-radius: 24px;
          opacity: 0.8;
          margin-top: auto;
          position: relative;
        }
        
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .main-content {
          flex: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          max-width: 1200px;
          z-index: 1;
          width: 70%;
        }
        
        .cart-summary-top {
          width: 100%;
          background: white;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .cart-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
        }

        .cart-item-summary {
          font-size: 14px;
          color: #4b5563;
        }

        .cart-total {
          font-weight: 600;
          color: #22c55e;
          font-size: 16px;
        }
        
        .top-progress-bar {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          width: 100%;
          display: flex;
          justify-content: space-between;
          position: relative;
          margin-bottom: 30px;
        }

        .top-progress-bar::before {
          content: '';
          position: absolute;
          top: 49px;
          left: 12.5%;
          right: 12.5%;
          height: 4px;
          background: #dcd9d9ff;
          z-index: 0;
          border-radius: 2px;
        }

        .top-step {
          flex: 1;
          text-align: center;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .top-step .circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin: 0 auto 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          border: 3px solid #b4b4b4ff;
          background: #b4b0b0ff;
          color: #fff8f8ff;
          transition: all 0.3s ease;
          font-size: 18px;
          position: relative;
          z-index: 2;
        }

        .top-step.completed .circle {
          background: #22c55e;
          border-color: #22c55e;
          color: #fff;
        }

        .top-step.in-progress .circle {
          background: #1b4ef5;
          border-color: #1b4ef5;
          color: #fff;
        }

        .top-step .circle svg {
          color: #fff;
        }

        .step-number {
          font-size: 19px;
          font-weight: 600;
          margin-bottom: 4px;
          color: #fffafaff;
        }

        .step-title {
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 6px;
        }

        .step-status {
          font-size: 12px;
          font-weight: 500;
          padding: 4px 8px;
          border-radius: 12px;
          display: inline-block;
        }

        .step-status.completed {
          background: #dcfce7;
          color: #16a34a;
        }

        .step-status.in-progress {
          background: #e7ecffff;
          color: #1b4ef5;
        }

        .step-status.pending {
          background: #f3f4f6;
          color: #020202ff;
        }

        .top-step::after {
          content: '';
          position: absolute;
          top: 25px;
          left: calc(50% + 25px);
          width: calc(100% - 50px);
          height: 4px;
          background: #1f3a72ff;
          z-index: -1;
          border-radius: 2px;
        }

        .top-step:last-child::after {
          display: none;
        }

        .top-step.completed::after {
          background: #22c55e !important;
          box-shadow: 0 2px 4px rgba(34, 197, 94, 0.3);
        }
        .top-step.in-progress::after {
          background: linear-gradient(to right, #1b4ef5 50%, #e5e7eb 50%) !important;
        }
        
        .top-step:nth-child(1).completed ~ .top-step:nth-child(2)::before {
          content: '';
          position: absolute;
          top: 25px;
          left: -25px;
          width: 50px;
          height: 4px;
          background: #22c55e !important;
          z-index: -1;
          border-radius: 2px;
          box-shadow: 0 2px 4px rgba(34, 197, 94, 0.3);
        }

        .top-step:nth-child(2).completed ~ .top-step:nth-child(3)::before {
          content: '';
          position: absolute;
          top: 25px;
          left: -25px;
          width: 50px;
          height: 4px;
          background: #22c55e !important;
          z-index: -1;
          border-radius: 2px;
          box-shadow: 0 2px 4px rgba(34, 197, 94, 0.3);
        }

        .top-step:nth-child(2).in-progress::after {
          background: linear-gradient(to right, #1b4ef5 50%, #e5e7eb 50%) !important;
        }

        .top-step:nth-child(3).in-progress::after {
          background: linear-gradient(to right, #1b4ef5 50%, #e5e7eb 50%) !important;
        }

        .top-step:nth-child(4).in-progress::after {
          background: linear-gradient(to right, #1b4ef5 50%, #e5e7eb 50%) !important;
        }
        
        .card-box {
          background: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          max-width: 1000px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }
        
        .card-box.small-card {
          max-width: 1000px;
        }

        .card-box.large-card {
          max-width: 1000px;
          background-color: #ffffffff;
        }
        
        .card-box-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          font-weight: 600;
          color: #1f2937;
        }
        
        .card-box-header svg {
          color: #1b4ef5;
          transition: color 0.3s ease;
        }
        
        .card-box-header.blue-header {
          background: linear-gradient(135deg, #4a6cf7, #1b4ef5);
          color: white;
          padding: 20px;
          margin: -30px -30px 20px -30px;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .card-box-header.blue-header svg {
          color: white;
        }
        
        .status-badge {
          background: #22c55e;
          color: white;
          padding: 6px 12px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 500;
          box-shadow: 0 2px 5px rgba(34, 197, 94, 0.3);
        }
        
        .status-badge.in-progress {
          background: #f59e0b;
          box-shadow: 0 2px 5px rgba(245, 158, 11, 0.3);
        }
        
        .card-box-content p {
          font-size: 15px;
          color: #4b5563;
          line-height: 1.6;
        }
        
        .progress-bar-inner {
          width: 100%;
          height: 20px;
          background: #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
          margin: 12px 0;
          position: relative;
        }
        
        .progress-bar-inner.small {
          height: 15px;
        }
        
        .progress-fill-inner {
          height: 100%;
          background: linear-gradient(90deg, #4a6cf7, #1b4ef5);
          transition: width 0.5s ease-in-out;
          border-radius: 10px;
        }
        
        .status-text.in-progress {
          color: #f59e0b;
          font-weight: 600;
          font-size: 14px;
        }
        
        .timer {
          font-weight: 500;
          color: #6b7280;
          font-size: 14px;
          margin-top: 25px;
        }
        
        .timer span {
          display: block;
          font-size: 24px;
          font-weight: 700;
          color: #1f2937;
          margin-top: 6px;
        }
        
        .payment-header {
          width : 100%;
          display: flex;
          flex-direction: column;
          gap: 6px;
          position: relative;
        }
        
        .payment-header::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #1b4ef5, #4a6cf7);
          border-radius: 1px;
        }
        
        .payment-header-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .payment-icon {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #4a6cf7, #1b4ef5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
          box-shadow: 0 2px 6px rgba(74, 108, 247, 0.3);
        }
        
        .step-indicator-large {
          background: #e5e7eb;
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #3d434aff;
          width: fit-content;
        }
        
        .payment-details-content {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        
        .payment-card-wrapper {
          display: flex;
          gap: 25px;
        }
        
        .payment-card-layout {
          display: flex;
          gap: 30px;
          align-items: flex-start;
        }
        
        .input-fields-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .payment-card, .billing-card {
          background: linear-gradient(135deg, #ffffff, #f9fafb);
          padding: 25px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          flex: 1;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .payment-card:hover, .billing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }
        
        .payment-card h4, .billing-card h4 {
          font-size: 14px;
          color: #6b7280;
          margin: 0 0 20px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
        
        .input-field,
        .billing-style,
        .payment-select {
          border: 2px solid #4a6cf7;
          border-radius: 10px;
          padding: 12px 14px;
          background: #fff;
          outline: none;
          box-sizing: border-box;
          position: relative;
          z-index: 1;
        }

        .input-field:focus,
        .billing-style:focus,
        .payment-select:focus {
          border-color: #4a6cf7;
          box-shadow: none;
          outline: none;
        }

        .input-group input,
        .input-group select {
          width: 100%;
          padding: 12px;
          border: 2px solid #4a6cf7;
          border-radius: 10px;
          outline: none;
          background: #fff;
          font-size: 14px;
          color: #000;
        }

        .input-group input::placeholder,
        .input-group select::placeholder {
          color: #a1a1a1;
        }

        .input-label {
          position: absolute;
          top: -8px;
          left: 14px;
          background: #ffff;
          padding: 0 6px;
          font-size: 12px;
          font-weight: 600;
          color: #4a6cf7;
          pointer-events: none;
          z-index: 1;
        }
        
        .input-group .input-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          transition: none;
          z-index: 2;
          pointer-events: none;
        }
        
        .input-field:focus + .input-label + .input-icon,
        .billing-style:focus + .input-label + .input-icon {
          color: #1b4ef5;
        }
        
        .payment-select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%239ca3af' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 40px;
        }
        
        .expiry {
          flex: 2;
          max-width: 180px;
          height: 49px;
        }
        
        .cvv {
          flex: 1;
          max-width: 180px;
          height: 44px;
        }
        
        .row {
          display: flex;
          gap: 20px;
        }
        
        .card-preview-wrapper {
          perspective: 1000px;
          margin-bottom: 0;
        }
        
        .card-preview {
          width: 320px;
          height: 200px;
          position: relative;
          transition: transform 0.6s ease;
          transform-style: preserve-3d;
        }
        
        .card-preview.flipped {
          transform: rotateY(180deg);
        }
        
        .card-front, .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        
        .card-front {
          background: linear-gradient(135deg, #6366f1, #3b82f6);
          color: #fffffdff;
          height: 100%;
        }
        
        .card-back {
          background: linear-gradient(135deg, #6366f1, #3b82f6);
          color: #ffffffff;
          height: 100%;
          transform: rotateY(180deg);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 25px;
          padding: 15px 40px;
          position: relative;
        }

        .cart-button {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ffffffff;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cart-button:hover {
          background: rgba(255, 255, 255, 0.4);
          transform: scale(1.05);
        }

        .card-chip {
          width: 40px;
          height: 30px;
          background: linear-gradient(135deg, gold, #917e10ff);
          border-radius: 4px;
        }
        
        .card-logo {
          align-self: flex-end;
          font-weight: bold;
          font-size: 16px;
        }
        
        .card-number {
          font-size: 18px;
          letter-spacing: 2px;
          margin-top: 20px;
        }
        
        .card-holder, .card-expiry {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin-top: auto;
        }
        
        .card-holder div, .card-expiry div {
          font-size: 14px;
          font-weight: bold;
        }
        
        .card-holder label, .card-expiry label {
          opacity: 0.8;
        }
        
        .magnetic-strip {
          height: 40px;
          background: black;
          margin-top: 20px;
        }
        
        .cvv-label {
          text-align: right;
          font-size: 12px;
          margin-top: 10px;
          opacity: 0.8;
        }
        
        .cvv {
          background: white;
          color: black;
          padding: 8px;
          border-radius: 4px;
          text-align: left;
          margin-top: 5px;
        }
        
        .card-logo-back {
          align-self: flex-end;
          margin-top: 50px;
          font-weight: bold;
          font-size: 16px;
        }
        
        .nav-buttons-inline, .nav-buttons.large-card-nav {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 25px;
        }
        
        .nav-buttons.large-card-nav {
          justify-content: space-between;
        }
        
        button {
          padding: 12px 30px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s ease;
        }
        
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .prev-btn {
          background: #f3f4f6;
          color: #1f2937;
        }
        
        .next-btn {
          background: linear-gradient(135deg, #4a6cf7, #1b4ef5);
          color: white;
        }
        
        .total-box {
          background: #f9fafb;
          padding: 12px 20px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15px;
          color: #1f2937;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
        }
        
        .total-box strong {
          color: #22c55e;
          margin-left: 6px;
        }
        
        .help-card {
          background: white;
          border-radius: 14px;
          padding: 8px 8px;
          margin-top: 30px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: absolute;
          bottom: 20px;
          right: 30px;
        }
        
        .help-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        
        .help-card .help-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #4a6cf7, #1b4ef5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
          font-size: 18px;
          box-shadow: 0 4px 10px rgba(74,108,247,0.3);
        }
        
        .help-card p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
          line-height: 1.4;
        }
        
        .input-group {
          position: relative;
        }

        .input-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }
        
        .dropdown-icon {
          right: 12px;
        }

        .order-summary, .card-summary {
          margin-top: 20px;
          padding: 15px;
          background: #f9fafb;
          border-radius: 12px;
        }
        
        .order-summary h4, .card-summary h4 {
          margin-bottom: 10px;
          color: #1f2937;
        }
        
        .summary-item {
          margin-bottom: 8px;
          color: #4b5563;
        }
        
        .summary-total {
          font-weight: 600;
          color: #22c55e;
          margin-top: 10px;
        }
        
        .card-summary p {
          margin: 5px 0;
          color: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default PaymentPage;