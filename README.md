# PMSys
### DBMS Final Project

## INSTRUCTIONS FOR USER INSTALLATION (Windows)
1. Download the setup.exe file from the [most recent release](https://github.com/Uakronauts/PMSys/releases)'s installer package.
2. Run the setup file. Your computer is going to give security warnings, just click the "run anyway" buttons until the application opens.

## EXTRA DEVELOPER INSTALLATION INSTRUCTIONS (Windows)
3. Install [node.js/npm](https://nodejs.org/en/download/). Check the box that installs extra packages!!
4. Install [GitHub Desktop](https://desktop.github.com/) and link your account. Then, [clone this repository onto your system](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop)
5. Install [VSCode](https://code.visualstudio.com/) and open the folder you cloned the repository into.
6. Once in VSCode, open the cloned repo folder and a terminal -- in the terminal type `npm i` (this will install all your packages, which are like C++ libraries)
7. [Create a GitHub Token](https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) and add it to `electron-builder.yml`. Then, to prevent your token from being uploaded to GitHub, do `git update-index --skip-worktree electron-builder.yml`.
