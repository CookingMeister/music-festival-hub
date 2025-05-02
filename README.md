# music-festival-hub

[![badge](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/mit)

## www.customfestivalwear.ca

<img src="client/public/logo.png" alt="festival logo" width="200" height="200">

## Description

customfestivalwear.ca is the ultimate destination for connecting with fellow festival enthusiasts and unleashing your personal creativity! Our colorful platform will soon offer a unique U-Design feature and a vibrant social networking experience where users can share festival tips, favorite artists, fashion inspirations and catch all the latest festival news and updates worldwide!

## Table of Contents

- [Description](#description)
- [Getting Started](#getting-started)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Built-With](#built-with)
- [Credits](#credits)
- [Questions](#questions)
- [Links](#links)
- [License](#license)

## Getting Started

### Installation Instructions

- Follow these steps to set up and run the application locally.

#### Prerequisites

- Before you begin, ensure you have met the following requirements:

  - Node.js installed (version 12.x or higher recommended)
  - npm (Node Package Manager) installed
  - Nodemon installed (optional)
  - MongoDB installed and running locally or access to a MongoDB Atlas cluster

#### Setting Up Your Project

- To set up the project, follow these steps:

1. Clone the repository

   ```bash
   git clone https://github.com/CookingMeister/music-festival-hub.git
   cd music-festival-hub
   ```

2. Install dependencies

    - Navigate to the project directory and run: `npm install`

3. Set up environment variables

    - Create a .env file in the `server` directory of your project directory. Add the necessary environment variables as specified in the .env.Example file provided in the project.
    
    - Make sure to replace the placeholder values with your actual data. For example:

   ```code
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/festival-hub
   JWT_SECRET=your_secret_key_here
   ```

4. Start the MongoDB server
   - If using a local MongoDB server: `mongod`
   - If using MongoDB Atlas, ensure your connection string in the `.env` file is correct

5. Seed the database (optional)

   ```bash
   npm run seed
   ```

6. Start the application
   - For development (with hot reloading):

   ```bash
   npm run dev
    ```

    - For production:

    ```bash
   npm run build
   npm start
   ```

7. Access the application
   - Frontend: [http://localhost:3000](http://localhost:3000)

#### CORS Configuration

The application is configured to accept requests from both the production domain and localhost for development purposes. If you're experiencing CORS issues, check the `corsOptions` in `server/server.js`.

#### Admin Features

The Admin page provides a comprehensive dashboard for managing:

- **Products**: Add, update, and delete products in the Art Market
- **Users**: Manage user accounts, update profiles, and remove users if necessary

## User Story

AS A festival vendor and enthusiast

I WANT a one-stop shop to buy festival merch, buy tickets, connect with festival friends, design my own looks, post my own photos and experiences and get the latest updates

SO THAT I can stay up to date with festivals and friends across the globe

## Acceptance Criteria

**Main**

GIVEN this is a festival minded application

WHEN I see the customfestivalwear.ca logo of the main page

THEN A photo carousel will start to rotate through Best Sellers

WHEN I click on a shortcut button

THEN I am directed to either festival event news, festival tricks, tips and hacks or an amazon store specialized in festival gear.

**Register**

WHEN I click register

THEN I am brought to the registration page that asks my name, email and for a password to be created

WHEN click submit

THEN I am automatically brought to my profile page

**Profile**

WHEN I go to the Profile page

THEN I can add and update sections name, username, about me, favorite festival and a place to upload their profile image

WHEN I am happy with my profile i can click submit to save

THEN if i change my mind I can click delete

**Admin**

WHEN I go to Admin Page

THEN I can see a product form where i am able to update price, title, description, stock and add or delete items

WHEN I scroll to the bottom

THEN I see a Users form where i am able to update and delete users

**Art Market**

WHEN I go to The Art Market

THEN I can click on each drop down menu searching by style, size or bestsellers

WHEN I find the item I want to purchase

THEN I click the Add to Cart Button to purchase

THEN  I am brought to the checkout form

WHEN I add my personal and payment information and click submit

THEN I am brought to the Order Confirmation Modal  that displays my cart items plus tax and shipping and the personal and payment information with a randomly generated order confirmation number

## Built-With

![alt text](client/public/builtwith.png)

- **Frontend**: React, React Bootstrap, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Render.com
- **Future Development**: [Stripe](https://docs.stripe.com/payments?payments=popular) for payment processing

**Assets**

Color Pallette from Coolors
![alt text](client/public/coolors.png)

Socials for Site: [Facebook ](https://https://www.facebook.com/customfestivalwear) (Future Development)

Artwork & Presentation: [Canva](https://www.canva.com/)

## Credits

This app was created by [CookingMeister](https://github.com/CookingMeister),
[SamGreenwood84](https://github.com/SamGreenwood84) and [Samamiraa](https://github.com/samamiraa) on criteria from the University of New Brunswick's [edX Coding Bootcamp program](https://www.unb.ca/cel/career/index.html).
Program materials,[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started), [W3Schools](https://www.w3schools.com/), [stackOverflow.com](https://stackoverflow.com/) and [React Router](https://reactrouter.com/en/main) documentation were referenced for this app.
Tasks were organized using [Trello](https://trello.com).

## Questions

If you have an questions about this app, please contact CookingMeister at [LinkedIn](https://www.linkedin.com/in/shawn-meister-bb646b29a/), SamGreenwood84 at [LinkedIn](https://www.linkedin.com/in/) or Samamiraa at [LinkedIn](https://www.linkedin.com/in/). More of our work can be viewed by clicking on our names above in the [Credits](#credits) section.

## Links

- Deployed App on render.com: [Click Here!](https://music-festival-hub.onrender.com/)

- GitHub Repo [Click Here!](https://github.com/CookingMeister/music-festival-hub.git)

- Google Drive Demo Video: [Click Here!]( https://drive.google.com/file/d/1b22IHA0AH2H1T2S_Mn8nppVCWT9VF67V/view)

- Canva presentation: [Click Here!](https://www.canva.com/design/DAGCJ5D603k/A4Iv53Xum715XocP2SlybQ/edit?utm_content=DAGCJ5D603k&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

<img src="client/public/qr.png" alt="QR Code" width="200" height="200">

## License

[![badge](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/mit)

This project is licensed under the [MIT License](LICENSE).

&copy; 2025
