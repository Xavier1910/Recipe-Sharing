# Project Setup: Recipe Sharing

This guide explains how to set up and run the Recipe Sharing project, which consists of a React frontend, a Spring Boot (STS) backend, and a database folder containing SQL files.

## Project Structure
```
Recipe Sharing/
├── frontend/         # React project folder
│   └── christmas_receipe/   # React project files
│       ├── package.json
│       ├── src/
│       └── public/
├── backend/          # Spring Boot project folder
│   └── frostandfeast-api/   # STS project files
│       ├── pom.xml
│       └── src/
├── database/         # Database folder
│   └── database.sql      # SQL file for initial data
└── README.md         # This setup guide
```

## Prerequisites

Make sure you have the following tools installed:

1. **Node.js and npm**: [Download and Install Node.js](https://nodejs.org/)
2. **Spring Tool Suite (STS)**: [Download and Install STS](https://spring.io/tools)
3. **Git**: [Download and Install Git](https://git-scm.com/)
4. **MySQL**: [Download and Install MySQL](https://dev.mysql.com/downloads/)

## Backend (Spring Boot - STS) Setup

### Step 1: Database Setup

1. Open MySQL and create a new database:
   ```sql
   CREATE DATABASE frostandfeast;
   ```
2. Run the SQL scripts from the `database` folder to set up the schema and initial data:
   ```bash
   mysql -u <your-username> -p frostandfeast < database/schema.sql
   mysql -u <your-username> -p frostandfeast < database/data.sql
   ```
3. Update the database credentials in `backend/frostandfeast-api/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/frostandfeast
   spring.datasource.username=<your-username>
   spring.datasource.password=<your-password>
   ```

### Step 2: Import Project into STS

1. Open Spring Tool Suite (STS).
2. Import the backend project:
   - Go to `File > Import > Maven > Existing Maven Projects`.
   - Select the `backend/frostandfeast-api` directory and click `Finish`.
3. Ensure that the Maven dependencies are resolved by right-clicking the project and selecting `Maven > Update Project`.

### Step 3: Run the Backend Application

1. In STS, locate the `FrostandFeastApplication.java` file in the `src/main/java` directory.
2. Right-click the file and select `Run As > Spring Boot App`.
3. Verify the backend is running by accessing:
   ```
   http://localhost:8080
   ```

## Frontend (React) Setup

### Step 1: Install Dependencies

1. Navigate to the `frontend/christmas_receipe` directory:
   ```bash
   cd frontend/christmas_receipe
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```

### Step 2: Start the React Development Server

1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and go to:
   ```
   http://localhost:3000
   ```

## Running the Full Application

1. Start the backend (Spring Boot) as described in the backend setup.
2. Start the frontend (React) as described in the frontend setup.
3. Access the full application at `http://localhost:3000`.

## Deployment

### Backend Deployment
- Package the application as a JAR file:
  ```bash
  mvn package
  ```
- Deploy the JAR file to your preferred server or cloud platform.

### Frontend Deployment
- Build the React app for production:
  ```bash
  npm run build
  ```
- Deploy the `frontend/christmas_receipe/build` folder to a static hosting platform like Netlify, Vercel, or AWS S3.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push the branch to your forked repository:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request to the main repository.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

For questions or support, feel free to contact [Xavier1910](https://github.com/Xavier1910).

