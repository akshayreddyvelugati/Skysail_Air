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
    position VARCHAR(30) NOT NULL CHECK (position IN ('Captain', 'First Officer', 'Airhostess', 'Flight Engineer', 'Ground Staff')),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    license_number VARCHAR(30),
    experience_years INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'On Leave', 'Training')),
    CHECK (
        (position IN ('Captain', 'First Officer') AND license_number IS NOT NULL) OR
        (position NOT IN ('Captain', 'First Officer') AND license_number IS NULL)
    )
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


--Insert Data

-- Insert Domestic Airports (8)
INSERT INTO airports (code, name, city, country, terminals) VALUES
('DEL', 'Indira Gandhi International Airport', 'Delhi', 'India', 3),
('BOM', 'Chhatrapati Shivaji Maharaj International Airport', 'Mumbai', 'India', 2),
('BLR', 'Kempegowda International Airport', 'Bengaluru', 'India', 2),
('CCU', 'Netaji Subhas Chandra Bose International Airport', 'Kolkata', 'India', 2),
('MAA', 'Chennai International Airport', 'Chennai', 'India', 2),
('HYD', 'Rajiv Gandhi International Airport', 'Hyderabad', 'India', 1),
('AMD', 'Sardar Vallabhbhai Patel International Airport', 'Ahmedabad', 'India', 2),
('GOI', 'Manohar International Airport', 'Goa', 'India', 1);

-- Insert International Airports (15)
INSERT INTO airports (code, name, city, country, terminals) VALUES
('DXB', 'Dubai International Airport', 'Dubai', 'United Arab Emirates', 3),
('LHR', 'London Heathrow Airport', 'London', 'United Kingdom', 4),
('JFK', 'John F. Kennedy International Airport', 'New York', 'United States', 6),
('SIN', 'Singapore Changi Airport', 'Singapore', 'Singapore', 4),
('BKK', 'Suvarnabhumi Airport', 'Bangkok', 'Thailand', 1),
('DOH', 'Hamad International Airport', 'Doha', 'Qatar', 1),
('FRA', 'Frankfurt Airport', 'Frankfurt', 'Germany', 2),
('CDG', 'Paris Charles de Gaulle Airport', 'Paris', 'France', 3),
('HKG', 'Hong Kong International Airport', 'Hong Kong', 'Hong Kong', 2),
('SYD', 'Sydney Kingsford Smith Airport', 'Sydney', 'Australia', 3),
('ICN', 'Incheon International Airport', 'Seoul', 'South Korea', 2),
('KUL', 'Kuala Lumpur International Airport', 'Kuala Lumpur', 'Malaysia', 2),
('NRT', 'Narita International Airport', 'Tokyo', 'Japan', 3),
('CMB', 'Bandaranaike International Airport', 'Colombo', 'Sri Lanka', 1),
('AUH', 'Abu Dhabi International Airport', 'Abu Dhabi', 'United Arab Emirates', 3);

-- Insert Airplanes (10)
INSERT INTO airplanes (registration_number, model, manufacturer, capacity, status, manufacture_year) VALUES
('VT-IND1', 'A320neo', 'Airbus', 180, 'Active', 2020),
('VT-IND2', 'A320neo', 'Airbus', 180, 'Active', 2021),
('VT-IND3', 'A321neo', 'Airbus', 232, 'Active', 2022),
('VT-AIR1', 'B787-8', 'Boeing', 256, 'Active', 2019),
('VT-AIR2', 'B787-8', 'Boeing', 256, 'Active', 2020),
('VT-IND4', 'A320neo', 'Airbus', 180, 'Active', 2021),
('VT-IND5', 'A321neo', 'Airbus', 232, 'Active', 2023),
('VT-AIR3', 'A350-900', 'Airbus', 300, 'Active', 2024),
('VT-IND6', 'A320neo', 'Airbus', 180, 'Maintenance', 2020),
('VT-AIR4', 'B777-300ER', 'Boeing', 342, 'Active', 2018);

-- Insert Crew Members (30)
INSERT INTO crew_members (employee_id, first_name, last_name, position, email, phone, license_number, experience_years, status) VALUES
('EMP101', 'Sandhiya', 'Kennedy', 'Captain', 'sandhiya.kennedy@airline.com', '+919876543240', 'LIC1001', 10, 'Active'),
('EMP102', 'Akshay', 'Reddy', 'Captain', 'akshay.reddy@airline.com', '+919876543241', 'LIC1002', 9, 'On Leave'),
('EMP103', 'Ashrith', 'Reddy', 'Captain', 'ashrith.reddy@airline.com', '+919876543242', 'LIC1003', 14, 'Active'),
('EMP104', 'Meera', 'Eugil', 'Captain', 'meera.eugil@airline.com', '+919876543243', 'LIC1004', 12, 'Active'),
('EMP105', 'Vivek', 'Venkat', 'Ground Staff', 'vivek.venkat@airline.com', '+919876543244', NULL, 5, 'On Leave'),
('EMP106', 'Neha', 'Kapoor', 'Flight Engineer', 'neha.kapoor@airline.com', '+919876543245', NULL, 13, 'Training'),
('EMP107', 'Sneha', 'Joshi', 'Airhostess', 'sneha.joshi@airline.com', '+919876543246', NULL, 6, 'Training'),
('EMP108', 'Ravi', 'Sinha', 'Airhostess', 'ravi.sinha@airline.com', '+919876543247', NULL, 4, 'Active'),
('EMP109', 'Manish', 'Mehta', 'Ground Staff', 'manish.mehta@airline.com', '+919876543248', NULL, 11, 'Training'),
('EMP110', 'Divya', 'Gupta', 'Flight Engineer', 'divya.gupta@airline.com', '+919876543249', NULL, 15, 'On Leave'),
('EMP111', 'Shalini', 'Chopra', 'Ground Staff', 'shalini.chopra@airline.com', '+919876543250', NULL, 6, 'Training'),
('EMP112', 'Anjali', 'Kapoor', 'First Officer', 'anjali.kapoor@airline.com', '+919876543251', 'LIC112', 13, 'Active'),
('EMP113', 'Simran', 'Kaur', 'Ground Staff', 'simran.kaur@airline.com', '+919876543252', NULL, 12, 'Training'),
('EMP114', 'Rahul', 'Bose', 'Airhostess', 'rahul.bose@airline.com', '+919876543253', NULL, 3, 'Active'),
('EMP115', 'Riya', 'Verma', 'Airhostess', 'riya.verma@airline.com', '+919876543254', NULL, 1, 'On Leave'),
('EMP116', 'Pooja', 'Sharma', 'Flight Engineer', 'pooja.sharma@airline.com', '+919876543255', NULL, 8, 'Active'),
('EMP117', 'Aarti', 'Malhotra', 'Ground Staff', 'aarti.malhotra@airline.com', '+919876543256', NULL, 7, 'On Leave'),
('EMP118', 'Sanjay', 'Reddy', 'Airhostess', 'sanjay.reddy@airline.com', '+919876543257', NULL, 4, 'Training'),
('EMP119', 'Nikhil', 'Patel', 'Ground Staff', 'nikhil.patel@airline.com', '+919876543258', NULL, 2, 'Training'),
('EMP120', 'Tanya', 'Desai', 'Airhostess', 'tanya.desai@airline.com', '+919876543259', NULL, 9, 'Active'),
('EMP121', 'Meera', 'Iyer', 'Airhostess', 'meera.iyer@airline.com', '+919876543260', NULL, 3, 'Training'),
('EMP122', 'Karan', 'Rao', 'First Officer', 'karan.rao@airline.com', '+919876543261', 'LIC122', 10, 'On Leave'),
('EMP123', 'Amit', 'Shah', 'Flight Engineer', 'amit.shah@airline.com', '+919876543262', NULL, 12, 'Active'),
('EMP124', 'Rohit', 'Agarwal', 'Ground Staff', 'rohit.agarwal@airline.com', '+919876543263', NULL, 11, 'On Leave'),
('EMP125', 'Priya', 'Sen', 'Airhostess', 'priya.sen@airline.com', '+919876543264', NULL, 3, 'Active'),
('EMP126', 'Vikram', 'Bhat', 'Airhostess', 'vikram.bhat@airline.com', '+919876543265', NULL, 8, 'Training'),
('EMP127', 'Ashwin', 'Menon', 'First Officer', 'ashwin.menon@airline.com', '+919876543266', 'LIC127', 9, 'Active'),
('EMP128', 'Lakshmi', 'Sharma', 'Flight Engineer', 'lakshmi.sharma@airline.com', '+919876543267', NULL, 6, 'Training'),
('EMP129', 'Nisha', 'Reddy', 'Ground Staff', 'nisha.reddy@airline.com', '+919876543268', NULL, 2, 'Training'),
('EMP130', 'Aditya', 'Kapoor', 'Airhostess', 'aditya.kapoor@airline.com', '+919876543269', NULL, 5, 'Active');



-- Insert Passengers (50)
INSERT INTO passengers (first_name, last_name, email, phone, date_of_birth, gender, nationality, meal_preference, passport_number) VALUES
('Aarav', 'Sharma', 'aarav.sharma@gmail.com', '+919876543301', '1990-03-15', 'Male', 'India', 'Vegetarian', 'A1234567'),
('Priya', 'Verma', 'priya.verma@gmail.com', '+919876543302', '1985-07-22', 'Female', 'India', 'Non-Vegetarian', 'B2345678'),
('John', 'Smith', 'john.smith@gmail.com', '+12025550123', '1978-11-10', 'Male', 'United States', 'Vegan', 'C3456789'),
('Emma', 'Wilson', 'emma.wilson@gmail.com', '+447700900123', '1992-04-05', 'Female', 'United Kingdom', 'Vegetarian', 'D4567890'),
('Ravi', 'Patel', 'ravi.patel@gmail.com', '+919876543303', '1988-09-12', 'Male', 'India', 'Non-Vegetarian', 'E5678901'),
('Anjali', 'Singh', 'anjali.singh@gmail.com', '+919876543304', '1995-01-30', 'Female', 'India', 'Vegetarian', 'F6789012'),
('Hiroshi', 'Tanaka', 'hiroshi.tanaka@gmail.com', '+81312345678', '1980-06-25', 'Male', 'Japan', 'Non-Vegetarian', 'G7890123'),
('Sophie', 'Dubois', 'sophie.dubois@gmail.com', '+33123456789', '1993-08-18', 'Female', 'France', 'Vegan', 'H8901234'),
('Vikram', 'Kumar', 'vikram.kumar@gmail.com', '+919876543305', '1987-12-03', 'Male', 'India', 'Vegetarian', 'I9012345'),
('Neha', 'Gupta', 'neha.gupta@gmail.com', '+919876543306', '1990-05-20', 'Female', 'India', 'Non-Vegetarian', 'J0123456'),
('Ahmed', 'Khan', 'ahmed.khan@gmail.com', '+971501234567', '1985-02-14', 'Male', 'United Arab Emirates', 'Non-Vegetarian', 'K1234567'),
('Lina', 'Chen', 'lina.chen@gmail.com', '+85212345678', '1991-10-09', 'Female', 'Hong Kong', 'Vegetarian', 'L2345678'),
('Sanjay', 'Mehta', 'sanjay.mehta@gmail.com', '+919876543307', '1983-03-27', 'Male', 'India', 'Vegan', 'M3456789'),
('Pooja', 'Rao', 'pooja.rao@gmail.com', '+919876543308', '1994-07-16', 'Female', 'India', 'Vegetarian', 'N4567890'),
('Michael', 'Brown', 'michael.brown@gmail.com', '+12025550124', '1975-11-01', 'Male', 'United States', 'Non-Vegetarian', 'O5678901'),
('Aisha', 'Rahman', 'aisha.rahman@gmail.com', '+97412345678', '1989-09-08', 'Female', 'Qatar', 'Vegetarian', 'P6789012'),
('Arjun', 'Nair', 'arjun.nair@gmail.com', '+919876543309', '1992-04-22', 'Male', 'India', 'Non-Vegetarian', 'Q7890123'),
('Kavita', 'Joshi', 'kavita.joshi@gmail.com', '+919876543310', '1986-06-13', 'Female', 'India', 'Vegan', 'R8901234'),
('Wei', 'Li', 'wei.li@gmail.com', '+861234567890', '1984-12-30', 'Male', 'China', 'Vegetarian', 'S9012345'),
('Clara', 'Müller', 'clara.muller@gmail.com', '+491234567890', '1990-02-17', 'Female', 'Germany', 'Non-Vegetarian', 'T0123456'),
('Rohan', 'Desai', 'rohan.desai@gmail.com', '+919876543311', '1988-08-05', 'Male', 'India', 'Vegetarian', 'U1234567'),
('Shalini', 'Reddy', 'shalini.reddy@gmail.com', '+919876543312', '1993-03-12', 'Female', 'India', 'Non-Vegetarian', 'V2345678'),
('James', 'Taylor', 'james.taylor@gmail.com', '+447700900124', '1982-10-19', 'Male', 'United Kingdom', 'Vegan', 'W3456789'),
('Fatima', 'Ali', 'fatima.ali@gmail.com', '+971501234568', '1991-05-26', 'Female', 'United Arab Emirates', 'Vegetarian', 'X4567890'),
('Karan', 'Bose', 'karan.bose@gmail.com', '+919876543313', '1987-01-04', 'Male', 'India', 'Non-Vegetarian', 'Y5678901'),
('Meera', 'Kapoor', 'meera.kapoor@gmail.com', '+919876543314', '1994-09-21', 'Female', 'India', 'Vegetarian', 'Z6789012'),
('David', 'Lee', 'david.lee@gmail.com', '+82212345678', '1980-07-08', 'Male', 'South Korea', 'Non-Vegetarian', 'A7890123'),
('Anita', 'Yadav', 'anita.yadav@gmail.com', '+919876543315', '1989-11-15', 'Female', 'India', 'Vegan', 'B8901234'),
('Omar', 'Hassan', 'omar.hassan@gmail.com', '+97412345679', '1985-04-02', 'Male', 'Qatar', 'Non-Vegetarian', 'C9012345'),
('Sofia', 'Lopez', 'sofia.lopez@gmail.com', '+61212345678', '1992-12-29', 'Female', 'Australia', 'Vegetarian', 'D0123456'),
('Aditya', 'Rao', 'aditya.rao@gmail.com', '+919876543316', '1986-02-10', 'Male', 'India', 'Non-Vegetarian', 'E1234567');

--FLIGHTS 

CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    flight_number VARCHAR(20) UNIQUE NOT NULL,
    
    -- Foreign keys pointing to the airports table
    origin_airport_id INTEGER NOT NULL REFERENCES airports(id) ON DELETE CASCADE,
    destination_airport_id INTEGER NOT NULL REFERENCES airports(id) ON DELETE CASCADE,

    -- Foreign key pointing to airplanes table
    aircraft_id INTEGER NOT NULL REFERENCES airplanes(id) ON DELETE CASCADE,
    
    departure_date DATE NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    
    status VARCHAR(20) DEFAULT 'Scheduled' CHECK (
        status IN ('Scheduled', 'Boarding', 'Departed', 'Arrived', 'Cancelled')
    ),
    
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),

    -- Ensure no flight is created with same origin and destination
    CHECK (origin_airport_id <> destination_airport_id)
);

SELECT
    f.flight_number AS "Flight",
    a1.code AS "Origin",
    a2.code AS "Destination",
    f.departure_date AS "Date",
    f.departure_time AS "Departure Time",
    f.arrival_time AS "Arrival Time",
    CONCAT(p.manufacturer, ' ', p.model) AS "Aircraft",
    f.status AS "Status",
    CONCAT('₹', f.price) AS "Price"
FROM flights f
JOIN airports a1 ON f.origin_airport_id = a1.id
JOIN airports a2 ON f.destination_airport_id = a2.id
JOIN airplanes p ON f.aircraft_id = p.id
ORDER BY f.departure_date, f.departure_time;
