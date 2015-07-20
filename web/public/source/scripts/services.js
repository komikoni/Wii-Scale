/*
    Author: Andreas Älveborn
    URL: https://github.com/aelveborn/Wii-Scale

    This file is part of Wii-Scale

    ----------------------------------------------------------------------------
    
    The MIT License (MIT)
    
    Copyright (c) 2015 Andreas Älveborn
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

(function() {
    'use strict';

    angular.module('app.services', []).
        
        factory('socket', ['socketFactory', function (socketFactory) {
            return socketFactory();
        }]).

        factory('socketCommands', function(){
            var commands = Object.freeze({
                CLIENT_LOAD:            'client load',

                DEVICE_CONNECT:         'device connect',
                DEVICE_DISCONNECT:      'device disconnect',

                USERS_ADD:              'users add',
                USERS_REMOVE:           'users remove',
                USERS_RECEIVE_LIST:     'users list',

                ENTRIES_ADD:            'entries add',
                ENTRIES_REMOVE:         'entries delete',
                ENTRIES_USER:           'entries user',
                ENTRIES_RECEIVE_LIST:   'entries list',

                WIISCALE_WEIGHT:        'wiiscale-weight',
                WIISCALE_STATUS:        'wiiscale-status'
            });
            return commands;
        }).

        factory('client', ['socket', 'socketCommands', function (socket, socketCommands){
            var client = {
                load: load,
            };

            return client;

            function load() {
                socket.emit(socketCommands.CLIENT_LOAD);
            }
        }]).

        factory('device', ['socket', 'socketCommands', function (socket, socketCommands){
            var device = {
                connect: connect,
                disconnect: disconnect,
            };

            return device;

            function connect() {
                socket.emit(socketCommands.DEVICE_CONNECT);
            }

            function disconnect() {
                socket.emit(socketCommands.DEVICE_DISCONNECT);
            }
        }]).

        factory('users', ['socket', 'socketCommands', function (socket, socketCommands){
            var users = {
                add: add,
                remove: remove,
            };

            return users;

            function remove(user) {
                socket.emit(socketCommands.USERS_REMOVE, user);
            }

            function add(user) {
                socket.emit(socketCommands.USERS_ADD, user);
            }

        }]).

        factory('entries', ['socket', 'socketCommands', function (socket, socketCommands){
            var entries = {
                add: add,
                remove: remove,
                getUserEntries: getUserEntries,
            };

            return entries;

            function add(user, weight) {
                socket.emit(socketCommands.ENTRIES_ADD, {userName: user.name, weight: weight});
            }

            function remove(entry) {
                socket.emit(socketCommands.ENTRIES_REMOVE, entry);
            }

            function getUserEntries(user) {
                socket.emit(socketCommands.ENTRIES_USER, user);
            }

        }]);

})();