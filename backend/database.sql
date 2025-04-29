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

-- Domestic Airports
INSERT INTO airports (code, name, city, country, terminals) VALUES
('DEL', 'Indira Gandhi International Airport', 'Delhi', 'India', 3),
('BOM', 'Chhatrapati Shivaji Maharaj International Airport', 'Mumbai', 'India', 2),
('BLR', 'Kempegowda International Airport', 'Bengaluru', 'India', 2),
('HYD', 'Rajiv Gandhi International Airport', 'Hyderabad', 'India', 2),
('MAA', 'Chennai International Airport', 'Chennai', 'India', 2),
('CCU', 'Netaji Subhas Chandra Bose International Airport', 'Kolkata', 'India', 2),
('AMD', 'Sardar Vallabhbhai Patel International Airport', 'Ahmedabad', 'India', 2),
('COK', 'Cochin International Airport', 'Kochi', 'India', 1),
('GOI', 'Dabolim Airport', 'Goa', 'India', 1),
('PNQ', 'Pune Airport', 'Pune', 'India', 1),
('LKO', 'Chaudhary Charan Singh International Airport', 'Lucknow', 'India', 2),
('JAI', 'Jaipur International Airport', 'Jaipur', 'India', 1),
('TRV', 'Trivandrum International Airport', 'Thiruvananthapuram', 'India', 1),
('IXC', 'Chandigarh Airport', 'Chandigarh', 'India', 1),
('NAG', 'Dr. Babasaheb Ambedkar International Airport', 'Nagpur', 'India', 1),
('BHO', 'Raja Bhoj Airport', 'Bhopal', 'India', 1),
('VGA', 'Vijayawada Airport', 'Vijayawada', 'India', 1),
('IXZ', 'Veer Savarkar International Airport', 'Port Blair', 'India', 1),
('SXR', 'Sheikh ul-Alam International Airport', 'Srinagar', 'India', 1),
('IXB', 'Bagdogra Airport', 'Bagdogra', 'India', 1),
('RAJ', 'Rajkot Airport', 'Rajkot', 'India', 1),
('ATQ', 'Sri Guru Ram Dass Jee International Airport', 'Amritsar', 'India', 1),
('DHM', 'Gaggal Airport', 'Dharamshala', 'India', 1),
('VTZ', 'Visakhapatnam Airport', 'Visakhapatnam', 'India', 1),
('SLV', 'Shimla Airport', 'Shimla', 'India', 1);

-- International Airports
INSERT INTO airports (code, name, city, country, terminals) VALUES
('DXB', 'Dubai International Airport', 'Dubai', 'UAE', 3),
('LHR', 'Heathrow Airport', 'London', 'UK', 5),
('JFK', 'John F. Kennedy International Airport', 'New York', 'USA', 6),
('SIN', 'Singapore Changi Airport', 'Singapore', 'Singapore', 4),
('SYD', 'Sydney Kingsford Smith Airport', 'Sydney', 'Australia', 3),
('BKK', 'Suvarnabhumi Airport', 'Bangkok', 'Thailand', 2),
('CDG', 'Charles de Gaulle Airport', 'Paris', 'France', 3),
('HKG', 'Hong Kong International Airport', 'Hong Kong', 'China', 2),
('LAX', 'Los Angeles International Airport', 'Los Angeles', 'USA', 7),
('FRA', 'Frankfurt Airport', 'Frankfurt', 'Germany', 2),
('KUL', 'Kuala Lumpur International Airport', 'Kuala Lumpur', 'Malaysia', 2),
('AMS', 'Amsterdam Schiphol Airport', 'Amsterdam', 'Netherlands', 1),
('ICN', 'Incheon International Airport', 'Seoul', 'South Korea', 3),
('DOH', 'Hamad International Airport', 'Doha', 'Qatar', 1),
('YYZ', 'Toronto Pearson International Airport', 'Toronto', 'Canada', 2),
('JNB', 'O. R. Tambo International Airport', 'Johannesburg', 'South Africa', 2),
('MEX', 'Mexico City International Airport', 'Mexico City', 'Mexico', 2),
('MAD', 'Adolfo Suárez Madrid–Barajas Airport', 'Madrid', 'Spain', 2),
('NRT', 'Narita International Airport', 'Tokyo', 'Japan', 2),
('GRU', 'São Paulo–Guarulhos International Airport', 'São Paulo', 'Brazil', 2),
('BCN', 'Barcelona–El Prat Airport', 'Barcelona', 'Spain', 2),
('MUC', 'Munich Airport', 'Munich', 'Germany', 2),
('ZRH', 'Zurich Airport', 'Zurich', 'Switzerland', 2),
('VIE', 'Vienna International Airport', 'Vienna', 'Austria', 2),
('OSL', 'Oslo Gardermoen Airport', 'Oslo', 'Norway', 2);




