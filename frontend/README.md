# Taitaja9

## Overview

Taitaja9 is a web application designed to manage and display information for a competition. The application includes features for user authentication, team management, and displaying competition results.

## Project Structure

The project is structured as follows:

```
frontend/
	.gitignore
	package.json
	public/
		favicon.ico
		index.html
		logo192.png
		logo512.png
		manifest.json
		robots.txt
	README.md
	src/
		App.css
		App.jsx
		App.test.js
		components/
			Footer.jsx
			Header.jsx
		images/
			tausta.png
		index.css
		index.js
		logo.svg
		pages/
			Addteam.jsx
			AddUser.jsx
			Dashboard.jsx
			Etusivu.jsx
			Infotaulu.jsx
			JoukkueHallinta.jsx
			Login.jsx
			NotFound.jsx
		reportWebVitals.js
		setupTests.js
		styles/
			Footer.css
			Header.css
			Infotaulu.css
			Styles.css
			Etusivu.css
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/Taitaja9.git
   ```
2. Navigate to the `frontend` directory:
   ```sh
   cd Taitaja9/frontend
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Application

To start the application, run:
```sh
npm start
```
This will start the development server and open the application in your default web browser.

### Building the Application

To build the application for production, run:
```sh
npm run build
```
This will create a `build` directory with the production build of the application.

### Running Tests

To run the tests, use:
```sh
npm test
```

## Project Features

- **User Authentication**: Users can log in to access different parts of the application.
- **Team Management**: Admin users can add teams using a CSV file and manage existing teams.
- **Competition Dashboard**: Displays information about the competition, including top teams and their scores.
- **Responsive Design**: The application is designed to be responsive and works well on both desktop and mobile devices.

## File Descriptions

- App.jsx: Main application component that sets up routing and renders the header, footer, and main content.
- Footer.jsx: Footer component with links to various informational pages.
- Header.jsx: Header component with navigation buttons.
- `src/pages/*`: Various pages of the application, including login, dashboard, and team management pages.
- `src/styles/*`: CSS files for styling the application.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Material-UI](https://mui.com/)

