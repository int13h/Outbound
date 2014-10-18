#!/bin/bash

lists="\
http://mirror1.malwaredomains.com/files/justdomains \
https://zeustracker.abuse.ch/blocklist.php?download=domainblocklist
"

workdir="$PWD"

for bl in $lists; do
  wget -O tmp --no-check-certificate $bl 
  cat $workdir/tmp >> temp.txt
  rm -f $workdir/tmp
done;

# Remove duplicates and normalize text
cat $workdir/temp.txt | grep -v ^# | grep -v "^$" | sed 's/  / /g' | tr '[A-Z]' '[a-z]' | sort | uniq > $workdir/insert.txt
rm -f $workdir/temp.txt

# Now lets try an insert
mysql -N -B -ulists -plists -e "DROP TABLE dnas.blacklists;"
mysql -N -B -ulists -plists -e "LOAD DATA INFILE insert.txt INTO table dnas.blacklists;"
