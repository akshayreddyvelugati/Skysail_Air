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
INSERT INTO crew_members (employee_id, first_name, last_name, position, email, phone, experience_years, status) VALUES
('EMP001', 'Rahul', 'Sharma', 'Captain', 'rahul.sharma@airline.com', '+919876543201', 15, 'Active'),
('EMP002', 'Priya', 'Verma', 'Airhostess', 'priya.verma@airline.com', '+919876543202', 5, 'Active'),
('EMP003', 'Amit', 'Patel', 'Flight Engineer', 'amit.patel@airline.com', '+919876543203', 10, 'Active'),
('EMP004', 'Anjali', 'Singh', 'Airhostess', 'anjali.singh@airline.com', '+919876543204', 4, 'Active'),
('EMP005', 'Vikram', 'Kumar', 'Captain', 'vikram.kumar@airline.com', '+919876543205', 12, 'Active'),
('EMP006', 'Neha', 'Gupta', 'Airhostess', 'neha.gupta@airline.com', '+919876543206', 3, 'Active'),
('EMP007', 'Sanjay', 'Mehta', 'Flight Engineer', 'sanjay.mehta@airline.com', '+919876543207', 8, 'Active'),
('EMP008', 'Pooja', 'Rao', 'Airhostess', 'pooja.rao@airline.com', '+919876543208', 6, 'Active'),
('EMP009', 'Arjun', 'Nair', 'Captain', 'arjun.nair@airline.com', '+919876543209', 14, 'Active'),
('EMP010', 'Kavita', 'Joshi', 'Airhostess', 'kavita.joshi@airline.com', '+919876543210', 5, 'Active'),
('EMP011', 'Ravi', 'Desai', 'Flight Engineer', 'ravi.desai@airline.com', '+919876543211', 9, 'Active'),
('EMP012', 'Shalini', 'Reddy', 'Airhostess', 'shalini.reddy@airline.com', '+919876543212', 4, 'Active'),
('EMP013', 'Karan', 'Bose', 'Captain', 'karan.bose@airline.com', '+919876543213', 16, 'Active'),
('EMP014', 'Meera', 'Kapoor', 'Airhostess', 'meera.kapoor@airline.com', '+919876543214', 3, 'Active'),
('EMP015', 'Rohit', 'Chopra', 'Flight Engineer', 'rohit.chopra@airline.com', '+919876543215', 7, 'Active'),
('EMP016', 'Sneha', 'Malhotra', 'Airhostess', 'sneha.malhotra@airline.com', '+919876543216', 5, 'Active'),
('EMP017', 'Aditya', 'Rao', 'Captain', 'aditya.rao@airline.com', '+919876543217', 13, 'Active'),
('EMP018', 'Divya', 'Pillai', 'Airhostess', 'divya.pillai@airline.com', '+919876543218', 4, 'Active'),
('EMP019', 'Manish', 'Agarwal', 'Flight Engineer', 'manish.agarwal@airline.com', '+919876543219', 10, 'Active'),
('EMP020', 'Tanya', 'Sen', 'Airhostess', 'tanya.sen@airline.com', '+919876543220', 6, 'Active'),
('EMP021', 'Vivek', 'Iyer', 'Captain', 'vivek.iyer@airline.com', '+919876543221', 15, 'Active'),
('EMP022', 'Riya', 'Dutta', 'Airhostess', 'riya.dutta@airline.com', '+919876543222', 3, 'Active'),
('EMP023', 'Nikhil', 'Shah', 'Flight Engineer', 'nikhil.shah@airline.com', '+919876543223', 8, 'Active'),
('EMP024', 'Aarti', 'Menon', 'Airhostess', 'aarti.menon@airline.com', '+919876543224', 5, 'Active'),
('EMP025', 'Siddharth', 'Venkat', 'Captain', 'siddharth.venkat@airline.com', '+919876543225', 12, 'Active'),
('EMP026', 'Lakshmi', 'Nair', 'Airhostess', 'lakshmi.nair@airline.com', '+919876543226', 4, 'Active'),
('EMP027', 'Prakash', 'Sinha', 'Flight Engineer', 'prakash.sinha@airline.com', '+919876543227', 9, 'Active'),
('EMP028', 'Simran', 'Kaur', 'Airhostess', 'simran.kaur@airline.com', '+919876543228', 6, 'Active'),
('EMP029', 'Harish', 'Mohan', 'Captain', 'harish.mohan@airline.com', '+919876543229', 14, 'Active'),
('EMP030', 'Nisha', 'Bhat', 'Airhostess', 'nisha.bhat@airline.com', '+919876543230', 3, 'Active');

-- Insert Domestic Flights (15)
INSERT INTO flights (flight_number, origin_airport_id, destination_airport_id, aircraft_id, departure_date, departure_time, arrival_time, status, price) VALUES
('6E-101', 1, 2, 1, '2025-05-01', '06:00:00', '08:30:00', 'Scheduled', 6000.00), -- DEL-BOM
('6E-102', 2, 3, 2, '2025-05-01', '09:00:00', '11:00:00', 'Scheduled', 5500.00), -- BOM-BLR
('AI-401', 3, 4, 3, '2025-05-01', '07:30:00', '10:00:00', 'Scheduled', 7000.00), -- BLR-CCU
('6E-103', 4, 5, 1, '2025-05-01', '12:00:00', '14:15:00', 'Scheduled', 6500.00), -- CCU-MAA
('AI-402', 5, 6, 2, '2025-05-01', '15:00:00', '16:30:00', 'Scheduled', 5000.00), -- MAA-HYD
('6E-104', 6, 7, 3, '2025-05-01', '08:00:00', '09:30:00', 'Scheduled', 5200.00), -- HYD-AMD
('6E-105', 7, 8, 1, '2025-05-01', '10:00:00', '11:45:00', 'Scheduled', 5800.00), -- AMD-GOI
('AI-403', 8, 1, 2, '2025-05-01', '13:00:00', '15:30:00', 'Scheduled', 6200.00), -- GOI-DEL
('6E-106', 1, 3, 3, '2025-05-01', '16:00:00', '18:15:00', 'Scheduled', 6800.00), -- DEL-BLR
('6E-107', 2, 4, 1, '2025-05-01', '17:00:00', '19:30:00', 'Scheduled', 7100.00), -- BOM-CCU
('AI-404', 3, 5, 2, '2025-05-01', '06:30:00', '08:45:00', 'Scheduled', 5400.00), -- BLR-MAA
('6E-108', 4, 6, 3, '2025-05-01', '09:30:00', '11:45:00', 'Scheduled', 5900.00), -- CCU-HYD
('6E-109', 5, 7, 1, '2025-05-01', '12:30:00', '14:00:00', 'Scheduled', 5100.00), -- MAA-AMD
('AI-405', 6, 8, 2, '2025-05-01', '15:30:00', '17:15:00', 'Scheduled', 5700.00), -- HYD-GOI
('6E-110', 7, 1, 3, '2025-05-01', '18:00:00', '20:15:00', 'Scheduled', 6400.00); -- AMD-DEL

-- Insert International Flights (30)
INSERT INTO flights (flight_number, origin_airport_id, destination_airport_id, aircraft_id, departure_date, departure_time, arrival_time, status, price) VALUES
('AI-101', 1, 9, 4, '2025-05-01', '02:00:00', '04:30:00', 'Scheduled', 25000.00), -- DEL-DXB
('6E-201', 1, 10, 5, '2025-05-01', '03:00:00', '09:00:00', 'Scheduled', 45000.00), -- DEL-LHR
('AI-102', 1, 11, 8, '2025-05-01', '01:30:00', '12:00:00', 'Scheduled', 75000.00), -- DEL-JFK
('6E-202', 1, 12, 4, '2025-05-01', '23:00:00', '04:30:00', 'Scheduled', 30000.00), -- DEL-SIN
('AI-103', 1, 13, 5, '2025-05-01', '22:00:00', '03:00:00', 'Scheduled', 28000.00), -- DEL-BKK
('6E-203', 2, 9, 4, '2025-05-01', '03:30:00', '06:00:00', 'Scheduled', 26000.00), -- BOM-DXB
('AI-104', 2, 10, 8, '2025-05-01', '02:00:00', '08:00:00', 'Scheduled', 46000.00), -- BOM-LHR (Fixed time)
('6E-204', 2, 14, 5, '2025-05-01', '01:00:00', '07:00:00', 'Scheduled', 40000.00), -- BOM-DOH
('AI-105', 3, 12, 4, '2025-05-01', '23:30:00', '05:00:00', 'Scheduled', 31000.00), -- BLR-SIN
('6E-205', 3, 13, 5, '2025-05-01', '22:30:00', '03:30:00', 'Scheduled', 29000.00), -- BLR-BKK
('AI-106', 4, 15, 4, '2025-05-01', '10:00:00', '14:30:00', 'Scheduled', 35000.00), -- CCU-HKG
('6E-206', 5, 9, 5, '2025-05-01', '04:00:00', '06:30:00', 'Scheduled', 27000.00), -- MAA-DXB
('AI-107', 6, 12, 4, '2025-05-01', '23:00:00', '04:30:00', 'Scheduled', 32000.00), -- HYD-SIN
('6E-207', 7, 9, 5, '2025-05-01', '05:00:00', '07:30:00', 'Scheduled', 26500.00), -- AMD-DXB
('AI-108', 8, 13, 4, '2025-05-01', '21:00:00', '02:00:00', 'Scheduled', 29500.00), -- GOI-BKK
('6E-208', 1, 14, 5, '2025-05-01', '02:30:00', '08:30:00', 'Scheduled', 38000.00), -- DEL-DOH
('AI-109', 1, 16, 8, '2025-05-01', '03:00:00', '09:00:00', 'Scheduled', 42000.00), -- DEL-FRA
('6E-209', 1, 17, 4, '2025-05-01', '01:00:00', '07:00:00', 'Scheduled', 43000.00), -- DEL-CDG
('AI-110', 2, 11, 8, '2025-05-01', '02:00:00', '12:30:00', 'Scheduled', 76000.00), -- BOM-JFK
('6E-210', 2, 18, 5, '2025-05-01', '22:00:00', '06:00:00', 'Scheduled', 50000.00), -- BOM-SYD
('AI-111', 3, 9, 4, '2025-05-01', '04:30:00', '07:00:00', 'Scheduled', 27500.00), -- BLR-DXB
('6E-211', 4, 13, 5, '2025-05-01', '09:00:00', '14:00:00', 'Scheduled', 28500.00), -- CCU-BKK
('AI-112', 5, 12, 4, '2025-05-01', '23:30:00', '05:00:00', 'Scheduled', 31500.00), -- MAA-SIN
('6E-212', 6, 9, 5, '2025-05-01', '05:30:00', '08:00:00', 'Scheduled', 26800.00), -- HYD-DXB
('AI-113', 7, 14, 4, '2025-05-01', '03:00:00', '09:00:00', 'Scheduled', 39000.00), -- AMD-DOH
('6E-213', 8, 9, 5, '2025-05-01', '04:00:00', '06:30:00', 'Scheduled', 27000.00), -- GOI-DXB
('AI-114', 1, 19, 8, '2025-05-01', '02:00:00', '07:30:00', 'Scheduled', 41000.00), -- DEL-ICN
('6E-214', 1, 20, 5, '2025-05-01', '01:30:00', '07:30:00', 'Scheduled', 36000.00), -- DEL-KUL
('AI-115', 2, 21, 8, '2025-05-01', '23:00:00', '06:00:00', 'Scheduled', 45000.00), -- BOM-NRT
('6E-215', 3, 22, 4, '2025-05-01', '10:30:00', '13:30:00', 'Scheduled', 25000.00); -- BLR-CMB

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