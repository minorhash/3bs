rem=/home/admin/exp/aid/7bs
loc=/mnt/dat/exp/aid/7bs

lftp  -u admin,bulk2010 tmsmusic.tokyo \
-e '
cd $dir1
pwd
lcd $dir2
lpwd
#mirror public/img 
#get routes/shop/pal/cnf.json 
#get routes/shop/aid/son
'


#$dir1/public/img \
#$dir2/public/img

#$dir1/routes/shop/pal/cnf.json \
#$dir2/routes/shop/pal/cnf.json

#$dir1/routes/shop/aid/son \
#$dir2/routes/shop/aid/son

