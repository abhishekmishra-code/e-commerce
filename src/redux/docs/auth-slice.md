# 🔄 AuthSlice - Appwrite + Redux Auth State Manager

Manages the **authentication state** of the application using Redux Toolkit, powered by Appwrite.

It wraps Appwrite’s auth logic into Redux async thunks for clean, centralized state control, status handling, and error reporting.

---

## ✅ Features

- 🔐 Login, Register, Logout
- ✅ Fetch current user
- 📊 Status-driven UI support (`loading`, `authenticated`, `error`)
- ❌ Error handling and reporting
- 🚀 Asynchronous logic using `createAsyncThunk`

---

## 🔧 Setup

Ensure `authService` is properly configured and you're using `@reduxjs/toolkit`.

**Folder structure example:**

```
src/
  ├─ redux/
  │   ├─ slices/
  │   │   └─ authSlice.js
  │   └─ store.js
  ├─ appwrite/
  │     └─ AuthService.js
```

---

## 📦 Installation

Install required packages:

```bash
npm install @reduxjs/toolkit react-redux
```

---

## 🎛️ State Structure

```js
{
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error',
  userData: null, // Contains Appwrite user object
  error: null // Stores login/register/fetch errors
}
```

---

## 🧠 Async Thunks

Redux async functions using `createAsyncThunk`.

### 🔐 loginUser({ email, password })

Authenticates a user and stores session in Appwrite, then fetches their data.

```js
dispatch(loginUser({ email: 'email', password: 'secret' }))
```

### 📝 registerUser({ email, password, name })

Registers a new user, then logs in and fetches their data.

```js
dispatch(registerUser({ email: 'email', password: '123', name: 'John' }))
```

### 🔓 logoutUser()

Destroys the current session and clears state.

```js
dispatch(logoutUser())
```

### 👤 fetchCurrentUser()

Fetches the currently authenticated user (persists session on refresh).

```js
dispatch(fetchCurrentUser())
```

🙌 Useful for checking auth status on app load like:

```js
useEffect(() => {
  dispatch(fetchCurrentUser())
}, [])
```

---

## 🏗️ Reducers (`extraReducers`)

### 🔄 Status Flow:

| Action           | `status`         | `userData`         | `error`          |
|------------------|------------------|---------------------|------------------|
| `loginUser.pending` | `"loading"`     | `null`              | `null`           |
| `loginUser.fulfilled` | `"authenticated"` | `User object`    | `null`           |
| `loginUser.rejected` | `"error"`       | `null`              | `"error message"`|
| `logoutUser.fulfilled` | `"unauthenticated"` | `null`          | `null`           |

🔁 Same pattern applies for register and fetch.

---

## 💼 Example Usage in Components

```jsx
const dispatch = useDispatch()
const { status, userData, error } = useSelector(state => state.auth)

const handleLogin = () => {
  dispatch(loginUser({ email: 'test@example.com', password: '123456' }))
}
```

You can show a loading spinner or error like this:

```jsx
{status === 'loading' && <Spinner />}
{status === 'error' && <div>Error: {error}</div>}
```

---

## 🔧 Utility Action

### 🧹 resetError()

Resets the `error` field to `null`.

```js
dispatch(resetError())
```

Useful when navigating away from a failed screen or form.

---

## 📌 Example Flow

```jsx
// Register Flow
await dispatch(registerUser({ email, password, name }))

// Then fetch persisted session if needed
await dispatch(fetchCurrentUser())

// Logout Flow
await dispatch(logoutUser())
```

---

## 📄 Notes

- Based on `@reduxjs/toolkit` for simplicity and performance
- Designed to be UI-agnostic (can be used with React/Vue/Next.js, etc.)
- Uses `createAsyncThunk` for clean async flows
- Works seamlessly with centralized loading and error UI/UX

---

## 📜 Possible Enhancements

- Add `verifyEmail thunk`
- Add `forgotPassword/resetPassword`
- Store session expiration timestamps
- Add offline/session expiration detection
- Handle anonymous/guest login

---

## 🙌 Contributing

Contributions or improvements welcome!

---

## 📜 License

MIT © 2025 - Abhishek Mishra

---

## 📂 Example Project State Update

```js
{
  status: 'authenticated',
  userData: {
    $id: '...',
    name: 'John',
    email: 'john@example.com',
    prefs: { theme: 'dark' }
  },
  error: null
}
```