import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Input = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onBlur,
  error,
  helper,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  showPasswordToggle = false,
  disabled = false,
  required = false,
  className = '',
  ref,
  register,
  multiline = false, // Add multiline prop
  rows = 3, // Add rows prop for textarea
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPasswordType = type === 'password';
  const inputType =
    isPasswordType && showPasswordToggle
      ? isPasswordVisible
        ? 'text'
        : 'password'
      : type;

  const registerProps = register ? register(name) : {};

  const inputClasses = clsx(
    'block w-full text-sm px-3 py-2 rounded-md border transition-all duration-150 bg-white dark:bg-gray-900',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
    'disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-gray-800',
    LeftIcon && 'pl-10',
    (RightIcon || (isPasswordType && showPasswordToggle)) && 'pr-10',
    error
      ? 'border-red-500 text-red-600 placeholder-red-400'
      : 'border-gray-300 text-gray-900 dark:border-gray-600 dark:text-white',
    className
  );

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-800 dark:text-gray-200"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative">
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <LeftIcon className="h-5 w-5" />
          </div>
        )}

        {multiline ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            rows={rows}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : `${name}-helper`}
            ref={ref}
            className={inputClasses}
            {...registerProps}
            {...props}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : `${name}-helper`}
            ref={ref}
            className={inputClasses}
            {...registerProps}
            {...props}
          />
        )}

        {/* Right Icon or Password Toggle */}
        {!multiline && (
          <div className="absolute inset-y-0 right-0 flex items-center">
            {RightIcon && (
              <RightIcon className="h-5 w-5 text-gray-400 pointer-events-none" />
            )}
            {isPasswordType && showPasswordToggle && (
              <button
                type="button"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                className="focus:outline-none text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                tabIndex={-1}
              >
                {isPasswordVisible ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Helper Text */}
      {helper && !error && (
        <p id={`${name}-helper`} className="text-sm text-gray-500">
          {helper}
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  helper: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  showPasswordToggle: PropTypes.bool,
  className: PropTypes.string,
  leftIcon: PropTypes.elementType,
  rightIcon: PropTypes.elementType,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  register: PropTypes.func,
};

export default Input;