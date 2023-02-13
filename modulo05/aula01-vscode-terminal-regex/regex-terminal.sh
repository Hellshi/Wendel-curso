# From root folder

#Find files from root by extention
find . -name "*.test.js" 
#Find files from root by extention ignoring node_modules

find . -name "*.test.js" -not -path "*node_modules**"

find . -name "*.js" -not -path "*node_modules**"

npm i -g ipt

find . -name "*.js" -not -path "*node_modules**" | ipt 

# from module 05

#Copy files from a folder and the folder to your current path
cp -r ../../modulo1/aula05-tdd-project-pt1 .

# 1s -> First line
# ^ -> First column
# Replace for CONTENT variable
# Line break to implicit add a \n
# adds the rest of the file
CONTENT="'use-strict';"
find . -name "*.js" -not -path "*node_modules**" | ipt -o \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}