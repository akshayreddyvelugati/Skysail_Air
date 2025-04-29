--AIRPORTS 
CREATE TABLE airports (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    terminals INTEGER DEFAULT 1
);

--AIRPLANES
CREATE TABLE airplanes (
    id SERIAL PRIMARY KEY,
    registration_number VARCHAR(20) UNIQUE NOT NULL,
    model VARCHAR(50) NOT NULL,
    manufacturer VARCHAR(50),
    capacity INTEGER DEFAULT 180,
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Maintenance', 'Retired')),
    manufacture_year INTEGER
);

--FLIGHTS 
CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    flight_number VARCHAR(20) UNIQUE NOT NULL,
    origin_airport_id INTEGER REFERENCES airports(id) ON DELETE CASCADE,
    destination_airport_id INTEGER REFERENCES airports(id) ON DELETE CASCADE,
    aircraft_id INTEGER REFERENCES airplanes(id) ON DELETE CASCADE,
    departure_date DATE NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Boarding', 'Departed', 'Arrived', 'Cancelled')),
    price DECIMAL(10, 2) NOT NULL
);

--CREW MEMBERS 
CREATE TABLE crew_members (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    position VARCHAR(30) NOT NULL CHECK (position IN ('Captain', 'Airhostess', 'Flight Engineer', 'Ground Staff')),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    experience_years INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'On Leave', 'Training'))
);

--PASSENGERS
CREATE TABLE passengers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
    nationality VARCHAR(50),
    meal_preference VARCHAR(30) CHECK (meal_preference IN ('Vegetarian', 'Non-Vegetarian', 'Vegan')),
    passport_number VARCHAR(20)
);

--SEATS 
CREATE TABLE seats (
    id SERIAL PRIMARY KEY,
    flight_id INTEGER REFERENCES flights(id) ON DELETE CASCADE,
    seat_number VARCHAR(10) NOT NULL,
    seat_type VARCHAR(20) DEFAULT 'Middle' CHECK (seat_type IN ('Window', 'Aisle', 'Middle')),
    status VARCHAR(20) DEFAULT 'Available' CHECK (status IN ('Available', 'Occupied'))
);

--BOOKINGS 
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    booking_id VARCHAR(30) UNIQUE NOT NULL, -- system-generated (like SKS-2435)
    flight_id INTEGER REFERENCES flights(id) ON DELETE CASCADE,
    passenger_id INTEGER REFERENCES passengers(id) ON DELETE CASCADE,
    seat_id INTEGER REFERENCES seats(id) ON DELETE SET NULL,
    booking_status VARCHAR(20) DEFAULT 'Confirmed' CHECK (booking_status IN ('Confirmed', 'Cancelled', 'Checked-in')),
    total_price DECIMAL(10, 2)
);

--CONTACT 
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(50) NOT NULL CHECK (subject IN ('Booking Inquiry', 'Change Request', 'Refund Request', 'Feedback', 'Other')),
    message TEXT NOT NULL,
    consent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
