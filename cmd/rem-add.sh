dir=$(pwd)
str=${dir: -3}
echo $str
if [ -z $1 ];then
    echo "usage"
else
git remote add $1
fi

