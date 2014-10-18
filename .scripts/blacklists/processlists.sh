#!/bin/bash

lists="\
http://mirror1.malwaredomains.com/files/justdomains \
https://zeustracker.abuse.ch/blocklist.php?download=domainblocklist
"

workdir="$PWD"

function cleanup {
  if [ -e "$workdir/insert.txt" ]; then
    rm -f $workdir/insert.txt;
  fi;
}

cleanup

for bl in $lists; do
  wget -O tmp --no-check-certificate $bl 
  cat $workdir/tmp >> temp.txt
  rm -f $workdir/tmp
done;

# Remove duplicates and normalize text
cat $workdir/temp.txt | grep -v ^# | grep -v "^$" | sed 's/  / /g' | tr '[A-Z]' '[a-z]' | sort | uniq > $workdir/insert.txt
rm -f $workdir/temp.txt

# Cleanup (this will be more robust later. PoC for now. Also won't be in sh either :/
mysql -N -B -ulists -plists -e "TRUNCATE TABLE dnas.blacklists;"

# Now lets try an insert
mysql -N -B -ulists -plists -e "LOAD DATA LOCAL INFILE 'insert.txt' INTO TABLE dnas.blacklists;"

cleanup
