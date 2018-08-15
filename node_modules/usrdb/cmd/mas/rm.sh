if [ -z $1 ];then
    echo "usage rm filename"
else
git rm -r --cached $1
fi
