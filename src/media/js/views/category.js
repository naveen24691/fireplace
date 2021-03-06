define('views/category',
    ['models', 'tracking', 'underscore', 'urls', 'utils', 'z'],
    function(models, tracking, _, urls, utils, z) {
    'use strict';

    var cat_models = models('category');
    var app_models = models('app');

    return function(builder, args, params) {
        var category = args[0];
        params = params || {};

        var model = cat_models.lookup(category);
        var name = model && model.name;
        if (name) {
            builder.z('title', name);
        }

        builder.z('type', 'leaf');
        builder.z('show_cats', true);
        builder.z('cat', category);

        if ('src' in params) {
            delete params.src;
        }

        builder.start('category.html', {
            category: category,
            category_name: name,
            endpoint: urls.api.unsigned.url('category_landing', [category], params),
            endpoint_name: 'category_landing',
            sort: params.sort,
            app_cast: app_models.cast
        });

        tracking.setPageVar(5, 'Category', category, 3);
    };
});
