# TIMES-7 AUTHENTICATION GATEWAY

Client: **Times-7 Research Ltd.**

Authors: **Tane Putaranui**, **Rebekka Jing**, **Laura Cui**, **Egan Ahmad**

```
Master of Software Development
Victoria University of Wellington
27 February 2026
```

## 1. INSTALLATION

## 1.1 Pre-requisites

Install the following software:
```sh
Python >= 3.10
pip
venv (or equiv)
node.js
npm
```
### 1.1.1 Front End

1. Install dependencies
    ```sh
    cd frontend
    npm install
    ```
2. Configure environment variables
    - Create .env.local file inside: `frontend/.env.local`
    - Add the following into .env.local file:
        ```toml
        EXPO_PUBLIC_SUPABASE_URL = {your_supabase_project_url}
        EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY = {your_supabase_anon_or_publishable_key}
        EXPO_PUBLIC_GATEWAY_URL = http://localhost:8000
        ```
### 1.1.2 Back End

1. Create virtual environment
    ```sh
    cd backend/Time7_Gateway/time7_gateway
    Python -m venv .venv
    Source .venv/bin/activate
    ```
2. Install dependencies

    ```sh
    pip install -r requirement.txt
    ```

3. Configure environment variables
    - Create .env file inside: `backend/Time7_Gateway/time7_gateway/.env`
    - Add the following into .env file:
        ```toml
        SUPABASE_URL = {your_supabase_project_url}
        SUPABASE_SERVICE_ROLE_KEY = {your_supabase_service_role_key}
        READER_BASE_URL = http://localhost:8000
        READER_USER = {default: root}
        READER_PASSWORD = {default: impinj}
        ```

### 1.3 Database

Setup the database with the following SQL code:

```SQL
CREATE TABLE public.data (
 tid_hex text NOT NULL,
 first_seen timestamp without time zone NOT NULL,
 auth boolean,
 info text,
 epc_hex text,
 CONSTRAINT data_pkey PRIMARY KEY (tid_hex)
);
CREATE TABLE public.product_info (
 epc text NOT NULL,
 description text,
 origin text,
 produced_on date,
 CONSTRAINT product_info_pkey PRIMARY KEY (epc)
);
CREATE TABLE public.product_photo (
 id uuid NOT NULL DEFAULT gen_random_uuid(),
 photo_url text NOT NULL,
 is_primary boolean NOT NULL DEFAULT false,
 created_at timestamp with time zone NOT NULL DEFAULT now(),
 epc text NOT NULL,
 CONSTRAINT product_photo_pkey PRIMARY KEY (id),
 CONSTRAINT product_photo_epc_fkey FOREIGN KEY (epc)
 REFERENCES public.product_info(epc)
);
```

## 2. RUNNING APPLICATION

### 2.1 Front End

Run the front end application by running the following command in the main folder:
```sh
cd frontend/
npm run start
```
### 2.2 Back End
Run the front end application by running the following command in the main folder:
```sh
cd backend/Time7_Gateway
```
Run the following if the connection log is not required. This will reduce the load on the unicorn:
```sh
uvicorn time7_gateway.main:app --log-level warning --no-access-log
```
Run the following if connection log is required:
```sh 
uvicorn time7_gateway.main:app
```
### 2.3 Testing

This section describes how to execute the testing environment for both the backend
and frontend, as well as a technical overview of each unit-test module included in the
project.

#### 2.3.1 Backend Testing

**1. Navigate to the backend directory**

```sh
cd backend/Time7_Gateway/time7_gateway
```

**2. Run the backend test suite**
```sh
pytest -v
```
#### 2.3.2 Frontend Testing

1. Navigate to the frontend directory
    ```sh
    cd frontend/
    ```

2. Run the frontend test suite
    ```
    npm test
    ```

### 2.4 Simulation

#### 2.4.1 Enable Reader Simulator

1. Configure URL for simulator:

    In `backend/Time7_Gateway/time7_gateway/.env`

    Comment on actual reader URL to disable actual reader connection and
    remove comment on localhost (endpoint for reader simulator)
    ```toml
    #READER_BASE_URL=http://impinj-13-fb-57.local/api/v1
    READER_BASE_URL="http://localhost:8000"
    ```
    vice versa to disable reader simulator to get data from actual reader
    
    If connecting to the reader on Windows, remove .local at the end of the
    reader IP address. Include .local if running macOS.

2. Configure data source

    Ensure that data that need to be simulated are located in `backend/Time7_Gateway/time7_gateway/simulators`

    and update the path of the file accordingly in `backend/Time7_Gateway/time7_gateway/simulators/reader_streamer.py`

    ```python
    DATA_FILE = Path(__file__).with_name("datastream1.ndjson")
    ```

#### 2.4.2 Enable IAS Simulator

In `backend/Time7_Gateway/time7_gateway/main.py`

Change IAS_MODE to “ mock”
```py
# IAS switch (mock vs real)
ias_mode = os.getenv("IAS_MODE", "mock")
app.state.ias_lookup = real_ias_lookup if ias_mode == "real" else mock_ias_lookup
```
*set IAS_MODE to “real” to use actual IAS services.

### 2.5 Debug Tool

#### 2.5.1 Data Extraction

Created to confirm the results of data extraction from the reader stream. It is returning the tags that is stored in `active_tags`

`backend/Time7_Gateway/time7_gateway/debug/reader_extraction.py`

Command to run debug/reader_extraction.py

```sh
python -m time7_gateway.debug.reader_extraction
```

#### 2.5.2 IAS Results

Created to check the results of IAS services. It is returning the tags that is
stored in tag_info_cache

`backend/Time7_Gateway/time7_gateway/debug/postIAS.py`

Command to run debug/postIAS.py
```
python -m time7_gateway.debug.postIAS
```
