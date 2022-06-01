# Lightbox Template - Node.js + Socket.io

## Features

* Controller - a PWA for an iOS device 
* Screens - a CSS grid layout for the nine screen video wall 
* Shades - a CSS grid layout for the projection screen

## Overview

This template is for Lightbox projects that have components of the interface on multiple screens that need to share data and/or wish to communicate in some way.

## Developers

The template is built on the [Express](https://expressjs.com/) web application framework. It is set to use the [Handlebars](https://handlebarsjs.com) template engine for views. It includes the module [node-fetch](https://www.npmjs.com/package/node-fetch) for making HTTP requests. And it includes [Socket.IO](https://socket.io/) for sending messages to and from each screen.

### Sockets
Sockets are initialized and managed by the application in /libs/sockests.js.