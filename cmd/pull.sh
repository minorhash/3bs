br=$(git rev-parse --abbrev-ref HEAD)
echo $br

git pull origin $br
if [ -z $1 ];then
    echo "usage"
else
git pull origin
fi



