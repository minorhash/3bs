dir=$(pwd)
str=${dir: -3}
echo $str
if [ -z $1 ];then
    echo "usage"
else
git pull origin $1
fi
