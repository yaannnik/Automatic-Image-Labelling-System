gnome-terminal -t " frontend " -x bash -c " sh ./start-frontend.sh; exec bash;"
gnome-terminal -t " backend " -x bash -c " sh ./start-backend.sh; exec bash;"