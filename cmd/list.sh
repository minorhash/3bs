pw=$(pwd)

echo $pw
str=${pw: -3}

echo $str

log=$(forever list|grep $str|grep -vi stopped|awk '{print $3}')

echo $home/.forever/$log.log
$home/.forever/$log.log
