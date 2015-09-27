var currentSubmovie;

stage.on('message', function(message) {
  switch(message.type) {
    case 'baseUrl':
      stage.assetBaseUrl = stage.baseUrl.resolveUri(message.baseUrl);
      break;

    case 'code':
        var newSubmovie = new Movie();

        // remove old movie, add new movie
        stage
          .removeChild(currentSubmovie)
          .addChild(newSubmovie);

        currentSubmovie = newSubmovie;

        Function('stage', message.code)(newSubmovie);
      break;
  }
});
