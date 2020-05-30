## MICRO.COSM





## Lerna Quick-Reference
Since most of the `micros` will share some common characterstics and behavior, Lerna is levaraged to manage community and cross-micro
depenedencies so that it's DRY and less boring DX for ya!

Here are few of the commands you may find yourselves looking up quite often
```sh
# Adds the module-1 package to the packages in the 'prefix-' prefixed folders
lerna add module-1 packages/prefix-*

# Install module-1 to module-2
lerna add module-1 --scope=module-2

# Install module-1 to module-2 in devDependencies
lerna add module-1 --scope=module-2 --dev

# Install module-1 to module-2 in peerDependencies
lerna add module-1 --scope=module-2 --peer

# Install module-1 in all modules except module-1
lerna add module-1

# Install babel-core in all modules
lerna