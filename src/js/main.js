"use strict";

var config = require('./config');
var app = angular.module('myApp', ['spotify']);

app.config(function (SpotifyProvider) {
  SpotifyProvider.setClientId(config.spotify.id);
  SpotifyProvider.setRedirectUri(config.spotify.redirect_uri);
  SpotifyProvider.setScope(config.spotify.scope);
  SpotifyProvider.setAuthToken(window.localStorage['spotify-token']);
});

var SpotifyProvider = require('./providers/Spotify');
var FacebookProvider = require('./providers/Facebook');
var GoogleProvider = require('./providers/Gooogle');
 

app.controller('SpotifyProvider', ['$scope', '$http', 'Spotify', SpotifyProvider]);
 

