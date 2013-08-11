pages:
	git checkout gh-pages
	git merge master
	git push origin gh-pages
	git checkout master

authors:
	echo "Authors\n=======\n" > AUTHORS.md
	git log --raw | grep "^Author: " | sort | uniq | cut -d ' ' -f2- | sed 's/^/- /' >> AUTHORS.md
