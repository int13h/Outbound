#!/bin/bash
# These can be domains(0) or IP lists(1).
# If domains we need to add the trailing dot.
# This should be called via cron daily.

lists="\
http://mirror1.malwaredomains.com/files/justdomains|0 \
https://zeustracker.abuse.ch/blocklist.php?download=domainblocklist|0 \
http://rules.emergingthreats.net/blockrules/compromised-ips.txt|1
"

workdir="$PWD"

function cleanup {
  if [ -e "$workdir/insert.txt" ]; then
    rm -f $workdir/insert.txt;
  fi;
}

cleanup

for bl in $lists; do
  list=`echo $bl | awk -F "|" '{print $1}'`  
  type=`echo $bl | awk -F "|" '{print $2}'`
  wget -O tmp --no-check-certificate $list 

  if [ $type -ne 0 ]; then
    cat $workdir/tmp >> temp.txt
  else
    cat $workdir/tmp | sed 's/$/./' >> temp.txt
  fi

  rm -f $workdir/tmp
done;

# Remove duplicates and normalize text
cat $workdir/temp.txt | grep -v ^# | grep -v "^$" | sed 's/  / /g' | tr '[A-Z]' '[a-z]' | sort | uniq > $workdir/insert.txt
rm -f $workdir/temp.txt

# Cleanup (this will be more robust later. PoC for now. Also won't be in sh either :/
mysql -N -B -ulists -plists -e "TRUNCATE TABLE dnas.listed;"

# Now lets try an insert
mysql -N -B -ulists -plists -e "LOAD DATA LOCAL INFILE 'insert.txt' INTO TABLE dnas.listed;"

cleanup
