dir=$(pwd)
str=${dir: -3}
echo $str

git merge git@github.com:minorhash/$str.git/master

