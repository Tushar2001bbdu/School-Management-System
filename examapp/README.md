This project is a Student Management System integrated with AWS Rekognition for automated attendance. The system leverages AWS S3 for image storage, DynamoDB for student records, and Rekognition for facial recognition to track attendance of students and teachers.

Features
Automated Attendance System: Using AWS Rekognition, the system matches students' and teachers' faces to stored records.
Student and Teacher Management: CRUD operations for managing student and teacher data.
AWS Rekognition Integration: Identifies individuals based on face data and updates their attendance records.
DynamoDB Integration: Stores facial recognition data and student records.
AWS S3 Storage: Captures and stores webcam images in S3 buckets for processing and comparison.
Technologies Used
Node.js: Backend runtime environment.
Express.js: Web framework for creating HTTP servers and REST APIs.
Next.Js:For designing the front end
MongoDB: Database for storing student and teacher information.
AWS S3: Storage for webcam images.
AWS Rekognition: Facial recognition to identify and verify users.
AWS DynamoDB: NoSQL database to store facial recognition IDs.
JavaScript/ES6: Backend logic.
Table of Contents
Getting Started
Installation
Usage
AWS Setup
Project Structure
API Endpoints
License
Getting Started
This guide will help you get the project up and running on your local machine for development and testing purposes.

Prerequisites
Before you begin, make sure you have the following installed:

Node.js (v14 or higher)
MongoDB (Local or Atlas)
AWS account with access to S3, Rekognition, and DynamoDB
Git (for cloning the repository)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/student-management-system.git
cd student-management-system
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file at the root of your project and configure the following variables:


AWS_ACCESS_KEY_ID=<your-aws-access-key>
AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
AWS_REGION=<aws-region>
S3_BUCKET_NAME_TEST=<your-s3-bucket-for-testing>
S3_BUCKET_NAME_TRAIN=<your-s3-bucket-for-training>
DYNAMO_DB_TABLE_NAME=<your-dynamodb-table>
MONGODB_URI=<your-mongodb-uri>
Run the server:

bash

npm start
The server will start on http://localhost:3001.

Usage
Uploading an Image
Send a POST request with a base64 image to initiate the attendance recognition process:

bash

POST /app/attendance
Request Body:

{
  "url": "<base64-encoded-image>"
}
Response:
If the face is recognized, the system will update the attendance of the corresponding student or teacher.
If the face is not recognized, an error message will be returned.

S3 Buckets:

Create two S3 buckets:
One for testing (school-management-system-bucket-testing)
One for storing recognized images (school-management-system-bucket-training)
Ensure you have the correct permissions for uploading images.
Rekognition:

Create a Rekognition collection named smsusers for storing face data.
Ensure the role used by Rekognition has permissions to access S3 and DynamoDB.
DynamoDB:

Create a table named facerecognition with the following key:
Primary key: RekognitionId (String)
This table will store the recognized face IDs.
Project Structure
plaintext
Copy code
├── config/               # AWS Clients and configurations
├── models/               # Mongoose models for MongoDB (Students, Teachers)
├── routes/               # API routes
├── controllers/          # Logic for handling attendance and recognition
├── app.js                # Main entry point
├── package.json          # Dependencies and scripts
└── README.md             # This file
API Endpoints
POST /api/attendance: Uploads an image and updates attendance.
GET /api/students/
: Retrieves student details by roll number.
POST /api/students: Adds a new student record.
GET /api/teachers/
: Retrieves teacher details.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit and push to your branch (git push origin feature-branch).
