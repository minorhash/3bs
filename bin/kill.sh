sta=$(netstat -lpn |grep 3023)

echo $sta
str=$(echo $sta|awk '{print $7}')

echo $str
str2=${str:0: 4}
echo $str2

kill -9 $str2
