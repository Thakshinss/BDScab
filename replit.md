# RideEasy - Cab Booking Application

## Overview

RideEasy is a modern cab booking web application built with React frontend and Express.js backend. The application allows users to search for rides, view available vehicles, and book transportation services with email notifications. It features a clean, responsive design using shadcn/ui components and Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack React Query for server state
- **Build Tool**: Vite for development and production builds
- **Email Service**: EmailJS for client-side email functionality

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Storage**: In-memory storage with interface for future database integration
- **Development**: Hot reload with Vite middleware integration

### Database Strategy
- **Current**: In-memory storage implementation (MemStorage class)
- **Future**: PostgreSQL with Drizzle ORM (schema already defined)
- **Migrations**: Drizzle Kit for schema management

## Key Components

### Frontend Structure
- **Pages**: Home, Results, Contact Us, Booking, and 404 Not Found
- **Components**: 
  - Search form with validation
  - Car showcase and selection
  - Booking modal with customer details
  - Responsive header and footer
  - Toast notifications
- **UI Library**: Complete shadcn/ui component set for consistent design

### Backend Structure
- **Storage Interface**: Abstracted CRUD operations for users
- **Route Handler**: Centralized API route registration
- **Development Tools**: Request logging and error handling middleware

### Core Features
- **Vehicle Search**: Location-based search with date/time selection
- **Car Selection**: Multiple vehicle types (sedan, SUV, mini, tempo traveler)
- **Booking Process**: Customer details collection and confirmation
- **Email Notifications**: Automated booking confirmations via EmailJS
- **Contact Support**: Dedicated contact page with form and business information
- **Responsive Design**: Mobile-first approach with adaptive layouts

## Data Flow

1. **Search Process**: User enters pickup/destination → Client validation → Navigate to results
2. **Vehicle Selection**: Display available cars → Calculate fares → Show booking options
3. **Booking Navigation**: Click "Book Now" → Navigate to dedicated booking page with trip details
4. **Booking Flow**: Review trip summary → Collect customer details → Validate form → Send email confirmation
5. **State Management**: React Query handles async operations and caching

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React ecosystem with hooks and context
- **Styling**: Tailwind CSS with custom design tokens
- **Icons**: Lucide React for consistent iconography
- **Form Handling**: React Hook Form with Zod validation
- **Email Service**: EmailJS for client-side email delivery

### Backend Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle with type-safe database operations
- **Validation**: Zod schemas for runtime type checking
- **Session Management**: PostgreSQL session store (connect-pg-simple)

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **ESBuild**: Fast bundling for production builds
- **Replit Integration**: Development environment with cartographer plugin

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `npm run db:push`

### Environment Configuration
- **Development**: Local server with Vite middleware and HMR
- **Production**: Express serves static files with API routes
- **Database**: Environment variable `DATABASE_URL` for connection

### Runtime Environment
- **Node.js**: ES modules with modern JavaScript features
- **Session Persistence**: PostgreSQL-backed session storage
- **Error Handling**: Comprehensive error middleware with logging

The application is designed with scalability in mind, using interfaces that allow easy migration from in-memory storage to persistent database solutions. The modular architecture supports feature additions and maintenance through clear separation of concerns.