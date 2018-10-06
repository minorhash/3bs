dir=$(pwd)
str=${dir: -3}
echo $str

if [ -z $2 ];then
git checkout $1
    echo "usage chk arg1 merge arg2"
else
git merge $2
fi

