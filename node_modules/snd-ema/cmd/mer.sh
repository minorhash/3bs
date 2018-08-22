dir=$(pwd)
str=${dir: -7}
echo $str

git merge git@github.com:minorhash/$str.git/master

