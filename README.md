Welcome to Food App :)<br/>
By Justin Bushfield<br/>
uOttawa Student Number: 300188318<br/>

## NOTE: API endpoint locations:
./context/app-context.tsx:98 <br/>
./app/capture.tsx:61


### Step 1: Clone this repo
git clone https://github.com/Nautilus001/FoodApp<br/>
cd FoodApp

### Step 2: Install Dependencies
cd server <br/>
npm install<br/>
cd ..<br/>
npm install<br/>

### Ensure API routes are correct. If you are hosting the server on the same machine you are running the client app on (i.e. server on computer, client on web browser on that computer) then the lines should be http://localhost:3000[route]. If you are using Expo Go app, the link will be http://YOUR_COMPUTER_IP:3000/[route]

### Step 4: Run the server<br/>
cd server<br/>
node server.js<br/>

### Step 5: Launch the React App<br/>
cd ..<br/>
npx expo start<br/>

### Some notes:<br/>
If you are on uOttawa wifi, or cellular data, Expo Go app will not link to the running project. Super frustrating but you must use the web app. If this is the case, please remember to change the API routes.
