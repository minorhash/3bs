dir1=/home/admin/exp/aid/7bs
dir2=/mnt/dat/exp/aid/7bs

lftp  -u admin,bulk2010 tmsmusic.tokyo \
-e '
cd /home/admin/exp/aid/7bs
pwd
lcd /mnt/dat/exp/aid/7bs
lpwd
mirror public/img 
get routes/shop/pal/cnf.json 
mirror routes/shop/aid/son
exit
'


#$dir1/public/img \
#$dir2/public/img

#$dir1/routes/shop/pal/cnf.json \
#$dir2/routes/shop/pal/cnf.json

#$dir1/routes/shop/aid/son \
#$dir2/routes/shop/aid/son

