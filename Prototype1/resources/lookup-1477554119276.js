(function(window, undefined) {
  var dictionary = {
    "1ed84962-d709-474b-96da-5e4c6cf4cce1": "Main Screen",
    "be5fd0c7-21b2-4f20-a782-41f739e94d09": "Plot Screen",
    "bea45cf5-4930-4e3f-b875-eac8c18a8dff": "Visualization Screen",
    "d12245cc-1680-458d-89dd-4f0d7fb22724": "Login Screen",
    "c93181c3-415a-48d3-b796-b857aedb8424": "Sign up Screen",
    "87db3cf7-6bd4-40c3-b29c-45680fb11462": "960 grid - 16 columns",
    "e5f958a4-53ae-426e-8c05-2f7d8e00b762": "960 grid - 12 columns",
    "f39803f7-df02-4169-93eb-7547fb8c961a": "Template 1",
    "bb8abf58-f55e-472d-af05-a7d1bb0cc014": "default"
  };

  var uriRE = /^(\/#)?(screens|templates|masters|scenarios)\/(.*)(\.html)?/;
  window.lookUpURL = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, url;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      url = folder + "/" + canvas;
    }
    return url;
  };

  window.lookUpName = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, canvasName;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      canvasName = dictionary[canvas];
    }
    return canvasName;
  };
})(window);