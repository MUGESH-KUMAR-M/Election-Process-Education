// API Key validation utilities
export const validateGeminiAPIKey = (apiKey) => {
  if (!apiKey || typeof apiKey !== 'string') {
    return {
      isValid: false,
      error: 'API key is required and must be a string'
    };
  }

  // Gemini API keys typically start with 'AIza' and are 39 characters long
  const geminiKeyPattern = /^AIza[A-Za-z0-9_-]{35}$/;
  
  if (!geminiKeyPattern.test(apiKey.trim())) {
    return {
      isValid: false,
      error: 'Invalid API key format. Gemini API keys should start with "AIza" and be 39 characters long.'
    };
  }

  return {
    isValid: true,
    error: null
  };
};

// Input validation for user messages
export const validateUserInput = (input, maxLength = 1000) => {
  if (!input || typeof input !== 'string') {
    return {
      isValid: false,
      error: 'Input is required and must be a string'
    };
  }

  const trimmedInput = input.trim();
  
  if (trimmedInput.length === 0) {
    return {
      isValid: false,
      error: 'Input cannot be empty'
    };
  }

  if (trimmedInput.length > maxLength) {
    return {
      isValid: false,
      error: `Input must be ${maxLength} characters or less`
    };
  }

  // Basic XSS prevention - check for potentially dangerous patterns
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:text\/html/gi
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(trimmedInput)) {
      return {
        isValid: false,
        error: 'Input contains potentially unsafe content'
      };
    }
  }

  return {
    isValid: true,
    error: null,
    sanitized: trimmedInput
  };
};

// Email validation for contact forms
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return {
      isValid: false,
      error: 'Email is required and must be a string'
    };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailPattern.test(email.trim())) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }

  return {
    isValid: true,
    error: null,
    sanitized: email.trim().toLowerCase()
  };
};
