if [ -z $1 ];then
    echo "usge arg1=live, test"
else

case $1 in
        live)
sed -i s/cnf.sec/cnf.skl/g pid.js
sed -i s/cnf.sec/cnf.skl/g ../his.js
sed -i s/cnf.pub/cnf.pkl/g aid.js
grep --color pkl aid.js
grep --color skl pid.js
;;
 test)
sed -i s/cnf.skl/cnf.sec/g pid.js
sed -i s/cnf.skl/cnf.sec/g ../his.js
sed -i s/cnf.pkl/cnf.pub/g aid.js
grep --color pub aid.js
grep --color sec pid.js
     ;;
esac
fi
