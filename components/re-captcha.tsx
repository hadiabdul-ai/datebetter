// components/ReCaptcha.tsx
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
}

const ReCaptcha: React.FC<ReCaptchaProps> = ({ onVerify }) => {
  const handleChange = (value: string | null) => {
    onVerify(value);
  };

  return (
    <ReCAPTCHA
      sitekey="6LdJrQ8qAAAAANtDkh5w7jFpJNXXl_QwDWGTXddC"
      onChange={handleChange}
    />
  );
};

export default ReCaptcha;





