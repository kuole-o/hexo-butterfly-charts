#!/bin/bash
echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

git add .
msg="ð åæ´æ°äº `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin main

# pushæ§è¡å®æï¼ä¸èªå¨éåº
exec /bin/bash