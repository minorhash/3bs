if [ -z $1 ];then
    echo "usage"
else
git push -u origin $1
fi
