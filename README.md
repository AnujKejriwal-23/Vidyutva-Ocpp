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
    "idTag": "VID-USER-01",
    "connectorId": 1
  }
  ```
  (If `idTag` or `connectorId` is not provided, defaults are used.)
- **Response:**
  ```json
  {
    "status": "StartTransaction sent for idTag: VID-USER-01 on connectorId: 1"
  }
  ```
- **Description:** Sends a StartTransaction request for the given idTag and connectorId.

---

### 5. Stop Transaction

- **POST** `/stop-transaction`
- **Request Body:**
  ```json
  {
    "meterStop": 1000,
    "idTag": "VID-USER-01"
  }
  ```
  (`transactionId` is automatically fetched from CSMS after StartTransaction.)
- **Response:**
  ```json
  {
    "status": "StopTransaction sent for transactionId: <transactionId>"
  }
  ```
- **Description:** Sends a StopTransaction request using the transactionId received from CSMS, with optional meterStop
