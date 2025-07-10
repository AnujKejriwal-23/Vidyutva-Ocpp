## API Endpoints

### 1. Connect to WebSocket

- **POST** `/connect`
- **Request Body:**
  ```json
  {
    "url": "ws://your-ocpp-server-url"
  }
  ```
- **Response:**
  ```json
  {
    "status": "Connecting to ws://your-ocpp-server-url"
  }
  ```
- **Description:** Connects to the specified OCPP WebSocket server.

---

### 2. Boot Notification

- **POST** `/boot`
- **Request Body:** _None_
- **Response:**
  ```json
  {
    "status": "BootNotification + Heartbeat loop started"
  }
  ```
- **Description:** Sends a BootNotification and starts the Heartbeat loop.

---

### 3. Authorize

- **POST** `/authorize`
- **Request Body:**
  ```json
  {
    "idTag": "VID-USER-01"
  }
  ```
- **Response:**
  ```json
  {
    "status": "Authorize sent for VID-USER-01"
  }
  ```
- **Description:** Sends an Authorize request for the given idTag.

---

### 4. Start Transaction

- **POST** `/start-transaction`
- **Request Body:**
  ```json
  {
    "idTag": "VID-USER-01"
  }
  ```
  (If `idTag` is not provided, defaults to `"VID-USER-01"`.)
- **Response:**
  ```json
  {
    "status": "StartTransaction sent for idTag: VID-USER-01"
  }
  ```
- **Description:** Sends a StartTransaction request for the given idTag.

---
