br=$(git rev-parse --abbrev-ref HEAD)
echo $br

git push -u origin $br

