# Description

This repository contains a RESTful API for managing events, user authentication, and event attendance.


## Key Features

- **Event Management**: Create, update, and delete events with ease.
  
- **Attendee Tracking**: Keep track of event attendees and manage their status.
  
- **Search and Filtering**: Efficiently search and filter events based on various criteria.
  
- **GraphQL Integration**: Utilize GraphQL to fetch specific data and optimize API performance.


## Technologies Stack

- **Nest.js**: A powerful Node.js framework for building scalable and maintainable server-side applications.
  
- **TypeORM**: An ORM for TypeScript and JavaScript that simplifies database interactions.
  
- **Postgres**: A robust relational database system known for its performance and reliability.
  
- **GraphQL**: A query language for APIs that enables precise data retrieval.
  
- **Apollo Server**: A GraphQL server implementation that integrates seamlessly with Node.js.
  
- **Jest**: A popular testing framework for ensuring code reliability through unit and integration tests.
  
- **Docker**: A containerization platform for easy deployment and scaling of applications.


## Installation

1. Install dependencies using your preferred package manager:


```bash
$ npm install
```

1. Host the PostgreSQL database locally using Docker. You can use any version of Docker, including even deprecated versions of Docker Toolbox:
  ```bash
  docker-compose up -d
  ```

2. Fill in the `dev.env` file with your database and JWT secret information. For example:

```
DB_HOST=192.168.99.100
DB_PORT=3306
DB_USER=root
DB_PASSWORD=example
DB_NAME=nest-events

DB_DROP_SCHEMA=0
AUTH_SECRET=secret123
```

3. Run the application:
```bash
  # Dev mode
  $ npm run start:dev

  # Prod mode 
  $ npm run start:prod
```
Be sure that you have a `e2e.env` file in root folder - for prod mode this file is works as a standard `.env`, so it's mandatory.


## Testing

Run the following commands to execute unit tests, end-to-end tests, and generate test coverage reports: 

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## API Endpoints

The API documentation includes endpoints for authentication, user management, and event-related operations. Here are some key endpoints:


### Authentication & User Management

- **Authenticate**: POST **/auth/login** - Allows users to log in and receive an authentication token.

- **Current User Profile**: GET **/auth/profile** - Retrieves the profile information of the authenticated user.

- **Registration**: POST **/users** - Allows users to register with the system.

### Events Attendance

- **Event Attendees**: GET **{{URL}}/events/:id/attendees** - Allows user to retrieve the list of attendees for a specific event identified by ID.

- **Attend Event**: PUT **{{URL}}/current-user-event-attendance/:id** - Enables authenticated user to mark his/her attendance for a specific event identified by its ID.

- **Specific Event Attendance By Current User** - GET **{{URL}}/current-user-event-attendance/:id** - Allows authenticated users to retrieve their attendance status for a specific event identified by its ID.

- **All Events Attendance By Current User** - GET **{{URL}}/current-user-event-attendance** - If user is authenticated, he can retrieve his attendance status for all events.

### Events 

- **Create Event**: POST **{{URL}}/events** -  Create a new event by sending a POST request with event details: name, description, address, and time.

- **Event List**: GET **{{URL}}/events** - If user already authenticated, responce will contain list of all events.

- **Delete Event** DELETE **{{URL}}/events/:id** - Simply delete an event from list by it's ID (only for authenticated users).

- **User's Events** GET **{{URL}}/events-organized-by-user/:id** - Returns a list of all events, created by user with ```id```.

- **Get Single Event** GET **{{URL}}/events/:id** - Loads info about event by it's unique ID.
