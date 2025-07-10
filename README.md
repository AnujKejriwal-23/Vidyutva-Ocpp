# VID-OCPP Backend API

This backend provides endpoints to manage OCPP (Open Charge Point Protocol) WebSocket connections and trigger OCPP messages.

## Endpoints

### 1. Connect to CSMS WebSocket

- **URL:** `/connect`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "url": "ws://<csms-server-url>"
  }
  ```
- **Description:**  
  Establishes a WebSocket connection to the given CSMS (Central System Management System) URL using the OCPP 2.0.1 protocol.

- **Responses:**
  - `200 OK`
    ```json
    { "status": "Connecting to ws://<csms-server-url>" }
    ```
  - `400 Bad Request`
    ```json
    { "error": "Invalid WebSocket URL" }
    ```

---

### 2. Send BootNotification and Start Heartbeat

- **URL:** `/boot`
- **Method:** `POST`
- **Body:** _None_
- **Description:**  
  Sends a BootNotification message to the CSMS and starts sending periodic Heartbeat messages over the established WebSocket connection.

- **Responses:**
  - `200 OK`
    ```json
    { "status": "BootNotification + Heartbeat loop started" }
    ```
  - `500 Internal Server Error`
    ```json
    { "error": "WebSocket not connected" }
    ```

---

## Notes

- All endpoints expect and return JSON.
- The WebSocket connection must be established using `/connect` before calling `/boot`.
- Configuration for the charge point is loaded from environment variables in the `.env` file.

---

## Example Usage

1. **Connect to CSMS:**

   ```sh
   curl -X POST http://localhost:3000/connect -H "Content-Type: application/json" -d '{"url":"ws://localhost:9000"}'
   ```

2. **Send BootNotification and start Heartbeat:**
   ```sh
   curl -X POST http://localhost:3000/boot
   ```
