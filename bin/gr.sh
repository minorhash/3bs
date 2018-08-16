arg=$(netstat -lpn|grep 3000|awk '{print $7}')

str=${arg: 0:5}
echo $str

if [ -z $str ];then
    echo "dead"
else
kill $str
fi
