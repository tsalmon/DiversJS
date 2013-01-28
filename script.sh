#!bin/bash

if [ "$#" -lt 2 -o "$#" -gt 2 ] 
then
    echo "Il faut deux arguments"
    exit 1;
fi

if [ -e "$1" ]
then
    echo "Le fichier $1 existe deja dans le repertoire courant"
fi

mkdir "$1"
echo "<html>\n\t<head>\n\t\t<link rel=\"stylesheet\" href=\"index.css\"/>\n\t</head>\n\t<body>\n\t\t<script src=\"main.js\"></script>\n\t</body></html>" > "$1/index.html"
echo "" > "$1/index.css"
echo "" > "$1/main.js"
echo "$2" > "$1/readme"