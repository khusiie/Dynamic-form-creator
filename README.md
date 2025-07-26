

A dynamic form editor built with **React (Vite)**, **Tailwind CSS**, **Ant Design**, and **Express.js** backend. It renders forms based on JSON schema, supports nested cards, file uploads, and returns submitted data in JSON format.

---

## 🛠 Tech Stack

- Frontend: React + Vite + Tailwind CSS + Ant Design  
- Backend: Express.js (Node.js)  
- Other: File Upload, JSON Schema, Live Preview

---

## Project Structure

formAssignment/
├── dynamic-form-creator/ → Frontend (React)

└── dynamic-form-backend/ → Backend (Express)


---

## Installation & Running

### Clone the repository and navigate inside:

```bash
git clone https://github.com/khusiie/Dynamic-form-creator.git
cd formAssignment
```
### To start the frontend:

```bash
cd dynamic-form-creator
npm install
npm run dev
```
### To start the backend:


```bash
cd dynamic-form-backend
npm install
node index.js
```

## Features

- Dynamic rendering from JSON Schema  
- File uploads with preview and validation  
- Nested cards for sub-forms  
- Form validation and error handling  
- Submit form and receive JSON output  
- Live preview of filled form data  

---

## API Endpoints

| Method | Endpoint | Description          |
|--------|----------|----------------------|
| POST   | /submit  | Submit form data     |
| POST   | /upload  | Upload image/pdf files|

---

## Screenshots

![Home Page](<img width="1225" height="663" alt="image" src="https://github.com/user-attachments/assets/c5af12d8-729d-45db-b490-dc372b5901f5" />
)

![Form Editor](<img width="1491" height="858" alt="image" src="https://github.com/user-attachments/assets/f12f29e5-91a9-4027-b362-6d978c4d1af0" />
)

![LivePreview/SubmittedData](<img width="1448" height="814" alt="image" src="https://github.com/user-attachments/assets/d24703ff-eaf7-4fe9-96bf-373be1228f3c" />
)



## 🌐 Live Demo

[Live Preview](https://dynamic-form-creator-xcd7.vercel.app/)

---



## 👩‍💻 Author

Khushi Gupta  
GitHub: [https://github.com/khusiie](https://github.com/khusiie)
