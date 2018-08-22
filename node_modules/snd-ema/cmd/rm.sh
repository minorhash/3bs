if [ -z $1 ];then
echo "usage rm filename"
else
git rm -r $1
fi
