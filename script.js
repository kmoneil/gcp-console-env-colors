(function () {
  "use strict";

  const regex = /project=([^&]*)/;
  const envBannerSettings = {
    prd: {
      text: "PRODUCTION",
      // red
      color: "#ef4444",
    },
    sit: {
      text: "STAGING",
      // purple
      color: "#a855f7",
    },
    dev: {
      text: "DEVELOPMENT",
      // orange
      color: "#fb923c",
    },
    tst: {
      text: "TESTING",
      // green
      color: "#84cc16",
    },
  };

  const darkBlue = "#1e3a8a";

  var gcpTopNav;
  var envBanner;

  var oldHref = document.location.href;

  window.onload = function () {
    gcpTopNav = document.querySelector(".cfc-platform-bar-container");
    envBanner = insertEnvBanner();

    var bodyList = document.querySelector("body");

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;
          updateBanner();
        }
      });
    });

    var config = {
      childList: true,
      subtree: true,
    };

    observer.observe(bodyList, config);

    updateBanner();
  };

  const updateBanner = function () {
    const match = regex.exec(document.location.href);
    if (match) {
      const project = match[1].toLowerCase();
      const env = project.split("-");
      const envSettings = envBannerSettings[env[env.length - 1]];
      if (envSettings) {
        styleBanners(envSettings.text, envSettings.color);
        return;
      }
    }
    hideBanners();
  };

  const insertEnvBanner = function () {
    const div = document.createElement("div");
    div.style =
      "color:#fff; justify-content:center; align-items:center; height: 25px; font-size: 16px; font-weight: bold; letter-spacing: 1px;";
    div.style.display = "none";

    document.body.prepend(div);

    return div;
  };

  const styleBanners = function (text, color) {
    envBanner.style.display = "flex";
    envBanner.innerText = text;
    envBanner.style.backgroundColor = color;
    gcpTopNav.style.backgroundColor = color;
  };

  const hideBanners = function () {
    envBanner.style.display = "none";
    gcpTopNav.style.backgroundColor = darkBlue;
  };
})();
