# 🎯 AuthService - Appwrite Authentication Wrapper

A simple and scalable authentication service built on top of [Appwrite](https://appwrite.io), providing an easy-to-use interface for user authentication and account management in your app.

---

## ✅ Features

- User Registration & Login
- Logout and Session Management
- Fetch Current User
- Update Email, Name, Password, Phone
- Get Preferences
- Block Account
- Create Anonymous Session
- List Active Sessions

---

## 🔧 Setup

Make sure you have Appwrite configured:

1. Create a **project** in Appwrite.
2. Note your project ID and endpoint.
3. Add them to your config file:

```js
// config/config.js
export default {
  appwriteEndpoint: 'https://<YOUR_APPWRITE_ENDPOINT>/v1',
  appwriteProjectId: '<YOUR_PROJECT_ID>',
}
```

---

## 📦 Installation

Install the required Appwrite SDK if you haven't already:

```bash
npm install appwrite
```

---

## 📁 File Structure

```
src/
  ├─ services/
  |     └─ AuthService.js
  ├─ config/
  |     └─ config.js
```

---

## 📘 Usage

### ✅ Import the AuthService

```js
import authService from './services/AuthService'
```

---

## 📚 Methods

### 📝 register({ email, password, name })

Create a new user account.

```js
await authService.register({
  email: 'user@example.com',
  password: 'yourpassword',
  name: 'User Name'
})
```

---

### 🔐 login({ email, password })

Log in a user.

```js
await authService.login({
  email: 'user@example.com',
  password: 'yourpassword',
})
```

---

### 🔓 logout()

Logout the currently logged-in user (deletes current session).

```js
await authService.logout()
```

---

### 👤 getCurrentUser()

Gets currently logged-in user account details.

```js
const user = await authService.getCurrentUser()
```

---

### ⚙️ getPreferences()

Returns user preferences as a key-value object.

```js
const prefs = await authService.getPreferences()
```

---

### 📧 updateEmail({ email, password })

Update the user’s email address. Requires current password.

```js
await authService.updateEmail({
  email: 'new@example.com',
  password: 'currentpassword',
})
```

---

### 📝 updateName({ name })

Update the user’s full name.

```js
await authService.updateName({ name: 'New Name' })
```

---

### 🔑 updatePassword({ newPassword, oldPassword })

Update the user's password.

```js
await authService.updatePassword({
  newPassword: 'newpassword123',
  oldPassword: 'oldpassword123',
})
```

---

### ☎️ updatePhone({ phone, password })

Update the user’s phone number. Requires current password.

```js
await authService.updatePhone({
  phone: '+1234567890',
  password: 'yourpassword',
})
```

---

### 🚫 blockAccount()

Permanently blocks user access (does not delete the account).

```js
await authService.blockAccount()
```

---

### 👻 createAnonymousSession()

Create a guest session (no email/password required).

```js
await authService.createAnonymousSession()
```

---

### 💻 listSessions()

Lists all active sessions (devices) for the current user.

```js
const sessions = await authService.listSessions()
```

---

## 🎯 Example Flow

```js
await authService.register({
  email: 'john@example.com',
  password: 'john12345',
  name: 'John Doe',
})

await authService.login({
  email: 'john@example.com',
  password: 'john12345',
})

const user = await authService.getCurrentUser()
console.log('Logged in user:', user)

await authService.logout()
```

---

## 📄 Notes

- Handles basic error catching with `console.error` – you can customize error handling to show UI alerts/snackbars.
- Designed to work with React/Vue/Next.js or any frontend JS framework.
- Ensure your Appwrite project has the correct permissions and authentication settings enabled.

---

## 📌 To Do (Optional Enhancements)

- Support for:
  - Email verification flow
  - OAuth2 login
  - Delete user
- Integration with React Context or Redux state

---

## 🙌 Contributing

Contributions, issues, and features are welcome! Feel free to fork this and build on top.

---

## 📜 License

MIT © 2025 - Abhishek Mishra

---