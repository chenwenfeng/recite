goog.provide('recite.App');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('recite.DropboxService');
goog.require('recite.search.SearchCtrl');


/**
 * Entry point.
 */
recite.App.main = function() {
  var dropbox = new recite.DropboxService();
  console.log('oauth', dropbox.getClient().isAuthenticated());
  if (!dropbox.getClient().isAuthenticated()) {
    dropbox.getClient().authenticate();
  }

  goog.events.listen(goog.dom.getElement('add-word-btn'), 'click', function() {
    var input = goog.dom.getElement('add-word-input');
    var word = input.value;
    input.value = '';
    dropbox.addWord(word);
    console.log('add word', word);
  });

  var module = angular.module('recite', []);
  module.controller('search.SearchCtrl', recite.search.SearchCtrl);
};
goog.exportSymbol('recite.App.main', recite.App.main);
