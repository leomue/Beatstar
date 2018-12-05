#!/bin/bash

find . | xargs -I {} ../../../indent.sh {}