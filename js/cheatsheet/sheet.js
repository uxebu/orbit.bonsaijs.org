define(
  function () {

    function toArray(args) {
      return [].slice.call(args);
    }

    function escapeHtml(text) {
      return text
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    }

    var domHelpers = {
      hide:function (node) {
        node.style.display = 'none';
      },
      show:function (node) {
        node.style.display = 'block';
      },
      getPreviousNode: function(element, nodeName) {
        nodeName = nodeName.toLowerCase();
        while (element = element.previousSibling) {
          if (element.nodeName.toLowerCase() === nodeName) {
            return element;
          }
        }
        return null;
      }
    };

    var sheet = {
      options: {
        showCodeOnly: false,
        showH1: true
      },
      init: function(container, content) {
        this.container = container;
        this.content = content;
        this.container.innerHTML = this.parseHTMLFromMarkdown(content);
        this.nodes = toArray(this.container.children);
        var preNodes = toArray(this.container.querySelectorAll('pre'));
        // Store all the actual content, so we can restore it at any time
        // esp when we have modified the content with <mark> after a search.
        preNodes.forEach(function (node) {
          node.dataset.actualInnerHtml = node.textContent;
        });
      },
      parseHTMLFromMarkdown:function (content) {
        return marked.parser(marked.lexer(content));
      },

      filter: function (searchFor, showAllOnFail) {

        var pres = this.findCodeNodesWithString(searchFor);
        var nodesToShow = [];
        var markInNodes = [];
        var that = this;
        pres.forEach(function(preNode) {
          nodesToShow.push(preNode);
          if (!that.options.showCodeOnly) {
            nodesToShow.push(domHelpers.getPreviousNode(preNode, 'p'));
          }
          nodesToShow.push(domHelpers.getPreviousNode(preNode, 'h3'));
          nodesToShow.push(domHelpers.getPreviousNode(preNode, 'h2'));
          if (that.options.showH1) {
            nodesToShow.push(domHelpers.getPreviousNode(preNode, 'h1'));
          }
          markInNodes.push(preNode);
        });

        var anySearchResultsFound = !!nodesToShow.length;
        if (showAllOnFail && !anySearchResultsFound) {
          this.removeMarks(); // Make sure no old <mark>s are left.
          this.nodes.forEach(domHelpers.show);
        }
        if (anySearchResultsFound) {
          this.removeMarks(); // Make sure no old <mark>s are left.
          for (var i=0, l=markInNodes.length; i<l; i++) {
            that.markInNode(markInNodes[i], searchFor);
          }
          this.nodes.forEach(domHelpers.hide);
          nodesToShow.forEach(domHelpers.show);
        }
//        } else {
//          this.nodes.forEach(domHelpers.show);
        //        } else {
        //          nodesToShow.forEach(domHelpers.show);
        //        }
      },

      removeMarks: function() {
        var nodes = toArray(this.container.querySelectorAll('pre'));
        nodes.forEach(function(node){ node.innerHTML = node.dataset.actualInnerHtml; });
      },

      findCodeNodesWithString:function (searchFor) {
        var nodes = this.container.querySelectorAll('pre');
        var that = this;
        return toArray(nodes).filter(function (node) {
          return that.isInNode(searchFor, node)
        });
      },

      isInNode: function (searchFor, node) {
        return node.dataset.actualInnerHtml.toLowerCase().indexOf(searchFor.toLowerCase()) > -1;
      },

      markSearchString: function (content, searchFor) {
        if (!searchFor){
          return content;
        }
        var markedContent = content;
        var searchForLower = searchFor.toLowerCase();
        var contentLower = content.toLowerCase();
        var foundAtPosition = contentLower.indexOf(searchForLower);
        if (foundAtPosition != -1) {
          markedContent =
            escapeHtml(content.substr(0, foundAtPosition))
            + '<mark>'
            + escapeHtml(content.substr(foundAtPosition, searchFor.length))
            + '</mark>';
          // If in the rest of the string the searchFor string is found again mark it.
          if (contentLower.substr(foundAtPosition + searchFor.length).indexOf(searchForLower) > -1){
            markedContent += this.markSearchString(content.substr(foundAtPosition + searchFor.length), searchFor);
          } else {
            markedContent += escapeHtml(content.substr(foundAtPosition + searchFor.length));
          }
        }
        return markedContent;
      },

      markInNode: function (node, searchFor) {
        node.innerHTML = this.markSearchString(node.dataset.actualInnerHtml, searchFor);
      }

    };
    return sheet;
  }
);
