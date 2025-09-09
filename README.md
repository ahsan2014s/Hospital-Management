# Hospital Management System

A comprehensive, role-based web application designed to modernize and streamline hospital operations. This MERN stack project provides four distinct dashboards for Administrators, Doctors, Nurses, and Patients, each tailored with specific features to enhance efficiency, improve patient care, and simplify data management.

---

## Key Features

*   **Role-Based Access Control (RBAC):** Secure authentication and authorization system providing unique dashboards and permissions for Admins, Doctors, Nurses, and Patients.
*   ** Dynamic Dashboards:** Each role gets a customized dashboard presenting the most relevant, real-time information at a glance.
*   **Patient Management:** Complete lifecycle management of patients, from registration and admission to discharge.
*   **Appointment Scheduling:** End-to-end appointment management, including patient requests, scheduling, history, and consultation notes.
*   **Staff Management:** Tools for administrators to manage doctor and nurse profiles, departments, and assignments.
*   **Real-time Vitals & Medication Tracking:** Functionality for medical staff to record vital signs and administer medications, with schedules and history available to all relevant parties.
*   **Financial & Inventory Control:** Administrator access to financial transactions, revenue tracking, and management of hospital inventory.
*   **Health Insights & CDC Integration:** Automated health insights for patients and a real-time CDC data feed for doctors to stay updated on public health advisories.

---

## Role-Based Dashboards

The core of the application is its four specialized dashboards:

### 1. Admin Dashboard
The central command center for hospital administration.
*   **Real-time Statistics:** View key metrics like total revenue, active patients, staff count, and bed occupancy.
*   **Patient Management:** Full CRUD (Create, Read, Update, Delete) capabilities for all patient records.
*   **Staff Management:** Onboard new doctors and nurses, update profiles, manage departments, and deactivate accounts.
*   **Financial Overview:** Track all income and expenses, view transaction history, and analyze departmental revenue.
*   **Inventory Control:** Monitor stock levels for medications, equipment, and supplies.
*   **Activity Log:** See a live feed of all significant actions occurring within the system.

### 2. Doctor Dashboard
A focused workspace designed to optimize a doctor's clinical workflow.
*   **Patient Queue:** View a real-time list of waiting patients assigned to you, prioritized by urgency.
*   **Today's Stats:** See a summary of your daily appointments—completed, waiting, and in-progress.
*   **Appointment Management:** Access today's schedule, add consultation notes, record diagnoses, and prescribe medications.
*   **CDC Data Feed:** Stay informed with the latest pandemic information and public health guidelines pulled from external APIs.
*   **Access to Patient Records:** Review a patient's full medical history, vital signs, and past consultations.

### 3. Nurse Dashboard
An operational hub for nurses to manage patient care efficiently.
*   **Assigned Patient List:** Clear overview of all patients currently under your care, including their room number and condition.
*   **Vital Signs Recording:** Easily input and track patient vital signs (blood pressure, heart rate, etc.).
*   **Medication Administration:** View a schedule of medications due, mark them as administered, and add nursing notes.
*   **Nursing Notes:** Add and review care notes for each patient.
*   **Team Collaboration:** View the doctors assigned to your patients for seamless communication.

### 4. Patient Dashboard
A secure and user-friendly portal for patients to manage their health information.
*   **Health Summary:** View your latest vital signs, current medications, and active health insights.
*   **Appointments:** See a list of upcoming appointments and review your appointment history.
*   **Request an Appointment:** Submit a request for a new consultation with preferred dates and departments.
*   **Medical Records:** Access a comprehensive history of your consultations, medications, and diagnoses.
*   **Health Card:** View your digital insurance and membership card.

---

##  Technology Stack

This project is built on the **MERN** stack, chosen for its robustness, scalability, and rapid development capabilities.

### Backend

*   **[Node.js](https://nodejs.org/):** JavaScript runtime for the server.
*   **[Express.js](https://expressjs.com/):** Fast and minimalist web framework for building the RESTful APIs.
*   **[Mongoose](https://mongoosejs.com/):** Elegant Object Data Modeling (ODM) library for MongoDB, used for schema definition and validation.
*   **[MongoDB](https://www.mongodb.com/):** NoSQL database for storing all application data in a flexible, JSON-like format.
*   **Authentication & Security:**
    *   **[JSON Web Tokens (JWT)](https://jwt.io/):** For securing API endpoints and managing user sessions.
    *   **[Bcrypt.js](https://github.com/dcodeIO/bcrypt.js):** For hashing user passwords before storing them in the database.
*   **Validation:**
    *   **[express-validator](https://express-validator.github.io/):** For robust validation and sanitization of incoming API request data.
*   **Environment Management:**
    *   **[dotenv](https://github.com/motdotla/dotenv):** For managing environment variables.

### Frontend (Assumed)

*   **[React.js](https://reactjs.org/):** A declarative JavaScript library for building user interfaces.
*   **[React Router](https://reactrouter.com/):** For client-side routing and navigation between dashboard pages.
*   **[Axios](https://axios-http.com/):** For making promise-based HTTP requests to the backend API.
*   **UI Framework (e.g., [Tailwind CSS](https://tailwindcss.com/) or [Material-UI](https://mui.com/)):** For creating a modern, responsive, and aesthetically pleasing user interface.

### Development & Deployment

*   **[Nodemon](https://nodemon.io/):** For automatically restarting the server during development.
*   **[Postman](https://www.postman.com/):** For API testing and development.
*   **[Git & GitHub](https://github.com/):** For version control and source code management.
