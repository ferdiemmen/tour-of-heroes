/* global _rs */

_rs.Seo = (function Seo() {

  'use strict';

  var score = 0;
  var metaLength = 100;
  var titleLength = 55;
  var contentLength = 500;
  var stopWords = ['ding','aan','acht','achter','achttien','af','al','alle','alleen','allen','als','and','andere','begin','berichten','best','beter','bij','bijna','bijvoorbeeld','bvb','b.v.b.','daar','dag','dagen','dan','dat','de','dertien','deze','die','dit','doe','doen','door','drie','dus','een','eerder','eerst','eerste','eind','elf','elkaar','en','enkel','enkele','enz','er','erg','ergens','etc','gaan','gaat','geen','geeneen','gegaan','gekomen','gelukkig','gemaakt','gewild','ging','gingen','gisteren','goed','haar','had','hadden','hebben','heeft','helaas','hen','het','hier','hierin','hij','hoe','hoger','hoog','hun','iets','in','inzake','is','jaar','jaren','je','jij','kan','kom','komen','kunnen','laag','lager','laten','later','links','maakt','maand','maanden','maar','maken','mede','medens','meer','met','mij','minder','minuten','minuut','moeten','mogelijk','morgen','na','naar','naast','namens','nauwelijks','nederland','negen','negentien','niemand','niet','niets','nieuwe','nog','nogal','noord','nu','of','om','onder','onmogelijk','ons','ook','oost','op','over','per','rechts','slecht','te','tegen','ter','the','thuis','tien','toe','toen','tot','totaan','twaalf','twee','twintig','uit','uren','uur','van','vanaf','vandaag','veel','veertien','verder','verkopen','via','vier','vijf','vijftien','vol','volgens','voor','voortaan','waar','waarmee','waarop','was','wat','we','wel','west','weten','wil','willen','wist','with','without','worden','wou','ze','zei','zelf','zes','zestien','zeven','zeventien','ziek','zien','zij','zijn','zo','zonder','zou','zuid'];

  var alerts = [
    {
      type: 'keyword',
      alertInvalid: 'Er is geen focus-trefwoord ingesteld voor dit artikel. Als er geen focus-trefwoord wordt opgegeven, kan er geen score worden berekend.',
      valid: false,
      visible: true,
    }, {
      type: 'title',
      alertValid: 'Het focus-trefwoord komt voor in de (SEO-)titel.',
      alertInvalid: 'Het focus-trefwoord komt niet voor in de (SEO-)titel.',
      valid: false,
      visible: false,
    }, {
      type: 'titleLength',
      alertValid: 'De paginatitel heeft een prima lengte.',
      alertInvalid: 'De paginatitel is groter dan het toonbare limiet.',
      valid: false,
      visible: false,
    }, {
      type: 'intro',
      alertValid: 'Het focus-trefwoord komt voor in de intro van het artikel.',
      alertInvalid: 'Het focus-trefwoord komt niet voor in de intro van het artikel. Zorg dat het onderwerp direct duidelijk is.',
      valid: false,
      visible: false,
    }, {
      type: 'meta',
      alertValid: 'Er is een omschrijving opgegeven, zoekmachines zullen tekst van de pagina tonen.',
      alertInvalid: 'Er is geen omschrijving opgegeven, zoekmachines zullen geen tekst van de pagina tonen.',
      valid: false,
      visible: false,
    }, {
      type: 'keywordInMeta',
      alertValid: 'De omschrijving bevat het focus-trefwoord.',
      alertInvalid: 'Er is een omschrijving, maar het bevat geen focus-trefwoord.',
      valid: false,
      visible: false,
    }, {
      type: 'metaLength',
      alertValid: '', // Set in checkMetaLength function.
      alertInvalid: 'Er is nog geen omschrijving opgegeven',
      valid: false,
      visible: false,
    }, {
      type: 'stopWord',
      alertValid: 'Je focus-trefwoord bevat geen stopwoorden.',
      alertInvalid: 'Je focus-trefwoord bevat een of meerdere <a class="cms-seo__link" href="https://nl.wikipedia.org/wiki/Stopwoord_(taalkunde)" target="_blank">stopwoorden</a>. Afhankelijk van de omstandigheden kan dit wel of niet verstandig zijn.',
      valid: false,
      visible: false,
    }, {
      type: 'wordCount',
      alertValid: '', // Set in checkWordCount function.
      alertInvalid: '', // Set in checkWordCount function.
      valid: false,
      visible: false,
    }, {
      type: 'links',
      alertValid: '', // Set in checkLinks function.
      alertInvalid: 'Dit artikel bevat geen links. Overweeg om meer relevante links toe te voegen.',
      valid: false,
      visible: false,
    }, {
      type: 'imageAlt',
      alertValid: 'Alle afbeeldingen in dit artikel bevatten alt-attributen die het focus-trefwoord bevatten.',
      alertInvalid: 'Er zijn afbeeldingen die een alt-attribuut missen of niet het focus-trefwoord bevatten.',
      valid: false,
      visible: false,
    }
  ];

  return {
    score: score,
    alerts: alerts,
    seoCheck: seoCheck,
  };

  function seoCheck(article, snippetObjects, mediaObjects) {

    var snippets = snippetObjects;
    if (!snippets) {
      snippets = article.snippetsJson;
    }

    var media = mediaObjects;
    if (!mediaObjects) {
      media = article.snippetsMediaObjects;
    }

    // Set keyword from article.
    var keyword = '';
    if (article && article.seoKeyword) {
      keyword = article.seoKeyword.toLowerCase();
      checkKeywordInTitle(article, keyword);
      checkIntro(article, keyword);
      checkKeywordInMeta(article, keyword);
      checkStopWords(keyword);
      checkImageAlt(keyword, media);
      checkMetaDescription(article);
      checkMetaLength(article);
      checkWordCount(article, snippets);
      checkLinks(snippets);
      checkTitleLength(article);
    }

    // Initiate checks.
    checkKeyword(keyword);

    // Set SEO score.
    setSEOScore();

    // Set SEO score.
    return score;
  }

  // Check for keyword. And set visibility of checks accordingly.
  function checkKeyword(keyword) {
    var hasKeyword = (keyword) ? true : false;
    for (var i = 0; i < alerts.length; i++) {
      var alert = alerts[i];
      alert.visible = hasKeyword;
    }
    getAlertByType('keyword').visible = !hasKeyword;
  }

  // Check if title contains keyword.
  function checkKeywordInTitle(article, keyword) {
    if (article.title) {
      var alert = getAlertByType('title');
      var title = article.title.toLowerCase().replace('é', 'e');
      // title_tag is leading
      if (article.titleTag && !/^\s*$/.test(article.titleTag)) {
        title = article.titleTag;
      }
      alert.valid = (title.toLowerCase().indexOf(keyword) > -1) ? true : false;
    }
  }

  // Check if intro contains keyword.
  function checkIntro(article, keyword) {
    if (article.intro) {
      var alert = getAlertByType('intro');
      var intro = article.intro.toLowerCase();
      alert.valid = (intro.indexOf(keyword) > -1) ? true : false;
    }
  }

  // Check if there is a meta description.
  function checkMetaDescription(article) {
    var alert = getAlertByType('meta');
    var meta = article.description;
    alert.valid = (!(!meta || /^\s*$/.test(meta))) ? true : false;
  }

  // Check if the keyword is used in the meta description.
  function checkKeywordInMeta(article, keyword) {
    var alert = getAlertByType('keywordInMeta');
    var meta = (article.description) ? article.description.toLowerCase() : '';
    if (meta && !/^\s*$/.test(meta)) {
      alert.valid = (meta.indexOf(keyword) > -1) ? true : false;
    }
  }

  // Check the meta description length.
  function checkMetaLength(article) {
    var alert = getAlertByType('metaLength');
    var meta = article.description;
    if (meta && meta.length > 0 && !/^\s*$/.test(meta)) {
      alert.visible = true;
      if (meta.length <= metaLength) {
        alert.valid = true;
        alert.alertValid = 'De omschrijving bevat ' + meta.length + ' karakters. Hoewel er tot ' + metaLength + ' beschikbaar zijn.';
      } else {
        alert.alertInvalid = 'De omschrijving bevat ' + meta.length + ' karakters. Zorg dat dit niet meer is dan ' + metaLength + '.';
        alert.valid = false;
        alert.visible = false;
      }
    } else {
      alert.visible = false;
    }
  }

  // Check for stop words in keyword.
  function checkStopWords(keyword) {
    var alert = getAlertByType('stopWord');
    var keywordSplit = keyword.split(' ');
    var check;
    for (var i = 0; i < keywordSplit.length; i++) {
      var word = keywordSplit[i];
      check = checkStopWord(word);
      if (check) {
        break;
      }
    }
    if (check) {
      alert.valid = false;
    } else {
      alert.valid = true;
    }
  }

  // Check for word count. Counts words in intro and snippets of type: paragraph, quote and header;
  function checkWordCount(article, snippets) {
    var alert = getAlertByType('wordCount');
    var words = 0;
    if (article.intro) {
      words += article.intro.replace(/(<([^>]+)>)/ig, '').replace(/\u00a0/g, '').split(' ').length;
    }
    if (snippets.length > 0) {
      for (var i = 0; i < snippets.length; i++) {
        var snippet = snippets[i];
        if (snippet.type === 'paragraph' || snippet.type === 'quote' || snippet.type === 'header') {
          words += snippet.data.body.replace(/(<([^>]+)>)/ig, '').replace(/\u00a0/g, '').split(' ').length;
        }
      }

      var snippetContainers = snippets.filter(function(snippet) {
        if (snippet.type === 'snippetcontainer') {
          return true;
        }
        return false;
      });

      for (var j = 0; j < snippetContainers.length; j++) {
        var snippetContainer = snippetContainers[j];
        for (var k = 0; k < snippetContainer.data.subSnippets.length; k++) {
          var subSnippet = snippetContainer.data.subSnippets[k];
          if (subSnippet.type === 'paragraph' || subSnippet.type === 'quote' || subSnippet.type === 'header') {
            words += subSnippet.data.body.replace(/(<([^>]+)>)/ig, '').replace(/\u00a0/g, '').split(' ').length;
          }
        }
      }
    }
    if (words >= contentLength) {
      alert.alertValid = 'De tekst bevat ' + words + ' woorden. Dit is meer of gelijk aan het minimaal aantal van ' + contentLength + ' woorden.';
      alert.valid = true;
    } else {
      alert.alertInvalid = 'De tekst bevat ' + words + ' woorden. Dit is minder dan het minimaal aantal van ' + contentLength + ' woorden. Voeg meer relevante inhoud aan het artikel toe.';
      alert.valid = false;
    }
  }

  // Check the amount of links.
  function checkLinks(snippets) {
    var alert = getAlertByType('links');
    var links = 0;
    var snippetCount = snippets.length;
    var plural = (links > 1) ? 's' : '';
    if (snippetCount > 0) {
      for (var i = 0; i < snippetCount; i++) {
        var snippet = snippets[i];
        if (snippet.type === 'paragraph' && snippet.data.body.match(/<a[^>]*>([^<]+)<\/a>/g)) {
          links = snippet.data.body.match(/<a[^>]*>([^<]+)<\/a>/g).length;
        }
      }

      var snippetContainers = snippets.filter(function(snippet) {
        if (snippet.type === 'snippetcontainer') {
          return true;
        }
        return false;
      });

      for (var j = 0; j < snippetContainers.length; j++) {
        var snippetContainer = snippetContainers[j];
        for (var k = 0; k < snippetContainer.data.subSnippets.length; k++) {
          var subSnippet = snippetContainer.data.subSnippets[k];
          if (subSnippet.type === 'paragraph' && subSnippet.data.body.match(/<a[^>]*>([^<]+)<\/a>/g)) {
            links = subSnippet.data.body.match(/<a[^>]*>([^<]+)<\/a>/g).length;
          }
        }
      }
    }
    if (links > 0) {
      alert.valid = true;
      alert.alertValid = 'Dit artikel heeft ' + links + ' uitgaande link' + plural + '.';
    } else {
      alert.valid = false;
    }
  }

  // Check the title length.
  function checkTitleLength(article) {
    var alert = getAlertByType('titleLength');
    var title = article.title;
    if (article.titleTag && !/^\s*$/.test(article.titleTag)) {
      title = article.titleTag;
    }
    if (title && title.length > 0 && !/^\s*$/.test(title)) {
      alert.visible = true;
      if (title.length <= titleLength) {
        alert.valid = true;
      } else {
        alert.valid = false;
        alert.alertInvalid = 'De paginatitel heeft ' + title.length + ' karakters en is groter dan het toonbare limiet van ' + titleLength + '.';
      }
    } else {
      alert.visible = false;
    }
  }

  // Check article images for alt text.
  function checkImageAlt(keyword, mediaObjects) {
    var alert = getAlertByType('imageAlt');

    if (Object.keys(mediaObjects).length > 0) {
      for (var key in mediaObjects) {
        if (mediaObjects.hasOwnProperty(key)) {
          var alt = (mediaObjects[key].file.mediaAlt) ? mediaObjects[key].file.mediaAlt.toLowerCase() : '';
          alert.valid = (keyword && alt && alt.indexOf(keyword) > -1) ? true : false;
          if (!alert.valid) {
            alert.alertInvalid = 'Er zijn afbeeldingen die een alt-attribuut missen of niet het focus-trefwoord bevatten.';
            return;
          }
        }
      }
    } else {
      alert.alertInvalid = 'Het artikel bevat geen afbeeldingen. Overweeg om meer relevante afbeeldingen toe te voegen.';
    }
  }

  function setSEOScore() {
    var valids = 0;
    for (var i = 0; i < alerts.length; i++) {
      var alert = alerts[i];
      if (alert.valid) {
        valids++;
      }
    }

    // If no keyword is provided, no score can be calculated so we set it to zero.
    score = valids / 10 * 100;
  }

  // -----------------------------------------------------------
  // HELPERS
  // -----------------------------------------------------------

  // Checks for a specific stop word in the SEO keyword.
  // Returns true if a word matches.
  function checkStopWord(key) {
    for (var i = 0; i < stopWords.length; i++) {
      var word = stopWords[i];
      if (key === word) {
        return true;
      }
    }
    return false;
  }

  function getAlertByType(type) {
    for (var i = 0; i < alerts.length; i++) {
      var alert = alerts[i];
      if (alert.type === type) {
        return alert;
      }
    }
  }

})();

(typeof module !== 'undefined' && module !== null ? module : {}).exports = this.Namespace = {
  seo: _rs.Seo,
};
