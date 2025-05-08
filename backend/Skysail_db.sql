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

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    booking_id VARCHAR(30) UNIQUE NOT NULL, -- system-generated (like SKS-2435)
    flight_id INTEGER REFERENCES flights(id) ON DELETE CASCADE,
    return_flight_id INTEGER REFERENCES flights(id) ON DELETE SET NULL, -- For round-trip
    seat_id INTEGER REFERENCES seats(id) ON DELETE SET NULL,
    booking_status VARCHAR(20) DEFAULT 'Confirmed' CHECK (booking_status IN ('Confirmed', 'Cancelled', 'Checked-in')),
    total_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE passenger_bookings (
    passenger_id INTEGER REFERENCES passengers(id) ON DELETE CASCADE,
    booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
    PRIMARY KEY (passenger_id, booking_id)
);

---------------------------------------------------------------------

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


                               --Domestic flights
INSERT INTO flights (flight_number, origin_airport_id, destination_airport_id, aircraft_id, departure_date, departure_time, arrival_time, status, price)
VALUES 
('SKD001', 2, 3, 3, '2025-05-12', '06:30:00', '11:15:00', 'Scheduled', 6172),
('SKD002', 6, 7, 5, '2025-05-02', '17:45:00', '21:30:00', 'Scheduled', 5425),
('SKD003', 4, 3, 2, '2025-05-16', '04:30:00', '09:45:00', 'Scheduled', 7986),
('SKD004', 5, 1, 3, '2025-06-13', '13:15:00', '17:30:00', 'Scheduled', 5244),
('SKD005', 4, 7, 3, '2025-06-12', '13:30:00', '16:00:00', 'Scheduled', 7326),
('SKD006', 6, 1, 2, '2025-06-02', '20:15:00', '00:00:00', 'Scheduled', 5027),
('SKD007', 3, 5, 2, '2025-05-28', '01:15:00', '03:30:00', 'Scheduled', 8067),
('SKD008', 4, 1, 2, '2025-06-25', '01:15:00', '06:45:00', 'Scheduled', 8106),
('SKD009', 7, 3, 3, '2025-06-14', '14:45:00', '20:45:00', 'Scheduled', 5827),
('SKD010', 1, 3, 5, '2025-05-12', '06:15:00', '09:30:00', 'Scheduled', 8372);

                                 --International flights
INSERT INTO flights (flight_number, origin_airport_id, destination_airport_id, aircraft_id, departure_date, departure_time, arrival_time, status, price)
VALUES 
('SKI001', 7, 17, 9, '2025-07-08', '01:30:00', '07:00:00', 'Scheduled', 31390),
('SKI002', 5, 10, 6, '2025-08-11', '04:45:00', '08:15:00', 'Scheduled', 44560),
('SKI003', 7, 21, 7, '2025-07-01', '04:15:00', '08:30:00', 'Scheduled', 40522),
('SKI004', 6, 12, 9, '2025-08-26', '01:30:00', '05:30:00', 'Scheduled', 34982),
('SKI005', 4, 19, 8, '2025-08-27', '01:15:00', '07:30:00', 'Scheduled', 49456),
('SKI006', 8, 11, 10, '2025-08-01', '03:00:00', '07:30:00', 'Scheduled', 25607),
('SKI007', 6, 16, 10, '2025-08-27', '02:15:00', '07:00:00', 'Scheduled', 19730),
('SKI008', 5, 10, 9, '2025-07-06', '01:45:00', '07:15:00', 'Scheduled', 37170),
('SKI009', 1, 20, 10, '2025-07-08', '04:00:00', '07:00:00', 'Scheduled', 38332),
('SKI010', 6, 23, 10, '2025-08-15', '01:45:00', '05:15:00', 'Scheduled', 28660);
---------------------------------------------------------------------
---------------------------------------------------------------------
--PASSENGERS

--BOOKINGS 















--SEATS 
CREATE TABLE seats (
    id SERIAL PRIMARY KEY,
    flight_id INTEGER REFERENCES flights(id) ON DELETE CASCADE,
    seat_number VARCHAR(10) NOT NULL,
    seat_type VARCHAR(20) DEFAULT 'Middle' CHECK (seat_type IN ('Window', 'Aisle', 'Middle')),
    status VARCHAR(20) DEFAULT 'Available' CHECK (status IN ('Available', 'Occupied'))
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



