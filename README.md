# Photo Wall Backend API

Welcome to the Photo Wall Backend API! This API allows users to create, manage, and interact with photo walls.

## Features

-   Create, read, update, and delete photo walls
-   Upload and manage photos

## Built With

-   Node.js
-   Express
-   MongoDB + Mongoose

# Photo API Endpoints

## Base URL

http://localhost:8000/photos

## Endpoints

### 1. Get All Photos

-   **Method**: `GET`
-   **URL**: `/`
-   **Query Parameters**:
    -   `page` (optional): The page number for pagination. Defaults to 1.
    -   `limit` (optional): The number of photos per page. Defaults to 100.
-   **Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
          "photos": [
            {
              "_id": "photo_id",
              "note": "note",
              "photoUrl": "photo_url"
            },
            ...
          ],
          "currentPage": 1,
          "totalPages": 3
        }
        ```

---

### 2. Get Photo by ID

-   **Method**: `GET`
-   **URL**: `/:id`
-   **Path Parameters**:
    -   `id`: The ID of the photo.
-   **Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "data": {
                "_id": "photo_id",
                "note": "note",
                "photoUrl": "photo_url"
            }
        }
        ```
    -   **Status**: `404 Not Found`
    -   **Body**:
        ```json
        {
            "message": "Photo not found"
        }
        ```

---

### 3. Create a New Photo

-   **Method**: `POST`
-   **URL**: `/`
-   **Request Body**:
    ```json
    {
        "note": "note",
        "photoUrl": "photo_url"
    }
    ```
-   **Response**:
    -   **Status**: `201 Created`
    -   **Body**:
        ```json
        {
            "data": {
                "_id": "photo_id",
                "note": "note",
                "photoUrl": "photo_url"
            }
        }
        ```
    -   **Status**: `400 Bad Request`
    -   **Body**:
        ```json
        {
            "message": "Photo URL is required"
        }
        ```

---

### 4. Update a Photo

-   **Method**: `PATCH`
-   **URL**: `/:id`
-   **Path Parameters**:
    -   `id`: The ID of the photo.
-   **Request Body**:
    ```json
    {
        "note": "updated_note"
    }
    ```
-   **Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "data": {
                "_id": "photo_id",
                "note": "updated_note",
                "photoUrl": "photo_url"
            }
        }
        ```
    -   **Status**: `404 Not Found`
    -   **Body**:
        ```json
        {
            "message": "Photo not found"
        }
        ```

---

### 5. Delete a Photo

-   **Method**: `DELETE`
-   **URL**: `/:id`
-   **Path Parameters**:
    -   id: The ID of the photo.
-   **Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "message": "Photo successfully deleted"
        }
        ```

## Installation and Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/edignot/photo-wall-backend.git
    cd photo-wall-backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a .env file and paste your MongoDB access URL:
    ```bash
    DATABASE_URL=<your_mongodb>
    ```
4. Run the development server:
    ```bash
    npm run dev
    ```
