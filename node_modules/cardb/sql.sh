#!/bin/bash

dir=$(pwd)
echo $dir

if [ -z "$1" ];then
echo "usage"
else
sqlite3 $dir/db/car.db < $1
fi
