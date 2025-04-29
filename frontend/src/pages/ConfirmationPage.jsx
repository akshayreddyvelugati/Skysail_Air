
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CheckCircle, Calendar, Plane, Users, CreditCard, Download, Home } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Base Card Component
const Card = styled.article`
background: ${(props) => props.theme.colors?.gray?.[50] || "#f9fafb"};
border-radius: 0.75rem;
padding: 1.5rem;
border: 1px solid ${(props) => props.theme.colors?.gray?.[200] || "#e5e7eb"};
margin-bottom: 1.5rem;
position: relative;

&::before {
content: "";
position: absolute;
top: 0;
left: 0;
width: 6px;
height: 100%;
background: linear-gradient(to bottom, #1A365D, #8b5cf6);
}
`;

// Shared Components
const Container = styled.main`
max-width: 1200px;
margin: 0 auto;
padding: 2rem;
background: linear-gradient(
180deg,
${(props) => props.theme.colors?.white || "#ffffff"} 0%,
${(props) => props.theme.colors?.gray?.[100] || "#f5f5f5"} 100%
);
`;

const Header = styled.header`
text-align: center;
margin-bottom: 2rem;
position: relative;
`;

const BookingId = styled.div`
background: #1A365D;
color: white;
border-radius: 0.5rem;
padding: 0.75rem 1.5rem;
width: fit-content;
margin: 0 auto 1.5rem;
font-weight: 600;
letter-spacing: 1px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
color: ${(props) => props.theme.colors?.primary || "#1A365D"};
font-size: 2.5rem;
font-weight: 700;
margin-bottom: 0.5rem;
font-family: ${(props) => props.theme.fonts?.heading || "sans-serif"};
`;

const Subtitle = styled.p`
color: ${(props) => props.theme.colors?.gray?.[700] || "#4b5563"};
font-size: 1.25rem;
max-width: 600px;
margin: 0 auto;
line-height: 1.5;
font-family: ${(props) => props.theme.fonts?.body || "sans-serif"};
`;

const Section = styled.section`
background: ${(props) => props.theme.colors?.white || "#ffffff"};
border-radius: 1rem;
box-shadow: ${(props) => props.theme.shadows?.md || "0 4px 6px rgba(0, 0, 0, 0.1)"};
padding: 2rem;
margin-bottom: 2rem;
transition: transform 0.3s ease;

&:hover {
transform: translateY(-5px);
box-shadow: ${(props) => props.theme.shadows?.lg || "0 10px 15px rgba(0, 0, 0, 0.1)"};
}
`;

const SectionTitle = styled.h2`
color: ${(props) => props.theme.colors?.primary || "#1A365D"};
font-size: 1.75rem;
font-weight: 600;
margin-bottom: 1.5rem;
font-family: ${(props) => props.theme.fonts?.heading || "sans-serif"};
display: flex;
align-items: center;
gap: 0.75rem;
`;

const Badge = styled.span`
background: ${(props) =>
props.green
? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
: "linear-gradient(135deg, #1A365D 0%, #2563eb 100%)"};
color: white;
padding: 0.25rem 0.75rem;
border-radius: 1rem;
font-size: 0.75rem;
font-weight: 600;
margin-left: 1rem;
`;

const ButtonsContainer = styled.div`
display: flex;
justify-content: center;
gap: 1rem;
margin-top: 2rem;
`;

const Button = styled.button`
background: transparent;
color: ${(props) => props.theme.colors?.primary || "#1A365D"};
padding: 1rem 2rem;
border-radius: 0.75rem;
font-weight: 600;
font-size: 1.25rem;
max-width: 250px;
display: flex;
align-items: center;
justify-content: center;
gap: 0.5rem;
transition: all 0.3s ease;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
border: 2px solid ${(props) => props.theme.colors?.primary || "#1A365D"};

&:hover {
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
background: ${(props) => props.theme.gradients?.primary || "linear-gradient(to right, #1A365D, #7c3aed)"};
color: ${(props) => props.theme.colors?.white || "#ffffff"};
border: none;
}

&:focus {
outline: 2px solid ${(props) => props.theme.colors?.primary || "#1A365D"};
outline-offset: 2px;
}
`;

const ThankYouMessage = styled.section`
text-align: center;
background: linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%);
border-radius: 0.75rem;
padding: 1.5rem;
margin: 2rem 0;
border-left: 6px solid #10b981;

h3 {
color: rgb(29, 88, 183);
font-size: 1.75rem;
margin-bottom: 0.75rem;
}

p {
color: #065f46;
font-size: 1.1rem;
}
`;

const ErrorMessage = styled.section`
color: ${(props) => props.theme.colors?.red || "#dc2626"};
font-size: 1.25rem;
text-align: center;
margin: 2rem 0;
font-weight: 500;
font-family: ${(props) => props.theme.fonts?.body || "sans-serif"};
`;

const flightsData = [
{
id: "SK001",
from: "JFK",
to: "LAX",
fromName: "New York J.F. Kennedy",
toName: "Los Angeles Intl.",
departureTime: "08:00",
arrivalTime: "11:30",
duration: "3h 30m",
price: 299,
airline: "SkySail Airlines",
date: "2025-04-26",
terminal: "T4",
gate: "G12",
aircraft: "Boeing 737-800",
flightNumber: "SS 1234",
},
{
id: "AA101",
from: "JFK",
to: "LAX",
fromName: "New York J.F. Kennedy",
toName: "Los Angeles Intl.",
departureTime: "09:00",
arrivalTime: "12:45",
duration: "3h 45m",
price: 329,
airline: "American Airlines",
date: "2025-04-26",
terminal: "T8",
gate: "G22",
aircraft: "Airbus A321",
flightNumber: "AA 2345",
},
{
id: "UA201",
from: "JFK",
to: "LAX",
fromName: "New York J.F. Kennedy",
toName: "Los Angeles Intl.",
departureTime: "13:00",
arrivalTime: "16:30",
duration: "3h 30m",
price: 359,
airline: "United Airlines",
date: "2025-04-26",
terminal: "T7",
gate: "G7",
aircraft: "Boeing 787-9",
flightNumber: "UA 3456",
},
{
id: "SK004",
from: "LAX",
to: "JFK",
fromName: "Los Angeles Intl.",
toName: "New York J.F. Kennedy",
departureTime: "14:00",
arrivalTime: "21:00",
duration: "4h 0m",
price: 349,
airline: "SkySail Airlines",
date: "2025-04-28",
terminal: "T6",
gate: "G15",
aircraft: "Boeing 737-800",
flightNumber: "SS 5678",
},
{
id: "AA104",
from: "LAX",
to: "JFK",
fromName: "Los Angeles Intl.",
toName: "New York J.F. Kennedy",
departureTime: "15:00",
arrivalTime: "22:30",
duration: "4h 30m",
price: 379,
airline: "American Airlines",
date: "2025-04-28",
terminal: "T5",
gate: "G3",
aircraft: "Airbus A321",
flightNumber: "AA 6789",
},
{
id: "UA204",
from: "LAX",
to: "JFK",
fromName: "Los Angeles Intl.",
toName: "New York J.F. Kennedy",
departureTime: "18:00",
arrivalTime: "01:00",
duration: "4h 0m",
price: 399,
airline: "United Airlines",
date: "2025-04-28",
terminal: "T7",
gate: "G9",
aircraft: "Boeing 787-9",
flightNumber: "UA 7890",
},
];

// Extracted Components
const FlightCard = ({ flight, seats, type }) => {
const formatDate = (dateString) => {
const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
return new Date(dateString).toLocaleDateString("en-US", options);
};

return (
<Card>
<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
<div style={{ fontWeight: 600, color: "#1A365D", display: "flex", alignItems: "center", gap: "0.5rem" }}>
<Plane size={16} aria-hidden="true" />
{type} Flight
</div>
<div style={{ fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5rem", color: "#4b5563" }}>
<Calendar size={16} aria-hidden="true" />
{formatDate(flight.date)}
</div>
</div>

<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "1.5rem 0" }}>
<div style={{ textAlign: "center" }}>
<div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1f2937" }}>{flight.from}</div>
<div style={{ fontSize: "0.875rem", color: "#4b5563" }}>{flight.fromName}</div>
</div>

<div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 1rem" }}>
<div style={{ width: "100%", height: "2px", background: "#d1d5db", position: "relative" }}>
<span
style={{
position: "absolute",
width: "8px",
height: "8px",
borderRadius: "50%",
background: "#1A365D",
top: "50%",
transform: "translateY(-50%)",
left: 0,
}}
></span>
<span
style={{
position:"absolute",
width: "8px",
height: "8px",
borderRadius: "50%",
background: "#1A365D",
top: "50%",
transform: "translateY(-50%)",
right: 0,
}}
></span>
</div>
<div style={{ marginTop: "-14px", marginBottom: "0.5rem", color: "#1A365D" }}>
<Plane size={18} aria-hidden="true" />
</div>
<div style={{ fontSize: "0.875rem", color: "#4b5563", textAlign: "center" }}>{flight.duration}</div>
</div>

<div style={{ textAlign: "center" }}>
<div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1f2937" }}>{flight.to}</div>
<div style={{ fontSize: "0.875rem", color: "#4b5563" }}>{flight.toName}</div>
</div>
</div>

<div
style={{
display: "flex",
justifyContent: "space-between",
flexWrap: "wrap",
marginTop: "1rem",
paddingTop: "1rem",
borderTop: "1px dashed #d1d5db",
}}
>
<FlightDetail label="FLIGHT NO." value={flight.flightNumber} />
<FlightDetail label="DEPARTURE" value={flight.departureTime} />
<FlightDetail label="ARRIVAL" value={flight.arrivalTime} />
<FlightDetail label="TERMINAL" value={flight.terminal} />
<FlightDetail label="GATE" value={flight.gate} />
<FlightDetail label="AIRCRAFT" value={flight.aircraft} />
<FlightDetail label="SEATS" value={seats?.join(", ") || "None"} />
</div>
</Card>
);
};

const FlightDetail = ({ label, value }) => (
<div style={{ marginRight: "1.5rem", marginBottom: "0.5rem" }}>
<div style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>
{label}
</div>
<div style={{ fontWeight: 600, color: "#1f2937" }}>{value}</div>
</div>
);

const PassengerCard = ({ passenger, index, departureSeats, returnSeats, hasReturnFlight }) => (
<Card>
<div
style={{
display: "flex",
justifyContent: "space-between",
marginBottom: "1rem",
paddingBottom: "0.75rem",
borderBottom: "1px solid #e5e7eb",
}}
>
<div style={{ fontWeight: 600, fontSize: "1.1rem", color: "#1f2937" }}>
{passenger.firstName} {passenger.lastName}
</div>
<div style={{ color: "#1A365D", fontWeight: 500 }}>Passenger {index + 1}</div>
</div>

<div
style={{
display: "grid",
gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
gap: "1rem",
}}
>
<PassengerDetail label="Email" value={passenger.email} />
<PassengerDetail label="Phone" value={passenger.phone} />
<PassengerDetail label="Date of Birth" value={passenger.dateOfBirth} />
<PassengerDetail label="Gender" value={passenger.gender} />
<PassengerDetail label="Nationality" value={passenger.nationality} />
<PassengerDetail label="Meal Preference" value={passenger.mealPreference} />
<PassengerDetail label="Departure Seat" value={departureSeats?.[index] || "None"} />
{hasReturnFlight && (
<PassengerDetail label="Return Seat" value={returnSeats?.[index] || "None"} />
)}
</div>
</Card>
);

const PassengerDetail = ({ label, value }) => (
<div>
<div style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>
{label}
</div>
<div style={{ fontWeight: 600, color: "#1f2937" }}>{value}</div>
</div>
);

const PriceSection = styled.section`
background: linear-gradient(135deg, #f6f8fe 0%, #eef1f8 100%);
border-radius: 1rem;
box-shadow: ${(props) => props.theme.shadows?.md || "0 4px 6px rgba(0, 0, 0, 0.1)"};
padding: 2rem;
margin-bottom: 2rem;
`;

const PriceSummary = styled.div`
display: flex;
justify-content: "space-between";
margin-bottom: 1rem;
padding-bottom: 1rem;
border-bottom: 1px solid ${(props) => props.theme.colors?.gray?.[200] || "#e5e7eb"};
`;

const PriceTotal = styled.div`
display: flex;
justify-content: space-between;
font-size: 1.5rem;
font-weight: 700;
color: ${(props) => props.theme.colors?.primary || "#1A365D"};
margin-top: 1rem;
`;

const Confirmation = () => {
const navigate = useNavigate();

// Generate unique booking ID (SS + YearMonthDay + Random 3-digit number)
const generateBookingId = () => {
const today = new Date();
const year = today.getFullYear().toString().slice(2); // Get last two digits of the year
const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
const day = today.getDate().toString().padStart(2, '0');
const randomNum = Math.floor(100 + Math.random() * 900); // 100 to 999
return `SS${year}${month}${day}${randomNum}`;
};

// Always generate a new booking ID in the correct format
const bookingIdValue = generateBookingId();

// Store booking ID in sessionStorage
useEffect(() => {
sessionStorage.setItem("bookingId", bookingIdValue);
}, [bookingIdValue]);

// Retrieve data from sessionStorage
const bookingDetails = JSON.parse(sessionStorage.getItem("bookingDetails") || "{}");
const passengerData = JSON.parse(sessionStorage.getItem("passengerData") || "[]");

// Find flight details
const departureFlight = flightsData.find((f) => f.id === bookingDetails.departureFlightId);
const returnFlight = bookingDetails.returnFlightId
? flightsData.find((f) => f.id === bookingDetails.returnFlightId)
: null;

// Calculate price details
const basePricePerPassenger = (departureFlight?.price || 0) + (returnFlight?.price || 0);
const totalBasePrice = basePricePerPassenger * (bookingDetails.passengerCount || 1);
const taxes = Math.round(totalBasePrice * 0.12);
const totalPrice = totalBasePrice + taxes;

// Handle errors with early returns
if (!departureFlight) {
return (
<Container>
<ErrorMessage role="alert">
Departure flight not found for ID: {bookingDetails.departureFlightId || "none"}
</ErrorMessage>
</Container>
);
}

if (bookingDetails.returnFlightId && !returnFlight) {
return (
<Container>
<ErrorMessage role="alert">
Return flight not found for ID: {bookingDetails.returnFlightId}
</ErrorMessage>
</Container>
);
}

if (!passengerData.length || passengerData.length !== bookingDetails.passengerCount) {
return (
<Container>
<ErrorMessage role="alert">Invalid or missing passenger data</ErrorMessage>
</Container>
);
}

const handleBackToHome = () => {
// Clear sessionStorage
sessionStorage.removeItem("passengerData");
sessionStorage.removeItem("bookingDetails");
sessionStorage.removeItem("bookingId");
// Navigate to home
navigate("/");
};

const generatePDF = () => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  
  // Page dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  
  // Colors
  const primaryColor = [26, 54, 93]; // #1A365D
  const grayColor = [75, 85, 99]; // #4b5563
  const lightGrayColor = [229, 231, 235]; // #e5e7eb

  // Header without logo/icon
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...primaryColor);
  doc.text("SkySail Airlines", margin, 25);
  
  // Booking ID
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.text(`Booking ID: ${bookingIdValue}`, pageWidth - margin, 20, { align: "right" });
  
  // Divider
  doc.setLineWidth(0.5);
  doc.setDrawColor(...primaryColor);
  doc.line(margin, 35, pageWidth - margin, 35);
  
  // Flight Details Section
  doc.setFontSize(16);
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.text("Flight Itinerary", margin, 45);
  
  // Departure Flight Box
  const drawFlightBox = (flight, seats, type, y) => {
    // Box for flight info
    doc.setDrawColor(...lightGrayColor);
    doc.setFillColor(250, 250, 252);
    doc.rect(margin, y, pageWidth - margin * 2, 40, 'FD');
    
    // Flight type label
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.text(`${type} Flight`, margin + 5, y + 8);
    
    // Date
    const flightDate = new Date(flight.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...grayColor);
    doc.text(flightDate, pageWidth - margin - 5, y + 8, { align: "right" });
    
    // Flight route
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    
    // From
    doc.text(flight.from, margin + 5, y + 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(flight.fromName, margin + 5, y + 25);
    
    // Route line
    const lineStart = margin + 60;
    const lineEnd = pageWidth - margin - 60;
    doc.setDrawColor(...grayColor);
    doc.setLineWidth(0.5);
    doc.line(lineStart, y + 20, lineEnd, y + 20);
    
    // Time and duration
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(flight.departureTime, lineStart, y + 18);
    doc.text(flight.arrivalTime, lineEnd, y + 18, { align: "right" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(flight.duration, (lineStart + lineEnd) / 2, y + 25, { align: "center" });
    
    // To
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(flight.to, pageWidth - margin - 5, y + 20, { align: "right" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(flight.toName, pageWidth - margin - 5, y + 25, { align: "right" });
    
    // Flight details
    doc.setDrawColor(...lightGrayColor);
    doc.line(margin + 5, y + 30, pageWidth - margin - 5, y + 30);
    
    // Flight details in two rows
    doc.setFontSize(8);
    doc.setTextColor(...grayColor);
    doc.text("FLIGHT", margin + 10, y + 35);
    doc.text("TERMINAL", margin + 60, y + 35);
    doc.text("GATE", margin + 110, y + 35);
    doc.text("AIRCRAFT", margin + 150, y + 35);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...primaryColor);
    doc.text(flight.flightNumber, margin + 10, y + 40);
    doc.text(flight.terminal, margin + 60, y + 40);
    doc.text(flight.gate, margin + 110, y + 40);
    doc.text(flight.aircraft, margin + 150, y + 40);
    
    // Seats
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...grayColor);
    doc.text("SEATS", pageWidth - margin - 40, y + 35);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...primaryColor);
    doc.text(seats?.join(", ") || "None", pageWidth - margin - 40, y + 40);
    
    return y + 45;
  };
  
  // Add departure flight
  let yPos = 55;
  yPos = drawFlightBox(departureFlight, bookingDetails.departureSeats, "Departure", yPos);
  
  // Add return flight if exists
  if (returnFlight) {
    yPos = drawFlightBox(returnFlight, bookingDetails.returnSeats, "Return", yPos + 5);
  }
  
  // Passenger Details
  yPos += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...primaryColor);
  doc.text("Passenger Details", margin, yPos);
  yPos += 10;
  
  // Add passenger table - removed the "Meal" column
  const passengerData = JSON.parse(sessionStorage.getItem("passengerData") || "[]");
  autoTable(doc, {
    startY: yPos,
    head: [["Name", "Email", "Phone", "DOB", "Nationality", "Seat"]],
    body: passengerData.map((p, i) => [
      `${p.firstName} ${p.lastName}`,
      p.email,
      p.phone,
      p.dateOfBirth,
      p.nationality,
      bookingDetails.departureSeats?.[i] || "None",
    ]),
    styles: {
      font: "helvetica",
      fontSize: 9,
      cellPadding: 5,
      textColor: [33, 33, 33],
      lineColor: [200, 200, 200],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [...primaryColor],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 10,
    },
    alternateRowStyles: { fillColor: [250, 250, 252] },
    margin: { left: margin, right: margin },
  });
  
  // Payment Summary
  yPos = doc.lastAutoTable.finalY + 15;
  
  // Check if we need a new page
  if (yPos > pageHeight - 100) {
    doc.addPage();
    yPos = 30;
  }
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...primaryColor);
  doc.text("Payment Summary", margin, yPos);
  yPos += 10;
  
  // Payment table
  autoTable(doc, {
    startY: yPos,
    head: [["Description", "Amount"]],
    body: [
      [
        `Base Fare (${bookingDetails.passengerCount} passenger${bookingDetails.passengerCount > 1 ? "s" : ""})`,
        `$${totalBasePrice.toFixed(2)}`,
      ],
      ["Taxes and Fees", `$${taxes.toFixed(2)}`],
      ["Total Price", `$${totalPrice.toFixed(2)}`],
    ],
    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 5,
      textColor: [33, 33, 33],
      lineColor: [200, 200, 200],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [...primaryColor],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: [250, 250, 252] },
    margin: { left: margin, right: margin },
    columnStyles: {
      1: { halign: "right", cellWidth: 40 }, // Right-align amounts
    },
  });
  
  // Footer on all pages
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(...grayColor);
    doc.setFont("helvetica", "normal");
    doc.text(
      `SkySail Airlines | www.skysailairlines.com | support@skysail.com | 1-800-555-1234 | Page ${i} of ${pageCount}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
    
    // Bottom line
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(1);
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
  }
  
  // Save the PDF
  doc.save(`SkySail_Booking_${bookingIdValue}.pdf`);
};

return (
<Container>
<Header>
<BookingId>Booking ID: {bookingIdValue}</BookingId>
<Title>Booking Confirmed!</Title>
<Subtitle>
A detailed itinerary has been sent to your mail. <br />
Review your booking details below.
</Subtitle>
</Header>

<Section aria-labelledby="flight-details">
<SectionTitle id="flight-details">
<Plane size={24} aria-hidden="true" />
Flight Details
{bookingDetails.tripType === "roundtrip" && <Badge>Round Trip</Badge>}
{bookingDetails.tripType === "oneway" && <Badge>One Way</Badge>}
</SectionTitle>

<FlightCard flight={departureFlight} seats={bookingDetails.departureSeats} type="Departure" />

{returnFlight && (
<FlightCard flight={returnFlight} seats={bookingDetails.returnSeats} type="Return" />
)}
</Section>

<Section aria-labelledby="passenger-details">
<SectionTitle id="passenger-details">
<Users size={24} aria-hidden="true" />
Passenger Details
<Badge green>{bookingDetails.passengerCount} Passenger(s)</Badge>
</SectionTitle>

{passengerData.map((passenger, index) => (
<PassengerCard
key={index}
passenger={passenger}
index={index}
departureSeats={bookingDetails.departureSeats}
returnSeats={bookingDetails.returnSeats}
hasReturnFlight={!!returnFlight}
/>
))}
</Section>

<PriceSection aria-labelledby="payment-summary">
<SectionTitle id="payment-summary">
<CreditCard size={24} aria-hidden="true" />
Payment Summary
</SectionTitle>
<PriceSummary>
<div>
Base fare ({bookingDetails.passengerCount} passenger{bookingDetails.passengerCount > 1 ? "s" : ""})
</div>
<div>${totalBasePrice}</div>
</PriceSummary>
<PriceSummary>
<div>Taxes and airline fees</div>
<div>${taxes}</div>
</PriceSummary>
<PriceTotal>
<span>Total Price</span>
<span>${totalPrice}</span>
</PriceTotal>
</PriceSection>

<ThankYouMessage role="complementary">
<h3>Thank you for choosing SkySail!</h3>
<p>We can't wait to have you on board!</p>
</ThankYouMessage>

<ButtonsContainer>
<Button onClick={handleBackToHome} aria-label="Return to homepage">
<Home size={20} aria-hidden="true" />
Back to Home
</Button>
<Button onClick={generatePDF} aria-label="Download booking confirmation as PDF">
<Download size={20} aria-hidden="true" />
Download PDF
</Button>
</ButtonsContainer>
</Container>
);
};

export default Confirmation;