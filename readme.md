# Jobs

Jobs is a **ionic 3** application. It is a todo list to help people manage their workload.
It mainly uses the database SQLite as a native module.

## TODO List application

As a todo list, the application will allow you to create tasks and project. A task is a stuff to do. A task can have several priorities type such as "normal", "important", "absolute". It can also be global or it can be a part of a project. A project is a simple task holer.
Create as much as project and task you want.
A task or a project can easily be created with the "add" button in the navbar.
To remove a done task, just check it on the screen.
To save data, the application uses SQLite. This way, most of the database requests are in SQL.

No distant/remote request is made. No cloud storage, no distant analyses.

## Target

     ANDROID

This application has been build and design for Android smartphones. No iPhone (yet ?).
Moreover, the application is now only written in French. The back code is all in English but the front text is in French.

## In the future

Notes :
* Updating tasks and projects
* Vocal recognition to save projects
* statistical analisys
* language translation


### Installation

(Make sure to have npm and ionic installed and ready to use first)
To install it, download the repository and run the following commands in the repository:

```sh
$ npm install
$ ionic cordova run android
```

You can also run the following command to get the unsigned apk.
```sh
$ ionic cordova build --release android
```
The APK will be available at this relative path :

     ./platforms/android/app/build/outputs/apk
    
License
----

MIT