dir=$(pwd)
str=${dir: -3}
echo $str
git checkout $1
if [ -z $2 ];then
    echo "usage"
else
git merge $2
fi

