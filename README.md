# Phonic Menagerie - Client

Phonic Menagerie is an application for the album collector. The user creates an account and adds, edits, or deletes an album to their own collection or albums they want to purchase in the future on a Wishlist (add, edit, or delete).

## Installation

Clone git repo

```bash
git clone git@github.com/achmaxwell/phonic-menagerie-am.git
```

Phonic Menagerie utilizes node, reactstrap, react-bootstrap, react-router-dom, typescript, and material UI

```bash
npm install reactstrap react-bootstrap react-router-dom typescript @mui/material

# Dependencies

    "@emotion/react": "^11.4.1",
    "@material-ui/core": "^4.12.3",
    "@mui/material": "^5.0.0",
    "@mui/styled-engine-sc": "^5.0.0",
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",
    "@types/bootstrap": "^5.1.6",
    "@types/jest": "^26.0.24",
    "@types/node": "^12.20.25",
    "@types/react": "^17.0.21",
    "@types/react-dom": "^17.0.9",
    "@types/react-router-dom": "^5.3.0",
    "bootstrap": "^5.1.1",
    "react": "^17.0.2",
    "react-bootstrap": "^1.6.4",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.3.0",
    "react-scripts": "4.0.3",
    "reactstrap": "^8.10.0",
    "styled-components": "^5.3.1",
    "typescript": "^4.4.3",

see package.json for all dependencies
```

## Usage

To start application

```python
# start server
nodemon

# start client
npm start

```
Collection/ Wishlist:

- User can create account with email and password
- User can navigate Collection, Wishlist, and if Administrator admin view of users signed up.
- User can add album (artist, album, format, cat#)
- User can edit album
- User can delete album

Admin

- Admin can view all users who have signed up

## TBD Version 2.0

- Third party API for New Releases/ Prices
- Sorting Collection/Wishlist by Artist
- Share with other Users
- Admin have the ability to delete users and edit user content
