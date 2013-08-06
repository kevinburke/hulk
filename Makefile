pages:
	git checkout gh-pages
	git merge master
	git push origin gh-pages
	git checkout master

authors:
	git log --raw | grep "^Author: " | sort | uniq | cut -d ' ' -f2- > AUTHORS.md
