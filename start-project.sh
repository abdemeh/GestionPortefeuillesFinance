#!/bin/bash

# Open terminal for backend
gnome-terminal -- bash -c "cd ./backend && sbt run; exec bash"

# Open terminal for frontend
gnome-terminal -- bash -c "cd ./frontend && npm start; exec bash"
