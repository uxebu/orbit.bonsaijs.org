define(
  function(){
    var wordStats = {};
//    var wordsAlikeMap = {
//      anim: 'animation' // Map everything that starts with 'animat' to 'animation'.
//    };
    // Ignore the following words in the stats.
    var ignoreWords = ['to', 'bonsai', 'the'];
    function addWordStats(word){
      word = word.toLowerCase();
    //      for (var w in wordsAlikeMap){
    //        if (word.indexOf(w) == 0){
    //          word = wordsAlikeMap[w];
    //          break;
    //        }
    //      }
      if (typeof wordStats[word] == 'undefined') wordStats[word] = 0;
      wordStats[word]++;
    }

    var SMALLEST_FONTSIZE = 10;
    var BIGGEST_FONTZIE = 30;
    var MAX_TAGS = 30;
    function render() {
      var node = document.getElementById('tagCloud');
      var sorted = [];
      for (var word in wordStats) sorted.push([word, wordStats[word]])
      sorted.sort(function(a, b) {return a[1] - b[1]}).reverse();
      // Remove all single letter words, and only numbers
      sorted = sorted.filter(function(s){
        return s[0].length>1 && !new RegExp('\\d+|' + ignoreWords.join('|')).test(s[0])
      });
      var biggest = sorted[0][1];
      for (var i=0, l=sorted.length; i<l && i<MAX_TAGS; i++){
        var fontSize = sorted[i][1] / biggest * BIGGEST_FONTZIE;
        fontSize = fontSize < SMALLEST_FONTSIZE ? SMALLEST_FONTSIZE : fontSize;
        node.innerHTML +=
          '<a href="javascript://" style="font-size: ' + fontSize + 'px" data-stats="' + sorted[i][0] + '">' +
            sorted[i][0] +
          '</a> ';
      }
    }
    return {addWordStats:addWordStats, render:render};
  }
);
