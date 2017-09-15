(function () {
    space.setup({
        dataUrl: 'SiteData/',
        onHashChange: function (hash) {
            indexViewModel.activeHash(hash);
        },
        pageIsLoading: function (loading) {
            indexViewModel.pageIsLoading(loading);
        },
        onContentLoaded: function (html) {
            indexViewModel.pageContent(html);
        },
        onSubmenuLoaded: function (json) {
            indexViewModel.subMenu(json);
        }
    });
})();