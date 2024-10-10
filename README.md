# Hands-on-Distributed-services

## Team 11
| Full name       | Group     | Email                           |
|-----------------|-----------|---------------------------------|
| Azamat Bayramov | B22-SD-03 | a.bayramov@innopolis.university |
| Darya Koncheva  | B22-SD-02 | d.koncheva@innopolis.university |
| Matthew Rusakov | B22-SD-03 | m.rusakov@innopolis.university  |
| Egor Valikov    | B22-CBS-01| e.valikov@innopolis.university  |

## Application:

#### Screenshot:

## Codebase organisation:
<pre>
Hands-on-Distributed-services
│
├── backend
│   ├── src
│   │   ├── common
│   │   │   ├── database
│   │   │   │   ├── models
│   │   │   │   │   ├── __init__.py	# Initialize models package
│   │   │   │   │   ├── message.py	# Message model with attributes and collection settings
│   │   │   │   │   └── user.py		# User model with attributes and collection settings
│   │   │   │   ├── repositories
│   │   │   │   │   ├── __init__.py	# Initialize repositories package
│   │   │   │   │   ├── message.py	# Message repository for CRUD and like management
│   │   │   │   │   └── user.py		# User repository for CRUD and existence check
│   │   │   │   ├── __init__.py		# Initialize database package
│   │   │   │   └── db.py		# Database initialization with Beanie and MongoDB models
│   │   │   ├── exceptions
│   │   │   │   ├── __init__.py		# Initialize exceptions package
│   │   │   │   ├── exception.py	# Base ApplicationException and handler for custom exceptions
│   │   │   │   ├── message.py		# Exception for non-existent messages
│   │   │   │   └── user.py		# Exceptions for user existence issues
│   │   │   ├── schemas
│   │   │   │   ├── __init__.py		# Initialize schemas package
│   │   │   │   └── message.py		# Message Data Transfer Object (DTO) schema
│   │   │   ├── __init__.py		# Initialize common package
│   │   │   └── lifespan.py		# FastAPI lifespan context manager for initializing the database
│   │   ├── services
│   │   │   ├── auth
│   │   │   │   ├── __init__.py		# Initialize auth service
│   │   │   │   ├── app.py		# Auth service FastAPI app with CORS and exception handling
│   │   │   │   ├── config.py		# Auth service root path configuration
│   │   │   │   ├── routes.py		# Auth API routes for login and registration
│   │   │   │   ├── schemas.py		# Auth service schema for UsernameDTO with validation
│   │   │   │   └── service.py		# Auth service logic for user registration and login
│   │   │   ├── feed
│   │   │   │   ├── __init__.py		# Initialize feed service
│   │   │   │   ├── app.py		# Feed service FastAPI app with CORS and exception handling
│   │   │   │   ├── config.py		# Feed service configuration for root path and message limit
│   │   │   │   ├── routes.py		# Feed API route to fetch the message feed
│   │   │   │   └── service.py		# Feed service logic to get the latest messages
│   │   │   ├── like
│   │   │   │   ├── __init__.py		# Initialize like service
│   │   │   │   ├── app.py		# Like service FastAPI app with CORS and exception handling
│   │   │   │   ├── config.py		# Like service root path configuration
│   │   │   │   ├── routes.py		# Like API routes for setting and unsetting likes
│   │   │   │   ├── schemas.py		# Like service schema for validating like data (message_id and username)
│   │   │   │   └── service.py		# Like service logic for handling likes and unlikes
│   │   │   ├── message
│   │   │   │   ├── __init__.py		# Initialize message service
│   │   │   │   ├── app.py		# Message service FastAPI app with CORS and exception handling
│   │   │   │   ├── config.py		# Message service root path configuration
│   │   │   │   ├── routes.py		# Message API route for creating a message
│   │   │   │   ├── schemas.py		# Message service schema for message creation validation
│   │   │   │   └── service.py		# Message service logic for creating and returning messages
│   │   │   └── __init__.py		# Initialize services package
│   │   ├── __init__.py			# Initialize src package
│   │   └── config.py			# Application config for database and field length constraints
│   ├── Dockerfile			# Dockerfile defining multiple services for auth, feed, like, and message
│   └── requirements.txt		# Python dependencies for FastAPI and MongoDB-related packages
│
├── frontend
│   ├── src
│   │   ├── api
│   │   │   └── requests.ts		# Handles API requests for user authentication and messaging features using Axios
│   │   ├── components
│   │   │   └── ui
│   │   │       ├── button.tsx		# Implements a customizable button component with variant and size options
│   │   │       ├── card.tsx		# Defines a reusable card component with header, title, description, content, and footer sections
│   │   │       ├── dialog.tsx		# Creates a dialog component with customizable content and actions for modal interactions
│   │   │       └── input.tsx		# Provides a styled input component with a consistent design for user input
│   │   ├── lib
│   │   │   └── utils.ts		# Contains utility functions for class name management using clsx and tailwind-merge
│   │   ├── App.tsx			# Main application component managing user authentication, messaging, and feed display logic
│   │   ├── config.ts			# Exports the domain configuration for the application, allowing easy environment management
│   │   ├── index.css			# Defines the base styles using Tailwind CSS, including custom properties for light and dark themes
│   │   ├── main.tsx			# Entry point of the React application, rendering the main App component in strict mode
│   │   └── vite-env.d.ts		# Provides TypeScript definitions for Vite's client environment, enhancing type support in the project
│   ├── .gitignore			# Ignoring logs, build artifacts, and editor-specific files
│   ├── Dockerfile			# Dockerfile for building and serving the frontend application with Nginx
│   ├── README.md			# Documentation for React + TypeScript + Vite template setup and Expanding the ESLint configuration
│   ├── components.json			# Configuration for component aliases and Tailwind CSS settings
│   ├── eslint.config.js		# ESLint configuration for TypeScript and React with specific rules
│   ├── index.html			# Main HTML file for the application
│   ├── package-lock.json		# Automatically generated file that locks the dependencies versions
│   ├── package.json			# Package configuration for the frontend application, including scripts and dependencies
│   ├── postcss.config.js		# PostCSS configuration for using Tailwind CSS and autoprefixer
│   ├── tailwind.config.js		# Tailwind CSS configuration defining dark mode and theme extensions
│   ├── tsconfig.app.json		# TypeScript configuration for the application, including compiler options and paths
│   ├── tsconfig.json			# Main TypeScript configuration referencing app and node configurations
│   ├── tsconfig.node.json		# TypeScript configuration for Node.js with specific compiler options
│   └── vite.config.ts			# Vite configuration for the React application, including plugins and alias settings
│
├── .env.sample				# Sample environment file for defining environment variables, such as DOMAIN
├── .gitignore				# Specifies files and directories to be ignored by Git
├── Caddyfile				# Caddy configuration for reverse proxying to various backend services and frontend
├── README.md				# Instructions and information about the project setup, organization, and team
├── docker-compose.yml			# Docker Compose configuration for defining services, networks, and volumes
├── requiements.sh			# Shell script for installing Docker and Docker Compose on Ubuntu
└── static				# Placeholder for static files; currently empty
</pre>
## Setup Instructions

##### 1. Clone repository
```
git clone https://github.com/iu-f24-sa-t11/Hands-on-Distributed-services.git
```

##### 2. Create .env file like in .env.sample
```
DOMAIN=<your domain>
```

##### 3.1 Make sure you have insall requirements
```
chmod +x requirements.sh
sudo ./requirements.sh
```

##### 3.2 Start application
```
docker-compose up --build
```

## Link to YouTube video:
