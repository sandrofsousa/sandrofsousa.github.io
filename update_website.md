# To update stuff
- make changes in content folder
- delete public
- run <hugo> to build the public folder (local website)
- run <hugo server -D> to check local version

# To deploy
- stop hugo
- delete public folder
- build again clean
- Test if all ok

- cd public
- git add .
- git commit -m "msg"
- git push origin master
