if [ -z $1 ];then
    echo "usge arg1=live, test"
else

case $1 in
live)
sed -i s/cnf.sand/cnf.live/g suc.js
sed -i s/cnf.tid/cnf.lid/g suc.js
sed -i s/cnf.tsc/cnf.lsc/g suc.js
;;

test)
sed -i s/cnf.live/cnf.sand/g suc.js
sed -i s/cnf.lid/cnf.tid/g suc.js
sed -i s/cnf.lsc/cnf.tsc/g suc.js
;;

esac
grep cnf suc.js
fi
