sta=$(netstat -lpn |grep 3023)

echo $sta
str=$(echo $sta|awk '{print $7}')

echo $str
str2=${str:0: -5}
echo $str2

if [ -z $str2 ];then
    echo "dead"
else
kill -9 $str2
fi
