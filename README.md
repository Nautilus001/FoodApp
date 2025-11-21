Welcome to Food App :)
By Justin Bushfield
uOttawa Student Number: 300188318

## NOTE: API endpoint locations:
./context/app-context.tsx:98 <br/>
./app/capture.tsx:61


### Step 1: Clone this repo
git clone https://github.com/Nautilus001/FoodApp
cd FoodApp

### Step 2: Install Dependencies
cd server
npm install
cd ..
npm install

### Ensure API routes are correct. If you are hosting the server on the same machine you are running the client app on (i.e. server on computer, client on web browser on that computer) then the lines should be http://localhost:3000[route]. If you are using Expo Go app, the link will be http://YOUR_COMPUTER_IP:3000/[route]

### Step 4: Run the server
cd server
node server.js

### Step 5: Launch the React App
cd ..
npx expo start

### Some notes:
If you are on uOttawa wifi, or cellular data, Expo Go app will not link to the running project. Super frustrating but you must use the web app. If this is the case, please remember to change the API routes.
