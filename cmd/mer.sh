dir=$(pwd)
str=${dir:16}
echo $str

git merge git@github.com:minorhash/$str.git/master

