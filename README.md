# 🚗 Smart Vehicle Contact QR

A full-stack web application that allows vehicle owners to create a unique QR code for their vehicle. A person who finds or needs to contact a vehicle owner can scan the QR code, view the vehicle information, and send an anonymous message without needing to know the owner's phone number.

The project combines **React, Node.js, Express, MongoDB Atlas, JWT authentication, and QR code generation** to provide a simple and privacy-focused vehicle contact system.

---

## ✨ Features

### 🔐 User Authentication

- User registration with name, email, and password
- Secure password hashing using **bcrypt**
- User login with **JWT authentication**
- JWT tokens expire after 7 days
- Persistent login using browser local storage
- Protected routes for authenticated users
- Logout functionality

### 🚗 Vehicle Management

- Add vehicle information after authentication
- Store:
  - Owner name
  - Vehicle brand
  - Vehicle model
  - Vehicle registration number
- Associate each vehicle with the authenticated user
- View vehicles belonging to the logged-in user

### 📱 QR Code Generation

- Automatically generate a unique QR code for each vehicle
- QR code contains the public vehicle URL
- QR code can be scanned to access vehicle information
- Vehicle information can be accessed without logging in

### 💬 Anonymous Messaging

- Visitors can contact a vehicle owner without creating an account
- Send anonymous messages through the vehicle's public page
- Messages are stored in MongoDB
- Vehicle owners can view received messages from their dashboard
- Messages include timestamps

### 📊 User Dashboard

- View all vehicles belonging to the logged-in user
- Display a QR code for each vehicle
- View vehicle information
- View anonymous messages
- Responsive dashboard interface

### 🎨 Responsive UI

- Clean and modern interface
- Responsive layouts for desktop and mobile screens
- Navigation bar with authentication-aware links
- Separate pages for vehicle information, contact, and messaging

---

## 🛠️ Tech Stack

### Frontend

- **React**
- **Vite**
- **React Router**
- **JavaScript (JSX)**
- **CSS**
- **qrcode.react**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB Node.js Driver**
- **JWT (JSON Web Token)**
- **bcrypt**
- **CORS**
- **dotenv**

### Database

- **MongoDB Atlas**

---

## 🏗️ Project Architecture

```text
Smart Vehicle Contact QR
│
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar
│   │   │
│   │   ├── pages/
│   │   │   ├── Home
│   │   │   ├── Login
│   │   │   ├── Register
│   │   │   ├── AddVehicle
│   │   │   ├── Dashboard
│   │   │   ├── Vehicle
│   │   │   ├── ContactOwner
│   │   │   └── Chat
│   │   │
│   │   ├── ProtectedRoute.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── server/                    # Node.js backend
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── vehicleRoutes.js
│   │   └── messageRoutes.js
│   │
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔄 Application Workflow

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Register / Login │
                    └────────┬─────────┘
                             │
                         JWT Token
                             │
                             ▼
                    ┌──────────────────┐
                    │    Dashboard     │
                    └────────┬─────────┘
                             │
                       Add Vehicle
                             │
                             ▼
                    ┌──────────────────┐
                    │     MongoDB      │
                    │    Vehicle Data  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   QR Generation  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Public Vehicle   │
                    │      Page        │
                    └────────┬─────────┘
                             │
                       Contact Owner
                             │
                             ▼
                    ┌──────────────────┐
                    │ Anonymous Chat   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     MongoDB      │
                    │    Messages      │
                    └──────────────────┘
```

---

## 🔐 Authentication Flow

The application uses JWT-based authentication.

### Registration

1. User submits name, email, and password.
2. Backend checks whether the email already exists.
3. Password is hashed using bcrypt.
4. User information is stored in MongoDB.

### Login

1. User submits email and password.
2. Backend retrieves the user from MongoDB.
3. bcrypt verifies the password.
4. Backend generates a JWT.
5. JWT and user information are returned to the frontend.
6. Frontend stores the token in `localStorage`.

### Protected Requests

Authenticated requests include:

```http
Authorization: Bearer <JWT_TOKEN>
```

The backend authentication middleware verifies the token before allowing access to protected resources.

---

## 🚗 Vehicle Data

Each vehicle contains information similar to:

```json
{
  "owner": "Vehicle Owner",
  "brand": "Honda",
  "model": "City",
  "number": "MH12AB1234",
  "userId": "authenticated-user-id",
  "createdAt": "timestamp"
}
```

Vehicles are associated with the user who created them.

This allows the dashboard to display only the authenticated user's vehicles.

---

## 📱 QR Code System

A unique QR code is generated for each vehicle using `qrcode.react`.

The QR code contains a URL similar to:

```text
http://localhost:5173/vehicle/<vehicle-id>
```

When the QR code is scanned:

```text
QR Scan
   ↓
Public Vehicle Page
   ↓
Vehicle Information
   ↓
Contact Owner
   ↓
Anonymous Message
```

The public vehicle page does not require authentication, allowing someone who scans the QR code to access the vehicle information.

---

## 💬 Anonymous Messaging

Visitors can send a message to the vehicle owner without logging in.

Example message:

```text
Your vehicle is blocking the entrance.
```

The backend stores messages with:

```json
{
  "vehicleId": "vehicle-id",
  "message": "Your vehicle is blocking the entrance.",
  "createdAt": "timestamp"
}
```

Vehicle owners can view the received messages from their dashboard.

---

## 🌐 Application Routes

### Frontend Routes

| Route | Purpose | Authentication |
|---|---|---|
| `/` | Home page | Public |
| `/login` | User login | Public |
| `/register` | User registration | Public |
| `/add-vehicle` | Add a vehicle | Protected |
| `/dashboard` | Manage vehicles and messages | Protected |
| `/vehicle/:id` | Public vehicle information | Public |
| `/vehicle/:id/contact` | Contact owner | Public |
| `/vehicle/:id/chat` | Anonymous messaging | Public |

---

## 🔌 Backend API

The backend runs on:

```text
http://localhost:5000
```

### User APIs

#### Register

```http
POST /api/users/register
```

Example request:

```json
{
  "name": "Sanket",
  "email": "sanket@example.com",
  "password": "password123"
}
```

#### Login

```http
POST /api/users/login
```

Example request:

```json
{
  "email": "sanket@example.com",
  "password": "password123"
}
```

---

### Vehicle APIs

#### Add Vehicle

```http
POST /api/vehicles
```

Requires JWT authentication.

Example:

```json
{
  "owner": "Sanket",
  "brand": "Honda",
  "model": "City",
  "number": "MH12AB1234"
}
```

#### Get Logged-in User's Vehicles

```http
GET /api/vehicles
```

Requires JWT authentication.

#### Get Public Vehicle

```http
GET /api/vehicles/:id
```

This endpoint is public so that QR-code visitors can access vehicle information without logging in.

---

### Message APIs

#### Send Anonymous Message

```http
POST /api/messages
```

Example:

```json
{
  "vehicleId": "vehicle-id",
  "message": "Please move your vehicle."
}
```

#### Get Vehicle Messages

```http
GET /api/messages/:vehicleId
```

Returns messages associated with the specified vehicle.

---

## 📁 Database Structure

MongoDB database:

```text
smartVehicleContact
```

Collections:

```text
smartVehicleContact
│
├── users
├── vehicles
└── messages
```

### Users

Stores:

- Name
- Email
- Hashed password
- Account creation date

### Vehicles

Stores:

- Owner
- Brand
- Model
- Registration number
- User ID
- Creation date

### Messages

Stores:

- Vehicle ID
- Message content
- Creation timestamp

---

## ⚙️ Installation

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB Atlas account
- Git

---

## 📥 Clone the Repository

```bash
git clone https://github.com/Sanket-Bagde/smart-vehicle-contact.git
```

Navigate into the project:

```bash
cd smart-vehicle-contact
```

---

## 📦 Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 📦 Install Backend Dependencies

Open another terminal:

```bash
cd server
npm install
```

---

## 🔑 Environment Variables

Create:

```text
server/.env
```

Add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Do **not** commit `.env` to GitHub.

The repository already contains a `.gitignore` rule for environment files.

---

## ▶️ Run the Application

### Start Backend

From the `server` directory:

```bash
node server.js
```

Expected output:

```text
MongoDB connected successfully
Server running on http://localhost:5000
```

### Start Frontend

From the `client` directory:

```bash
npm run dev
```

Vite will provide a local URL similar to:

```text
http://localhost:5173
```

Open that URL in your browser.

---

## 🧪 Main User Flow

The complete implemented flow is:

```text
1. Register
      ↓
2. Login
      ↓
3. Add Vehicle
      ↓
4. Vehicle saved in MongoDB
      ↓
5. QR code generated
      ↓
6. Scan / open QR URL
      ↓
7. View public vehicle information
      ↓
8. Contact Owner
      ↓
9. Send anonymous message
      ↓
10. Owner views message in Dashboard
```

---

## 🔒 Security Considerations

The current implementation includes:

- Password hashing with bcrypt
- JWT-based authentication
- Protected vehicle creation endpoint
- Protected user vehicle listing
- User-specific vehicle filtering
- Environment variables for database credentials and JWT secret
- Public vehicle information endpoint for QR functionality

### Important

The application is currently a development project and should undergo additional security hardening before production deployment.

Possible future production improvements include:

- HTTPS
- Secure HTTP-only cookies
- Rate limiting
- Input validation and sanitization
- CSRF protection where applicable
- Message abuse prevention
- Production-grade secret management
- More restrictive CORS configuration

---

## 📸 Screenshots

Screenshots can be added here to demonstrate the application interface.

Recommended screenshots:

1. Home page
2. Registration page
3. Login page
4. Add Vehicle page
5. Dashboard with QR code
6. Public Vehicle page
7. Contact Owner page
8. Anonymous Chat page

Example:

```markdown
## Screenshots

### Home
![Home Page](screenshots/home.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Vehicle Information
![Vehicle Page](screenshots/vehicle.png)

### Anonymous Chat
![Chat Page](screenshots/chat.png)
```

---

## 🚀 Future Improvements

The current version focuses on the core vehicle contact workflow.

Potential future enhancements include:

- Google Sign-In
- Multiple vehicle management improvements
- Family accounts
- Live location sharing
- Voice messaging
- PWA support
- QR sticker PDF generation
- Scan analytics
- Spam detection
- Admin dashboard
- Notifications

These features are **not part of the current implemented version**.

---

## 🎯 Learning Outcomes

This project provided practical experience with:

- React component development
- React Router
- REST API development
- Node.js and Express
- MongoDB database integration
- MongoDB Atlas
- JWT authentication
- Password hashing with bcrypt
- Middleware implementation
- Protected API routes
- Public and authenticated API design
- QR code generation
- Anonymous messaging
- Frontend-backend integration
- Git and GitHub

---

## 👨‍💻 Author

**Sanket Bagde**

Electronics and Communication Engineering  
Visvesvaraya National Institute of Technology, Nagpur

---

## 📄 License

This project is developed for portfolio purposes.