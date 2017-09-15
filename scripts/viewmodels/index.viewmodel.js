var indexViewModel = {
    pageIsLoading: ko.observable(true), // Initially loading
    subMenu: ko.observable([]), // Initially no submenu
    activeHash: ko.observable(),
    pageContent: ko.observable()
};

(function () {
    // Width of the content (with or without submenu)
    indexViewModel.contentWidth = ko.pureComputed(function () {
        return indexViewModel.subMenu().length ? "col-md-9" : "col-md-12";
    }, indexViewModel);

    // Calculates the plain url without hash and anchor
    var plainUrl = function (url) {
        if (url == undefined) { return undefined }; // On startup no page is loaded yet
        if (url == '') { // '' or '#'
            return '';
        } else { // '#somePage' or '#somePage/other/another' or '#somePage/other/another#anchor'
            return url.split('#')[1]; // Remove the '#' and '#anchor'
        }
    };

    // Calculates the active main tab with the plain url
    var activeMainTab = ko.pureComputed(function () {
        var url = plainUrl(indexViewModel.activeHash());
        if (url == undefined || url == '') { return url };
        // 'somePage' or 'somePage/other/another'
        return url.split('/')[0]; // Remove the '/other/another'
    });

    // Is this the active page? (active in submenu or not)
    indexViewModel.isActivePage = function (url) {
        return ko.pureComputed(function () {
            return plainUrl(url) == plainUrl(indexViewModel.activeHash());
        }, indexViewModel);
    };
    
    // Is this the active main tab? (active in menu or not)
    indexViewModel.isActiveMainTab = function (tab) {
        return ko.pureComputed(function () {
            return tab == activeMainTab();
        }, indexViewModel);
    };

    indexViewModel.showSubmenu = ko.pureComputed(function () {
        return indexViewModel.subMenu().length != 0;
    }, indexViewModel);

    ko.applyBindings(indexViewModel);
})();