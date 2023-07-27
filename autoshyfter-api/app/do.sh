#!/bin/bash

if [ "$1" = "create" ]
then
    # Create a controller class
    if [ "$2" = "controller" ]
    then
        cp "controllers/.Template.js" "controllers/$3.js"
        sed -i '' "s/CLASSNAME/$3/g" "controllers/$3.js"
        echo "Controller created"
    fi

    # Create a gate class
    if [ "$2" = "gate" ]
    then
        cp "gates/.Template.js" "gates/$3.js"
        sed -i '' "s/GATENAME/$3/g" "gates/$3.js"
        echo "Gate created"
    fi

    # Create a rule class
    if [ "$2" = "rule" ]
    then
        cp "rules/.Template.js" "rules/$3.js"
        sed -i '' "s/RULENAME/$3/g" "rules/$3.js"
        echo "Rule created"
    fi

    # Create a validator class
    if [ "$2" = "validator" ]
    then
        cp "validators/.Template.js" "validators/$3.js"
        sed -i '' "s/VALIDATORNAME/$3/g" "validators/$3.js"
        echo "Validator created"
    fi
fi
