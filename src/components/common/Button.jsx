import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Spinner from './Spinner';

const variantClasses = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400',
  secondary:
    'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:focus:ring-gray-500',
  outline:
    'bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-50 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-500',
  'danger-outline':
    'bg-transparent border border-red-300 text-red-600 hover:bg-red-50 focus:ring-red-300 dark:border-red-500 dark:text-red-400 dark:hover:bg-red-900/20 dark:focus:ring-red-500',
  success:
    'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-400',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-400',
  blank:
    '',
};

const sizeClasses = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  loading = false,
  disabled = false,
  as: Component = 'button',
  ...props
}) => {
  return (
    <Component
      type={Component === 'button' ? type : undefined}
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200',
        variantClasses[variant],
        sizeClasses[size],
        {
          'opacity-50 cursor-not-allowed': disabled || loading,
          'cursor-pointer': !disabled && !loading,
        },
        className
      )}
      {...props}
    >
      {loading && (
        <Spinner className="mr-2" size={size === 'lg' ? 'md' : 'sm'} />
      )}
      {children}
    </Component>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger-outline', 'success', 'danger']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  as: PropTypes.elementType,
};

export default Button;