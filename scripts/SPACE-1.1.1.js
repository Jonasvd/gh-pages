var space = {
};

space.setup = function (setup) {

    var downloadUrl = function (hash, file) {
        return setup.dataUrl + hash + file;
    };

    var loadContent = function (hash) {
        setup.pageIsLoading(true);
        var url = downloadUrl(hash, 'content.html');
        $.ajax({
            url: url,
            success: function (data) {
                setup.onContentLoaded(data);
                setup.pageIsLoading(false);
            },
            error: function () {
                window.location.replace("http://jonasvd.github.io#lost");
            }
        });
    };

    var loadSubMenu = function (hash) {
        // 'page/another/page' to 'page' 
        var page = hash.split('/')[0];
        var url = downloadUrl(page, 'submenu.json');
        $.ajax({
            url: url,
            success: function (data) {
                setup.onSubmenuLoaded(data);
            },
            error: function () {
                setup.onSubmenuLoaded([]);
            }
        });
    };

    // Strip '#page/other#anchor' to 'page/other'
    var stripHash = function (hash) {
        if (hash == '') return ''; // '' or '#'
        var h = hash.split('#')[1]; // '#some/page' or '#some/page#anchor' > 'some/page'
        if (h == '') return '';
        return h + '/'; // 'some/page' > 'some/page/'
    };

    var onHashChange = function (hash) {
        setup.onHashChange(hash);
        hash = stripHash(hash);
        loadContent(hash);
        loadSubMenu(hash);
    };

    // Keep track of all page changes
    $(window).on('hashchange', function () {
        onHashChange(window.location.hash);
    });

    onHashChange(window.location.hash);
};