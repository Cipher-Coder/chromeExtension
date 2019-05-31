var GithubFeed = {
  init: function(config) {
    this.count = config.count || 0;
    this.order = config.order || "desc";
    this.url =
      "https://api.github.com/users/" +
      config.username +
      "/repos?per_page=" +
      this.count +
      "&sort=created&direction=" +
      this.order;
    this.container = config.container;
    this.onComplete = config.onComplete || function() {};
    this.fetch();
  },

  xmlHttp: function() {
    return new XMLHttpRequest();
  },

  objJSON: function(options, callback) {
    var self = this;

    var cached = self.getCache();
    if (cached !== null) {
      callback(JSON.parse(cached));
      return;
    }

    var xhttp = self.xmlHttp();
    options.url = options.url || location.href;
    xhttp.open("GET", options.url, true);
    xhttp.send(null);

    xhttp.onreadystatechange = function() {
      if (xhttp.status === 200 && xhttp.readyState === 4) {
        self.setCache(xhttp.responseText);
        callback(xhttp.responseText);
      }
    };
  },
  setCache: function(data) {
    if (sessionStorage) {
      sessionStorage.setItem("repos:", JSON.stringify(data));
    }
  },
  getCache: function() {
    if (sessionStorage) {
      return sessionStorage.getItem("repos:");
    } else {
      return false;
    }
  },

  fetch: function() {
    var self = this;

    self.objJSON({ url: self.url }, function(response) {
      var repos = JSON.parse(response),
        reposList = document.getElementById("github-feeds"),
        /* content = "", */
        i;

      for (i = 0; i < repos.length; i++) {
        /* 
          repos[i].stargazers_count
         */
        const div = document.createElement("div");
        div.setAttribute("class", "repo-container");
        const head = document.createElement("h3");
        head.setAttribute("class", "repo-name");
        const a = document.createElement("a");
        a.href = repos[i].svn_url;
        a.textContent = repos[i].name;
        const desc = document.createElement("div");
        desc.setAttribute("class", "repo-description");
        desc.textContent = repos[i].description;
        if (repos[i].description === null) {
          desc.textContent = "Add description to your repo...";
        }

        reposList.appendChild(div);
        div.appendChild(head);
        head.appendChild(a);
        div.appendChild(desc);
      }

      self.onComplete();
    });
  }
};
