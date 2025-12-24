# Task Manager – Fullstack Mini Project

This project is a small full-stack task management application , it allows users to manage projects and tasks with authentication, progress tracking, and a clean UI.

## Features

### Authentication
- Login with email and password
- JWT-based authentication
- Protected backend routes

### Projects
- Create a project (title + description)
- View list of user projects
- View project details

### Tasks
- Add tasks to a project
- Task fields: title, description, due date
- Mark tasks as completed
- Delete tasks
- List all tasks of a project

### Project Progress
- Total number of tasks
- Completed tasks
- Progress percentage displayed with a progress bar

## Tech Stack

### Backend
- **Framework:** Spring Boot 3.3.2
- **Language:** Java 21
- **Security:** Spring Security + JWT (io.jsonwebtoken 0.12.6)
- **Database:** MySQL 8.0
- **ORM:** Spring Data JPA / Hibernate
- **Build Tool:** Maven  

### Frontend
- **Framework:** React 18.x
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios
- **Styling:** Bootstrap 5
- **Build Tool:** Create React App

### Database
- **Development:** MySQL (via XAMPP)
- **Production Ready:** Compatible with any MySQL 8.0+ server

### Tools
- IntelliJ IDEA
- VS Code
- Git & GitHub

## Installation

### Clone the Repository
```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager
```
### Backend Setup

#### a) Create MySQL Database
```sql
CREATE DATABASE taskmanager;
```
Or use phpMyAdmin (XAMPP):
1. Open `http://localhost/phpmyadmin`
2. Click "New"
3. Database name: `taskmanager`
4. Click "Create"

#### b) Configure Database Connection
Edit `backend/src/main/resources/application.properties`:

#### c) Run Backend
```bash
cd taskmanager
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

The backend will start on `http://localhost:8080`

**Test User Created Automatically:**
- Email: `test@example.com`
- Password: `password123`

---

### Frontend Setup

#### a) Install Dependencies
```bash
cd taskmanager-frontend
npm install
```

#### b) Start Development Server
```bash
npm start
```
The frontend will open automatically on `http://localhost:3000`

## Author
**Jlaika Malak **






