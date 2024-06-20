# Smart Parking Unioeste

## Description

Smart Parking Unioeste is a Node.js API for registering, listing, and reserving parking spots in a smart parking system. The system uses publish-subscribe communication via the MQTT (Message Queuing Telemetry Transport) protocol.

The technology has been tested and implemented using sensors for vehicle presence detection, computer vision through cameras with recognition using YOLO (You Only Look Once).

Reservations and viewing of available spots are done through an Apple Watch app and a Flutter app.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/sofiarovaris/Smart_Parking_Unioeste.git
   ```
   
## Installation

2. Install project dependencies:

   ```bash
   cd Smart_Parking_Unioeste
   npm install
   ```
   
## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. Access the API at [http://localhost:3000](http://localhost:3000).

3. Use the API endpoints to register, list, and reserve parking spots.

## Configuration

- Make sure to properly configure the MQTT server for proper communication with the involved devices and applications.

